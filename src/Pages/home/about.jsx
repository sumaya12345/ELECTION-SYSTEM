import React from "react";
import Navbar from "../../Components/home_component/Navbar";
import Footer from "../../Components/home_component/Footer";
import {
  FaBullseye,
  FaUsers,
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaShieldAlt,
  FaLock,
  FaGlobe,
  FaUserShield,
} from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { BsGraphUp, BsFillLightningFill } from "react-icons/bs";

function About() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Bilingual Hero Header */}
      <div className="relative  bg-gradient-to-r from-black via-blue-950 to-purple-950 py-24 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMTBjMjIsMCw0MCwxOCw0MCw0MHMtMTgsNDAtNDAsNDBzLTQwLTE4LTQwLTQwUzI4LDEwLDUwLDEweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] bg-repeat"
            style={{ backgroundSize: "100px 100px" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* English Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            <span className="block">Democracy Reinvented</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100 mt-2">
              Election Technology Platform
            </span>
          </h1>

          {/* Somali Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-100 mt-6 mb-4">
            <span className="block">Democracy Reimagined</span>
            <span className="block font-normal mt-1">
            "Technology Election Platform"
            </span>
          </h2>

          {/* Bilingual Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-blue-100 mb-4">
              Enterprise-grade election infrastructure trusted by governments
              and global organizations
            </p>
            
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                value: "100M+",
                label: "Votes Processed",
                
              },
              { value: "99.99%", label: "Uptime" },
              {
                value: "Zero",
                label: "Security Breaches",
                
              },
              { value: "128-bit", label: "Encryption"},
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
                <p className="text-xs text-blue-100/80 mt-1">{stat.so}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-16 text-white"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content - Professional Somali/English */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className=" bg-gradient-to-r from-black via-blue-950 to-purple-950 rounded-xl shadow-2xl overflow-hidden mb-16 border border-gray-100">
          <div className="md:flex">
            <div className="md:w-1/3  bg-gradient-to-r from-black via-blue-950 to-purple-950 p-8 flex flex-col justify-center">
              <FaBullseye className="text-6xl text-white opacity-90 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white text-center">
                "Purpose / Our Mission"

              </h3>
            </div>
            <div className="md:w-2/3 p-10">
             
              <p className="text-lg text-white leading-relaxed">
                We are revolutionizing electoral processes through
                <span className="font-semibold text-blue-200">
                  {" "}
                  military-grade security
                </span>
                ,
                <span className="font-semibold text-blue-200">
                  {" "}
                  complete transparency
                </span>
                , and
                <span className="font-semibold text-blue-200">
                  {" "}
                  universal access
                </span>
                . Our platform enables organizations worldwide to conduct
                verifiably secure elections.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values - Bilingual */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <FaLock className="text-3xl text-blue-600" />,
              title: "Unbreakable Security",
              desc:
                "Blockchain verification and end-to-end encryption ensure vote anonymity",
            },
            {
              icon: <FaGlobe className="text-3xl text-blue-600" />,
              title: "Global Access",
              desc:
                "Accessible from any internet-connected device, anywhere in the world",
            },
            {
              icon: <FaChartLine className="text-3xl text-blue-600" />,
              title: "Instant Results",
              desc:
                "Real-time tabulation with cryptographic proofs for verifiable results",
            },
          ].map((item, index) => (
            <div
              key={index}
              className=" bg-gradient-to-r from-black via-blue-950 to-purple-950 rounded-xl shadow-lg p-8 border-t-4 border-blue-600"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">{item.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-2">
                {item.title}{" "}
                <span className="text-white font-normal">
                  / {item.titleEn}
                </span>
              </h3>
              <p className="text-white text-center mb-3">{item.desc}</p>
              <p className="text-white text-sm text-center">{item.descEn}</p>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className=" bg-gradient-to-r from-black via-blue-950 to-purple-950 rounded-2xl shadow-2xl p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
               Technology Stack
            </h2>
            <div className="w-40 h-1 bg-blue-400 mx-auto mb-8"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Zero-Knowledge Proofs" },
                { name: "Blockchain Anchoring" },
                { name: "End-to-End Encryption" },
                { name: "Biometric Auth", },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-white font-medium">{tech.name}</h4>
                  <p className="text-blue-200 text-sm">{tech.so}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className=" bg-gradient-to-r from-black via-blue-950 to-purple-950 rounded-xl shadow-2xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-4 mb-6">
              <FaHandshake className="text-3xl text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Waxay Yiraahdeen Shuraakadeena / What Partners Say
            </h2>
            <p className="text-xl text-white leading-relaxed mb-8">
             
                            "This was the only platform that met our security requirements
              while delivering the accessibility our community needed."
            </p>
            <div className="flex items-center justify-center">
              <div className="text-left">
                <p className="font-semibold text-white">Dr. Aisha Mohamed</p>
                
                <p className="text-white text-sm">
                  Chairperson, Somali Democracy Initiative
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
