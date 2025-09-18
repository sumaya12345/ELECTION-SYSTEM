import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [formData, setFormData] = useState({
    username: '', // Added username field
    currentPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    setIsSubmitting(true);

    // Basic validation
    if (!formData.currentPassword || !formData.newPassword) {
      setMessage({ 
        text: 'Current password and new password are required', 
        isError: true 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/admin/update-password',
        {
          username: formData.username,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({ 
        text: response.data.message || 'Password updated successfully', 
        isError: false 
      });
      
      // Clear form after successful update
      setFormData({
        username: '',
        currentPassword: '',
        newPassword: ''
      });

    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || 
                         'Failed to update password. Please try again.';
      
      setMessage({ 
        text: errorMessage, 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=' relative w-full h-screen flex justify-center bg-gradient-to-r from-black via-blue-950 to-purple-950 '>
    <div className="max-w-md absolute top-10 w-[800px] mx-auto p-6  bg-gradient-to-r from-white via-green-300 to-purple-500 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition duration-200 ${
            isSubmitting
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-900 hover:bg-green-700'
          } text-white font-medium`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            'Update Password'
          )}
        </button>

        {message.text && (
          <div className={`p-3 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
    </div>
  );
}

export default Settings;