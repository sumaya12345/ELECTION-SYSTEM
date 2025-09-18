import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { format, parseISO } from "date-fns";
import { Card, Table, Progress, Typography, Input, Select, Spin, Alert, Button, Row, Col, Divider } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  TrophyOutlined, 
  BarChartOutlined, 
  PieChartOutlined, 
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
const BAR_COLORS = ['#1890ff', '#36cfc9', '#597ef7', '#9254de', '#f759ab', '#ff7a45'];

function ResultsCom() {
  const [activeElections, setActiveElections] = useState([]);
  const [resultsData, setResultsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedElection, setExpandedElection] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("bar");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const formatDate = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), "MMM dd, yyyy h:mm a") : "N/A";
    } catch {
      return "Invalid date";
    }
  };

  const getStatusDisplay = (election) => {
    const now = new Date();
    const startDate = new Date(election.startDate);
    const endDate = new Date(election.endDate);
    
    let status = election.status;
    if (startDate > now) status = "upcoming";
    else if (endDate < now) status = "completed";
    else status = "active";

    return {
      text: status.charAt(0).toUpperCase() + status.slice(1),
      class: status === "active" ? "text-green-600" :
            status === "completed" ? "text-gray-600" :
            "text-blue-600",
      isActive: status === "active"
    };
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const electionsRes = await axios.get('http://localhost:5000/elections/active', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const electionsData = electionsRes.data || [];
      
      const results = {};
      await Promise.all(electionsData.map(async (election) => {
        try {
          const resultsRes = await axios.get(
            `http://localhost:5000/elections/${election._id}/results`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          );
          results[election._id] = resultsRes.data || {};
        } catch (err) {
          console.error(`Error fetching results for election ${election._id}:`, err);
          results[election._id] = {};
        }
      }));

      setActiveElections(electionsData);
      setResultsData(results);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch elections");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredElections = activeElections.filter(election => 
    election.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    election.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const prepareChartData = (candidates) => {
    return candidates.map((candidate, index) => ({
      name: candidate.name,
      votes: candidate.votes || 0,
      percentage: candidate.percentage || 0,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const resultsColumns = [
    {
      title: 'Candidate',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.photo && (
            <img 
              src={record.photo} 
              alt={text} 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                marginRight: 12,
                objectFit: 'cover',
                border: '2px solid #f0f0f0'
              }}
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Votes',
      dataIndex: 'votes',
      key: 'votes',
      sorter: (a, b) => a.votes - b.votes,
      render: (votes, record) => (
        <div style={{ minWidth: 150 }}>
          <Text strong>{votes.toLocaleString()}</Text>
          {record.totalVotes > 0 && (
            <Progress
              percent={record.percentage}
              showInfo={false}
              strokeColor={BAR_COLORS[0]}
              strokeWidth={12}
              trailColor="#f0f0f0"
              style={{ marginTop: 4 }}
            />
          )}
        </div>
      ),
    },
    {
      title: 'Percentage',
      key: 'percentage',
      render: (_, record) => (
        <Text strong style={{ color: BAR_COLORS[0] }}>
          {record.percentage.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: 'Rank',
      key: 'rank',
      render: (_, __, index) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: index < 3 ? BAR_COLORS[index] : '#f0f0f0',
          color: index < 3 ? '#fff' : '#000'
        }}>
          {index + 1}
        </div>
      ),
    },
  ];

  const renderChart = (chartData) => {
    if (viewMode === "pie") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="votes"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1000}
              animationBegin={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                `${value} votes (${(props.payload.percent * 100).toFixed(1)}%)`,
                name
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value, name) => [`${value} votes`, name]}
            labelFormatter={(label) => `Candidate: ${label}`}
          />
          <Legend />
          <Bar 
            dataKey="votes" 
            name="Votes"
            radius={[4, 4, 0, 0]}
            fill={BAR_COLORS[0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex min-h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
      <div className="w-64 fixed h-full bg-white shadow-md">
    
      </div>
      
      <div className="flex-1 ml-64 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spin size="large" tip="Loading election results..." />
          </div>
        ) : error ? (
          <Alert
            message="Error Loading Results"
            description={
              <>
                <p>{error}</p>
                <Button 
                  type="primary" 
                  onClick={fetchData}
                  className="mt-4"
                  icon={<ArrowUpOutlined />}
                >
                  Try Again
                </Button>
              </>
            }
            type="error"
            showIcon
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={2} className="m-0" style={{ color: '#fff' }}>
                  <TrophyOutlined className="mr-3" style={{ color: BAR_COLORS[0] }} />
                  Election Results
                </Title>
                <Text type="secondary">View detailed election results</Text>
              </div>
              <Button 
                type="primary" 
                onClick={fetchData}
                icon={<ArrowDownOutlined />}
              >
                Refresh
              </Button>
            </div>
            
            <Card className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Input
                  placeholder="Search by election name or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={<SearchOutlined />}
                  className="max-w-md"
                  allowClear
                />
                <Select
                  value={sortOrder}
                  onChange={setSortOrder}
                  className="w-40"
                >
                  <Option value="desc">Most Votes First</Option>
                  <Option value="asc">Fewest Votes First</Option>
                </Select>
                <Button.Group>
                  <Button 
                    type={viewMode === 'bar' ? 'primary' : 'default'}
                    onClick={() => setViewMode('bar')}
                    icon={<BarChartOutlined />}
                  >
                    Bar
                  </Button>
                  <Button 
                    type={viewMode === 'pie' ? 'primary' : 'default'}
                    onClick={() => setViewMode('pie')}
                    icon={<PieChartOutlined />}
                  >
                    Pie
                  </Button>
                </Button.Group>
              </div>
            </Card>

            {filteredElections.length === 0 ? (
              <Card>
                <Alert
                  message="No elections found"
                  description="There are currently no elections matching your search criteria."
                  type="info"
                  showIcon
                />
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredElections.map(election => {
                  const statusDisplay = getStatusDisplay(election);
                  const results = resultsData[election._id] || {};
                  const candidates = results.candidates || [];
                  const totalVotes = results.election?.totalVotes || 0;
                  
                  const sortedCandidates = [...candidates].sort((a, b) => 
                    sortOrder === "desc" ? b.votes - a.votes : a.votes - b.votes
                  );

                  const chartData = prepareChartData(sortedCandidates);

                  return (
                    <Card key={election._id} className="w-full">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <div>
                          <Title level={4} className="m-0">{election.name}</Title>
                          <Text type="secondary">{election.position}</Text>
                        </div>
                        <div className="flex items-center gap-4 mt-2 md:mt-0">
                          <span className={`px-3 py-1 rounded-full ${
                            statusDisplay.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {statusDisplay.text}
                          </span>
                          <Button
                            type={expandedElection === election._id ? 'default' : 'primary'}
                            onClick={() => setExpandedElection(prev => 
                              prev === election._id ? null : election._id
                            )}
                          >
                            {expandedElection === election._id ? "Hide Details" : "View Details"}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Text strong>Election Period: </Text>
                          <Text>{formatDate(election.startDate)} - {formatDate(election.endDate)}</Text>
                        </div>
                        <div>
                          <Text strong>Total Votes: </Text>
                          <Text strong style={{ color: BAR_COLORS[0] }}>
                            {totalVotes.toLocaleString()}
                          </Text>
                        </div>
                      </div>

                      {expandedElection === election._id && (
                        <>
                          <Divider />
                          <div className="mb-6">
                            <Title level={5} className="mb-4">Results Visualization</Title>
                            <div className="h-80">
                              {renderChart(chartData)}
                            </div>
                          </div>
                          
                          <Divider />
                          <Title level={5} className="mb-4">Detailed Results</Title>
                          <Table
                            columns={resultsColumns}
                            dataSource={sortedCandidates.map((c, i) => ({ 
                              ...c, 
                              totalVotes,
                              rank: i + 1 
                            }))}
                            rowKey="_id"
                            pagination={false}
                            className="w-full"
                          />
                        </>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsCom;