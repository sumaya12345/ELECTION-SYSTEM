import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTelegram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className=" bg-gradient-to-r from-black via-blue-950 to-purple-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Xogta Xiriirka */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-blue-500 pb-2">
             Contact Information

            </h3>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-blue-300 mt-1 flex-shrink-0" />
              <p className="text-blue-100">Mogadishu, Somalia</p>
            </div>
            <div className="flex items-start space-x-3">
              <FaEnvelope className="text-blue-300 mt-1 flex-shrink-0" />
              <p className="text-blue-100">info@doorashada.so</p>
            </div>
            <div className="flex items-start space-x-3">
              <FaPhone className="text-blue-300 mt-1 flex-shrink-0" />
              <p className="text-blue-100">+252 61 26474 87566</p>
            </div>
          </div>

          {/* Xiriir Degdeg ah */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-blue-500 pb-2">
              Quick Contact

            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/contact"
                  className="flex items-center text-blue-100 hover:text-white transition duration-300"
                >
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Get in Touch

                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="flex items-center text-blue-100 hover:text-white transition duration-300"
                >
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="flex items-center text-blue-100 hover:text-white transition duration-300"
                >
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                Help & Support

                </a>
              </li>
            </ul>
          </div>

          {/* Nala Soco */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-blue-500 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <FaTelegram className="text-xl" />
              </a>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              Stay connected to receive the latest news and updates

            </p>
          </div>

          {/* Feedback */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-blue-500 pb-2">
              Your Vision
            </h3>
            <p className="text-blue-100">
              We value your feedback. Share your ideas with us to help improve our services.
            </p>
            <a
              href="/feedback"
              className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md font-medium shadow-sm transition duration-300"
            >
              Share Your Feedback
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-600 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()}  Election Management Tools. All Rights Reserved.".
            </p>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-white hover:text-white text-sm transition duration-300"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
