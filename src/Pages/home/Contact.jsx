import React, { useState } from "react";
import Navbar from "../../Components/home_component/Navbar";
import Footer from "../../Components/home_component/Footer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: "", isError: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ text: "", isError: false });

    try {
      await axios.post('https://elrction-backend-4.onrender.com/complaints', {
        name: formData.name,
        email: formData.email,
        complaint: formData.message
      });

      setSubmitMessage({
        text: "Fariintaadu si guul leh ayaa loo diray!",
        isError: false
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage({
        text: error.response?.data?.error || "Khalad ayaa dhacay. Fadlan isku day mar kale.",
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <div className=" bg-gradient-to-r from-black via-blue-900 to-purple-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            You can send us a message if you need more information or support.

          </p>
        </div>
      </div>

      {/* Contact Content */}
      <main className="flex-grow py-12 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-900 to-purple-500 px-6 py-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-white text-xl mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    messages
                  </h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <form className="space-y-4 " onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                      placeholder="enter your message"
                      required
                    ></textarea>
                  </div>

                  {submitMessage.text && (
                    <div className={`p-3 rounded-lg text-center ${
                      submitMessage.isError 
                        ? "bg-red-100 text-red-700" 
                        : "bg-green-100 text-green-700"
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-purple-900 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transition duration-200 shadow-md flex items-center justify-center mt-2 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Bayaana...
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        send
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-black rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900 to-purple-500 px-6 py-4">
                  <div className="flex items-center">
                    <FaBuilding className="text-white text-xl mr-3" />
                    <h2 className="text-xl font-semibold text-white">
                      Our Office
                    </h2>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-white mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-white">Mogadishu, Somalia</p>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="text-white mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-white">info@doorasho.so</p>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="text-white mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-white">+252 617 214 343</p>
                  </div>
                  <div className="flex items-start">
                    <FaClock className="text-white mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-white">arbaca - Jimcaha: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808521043341!2d45.3189113153306!3d2.046597359578982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d5842591e6a1ea7%3A0x3a4dfa8f4c8d5b1e!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;