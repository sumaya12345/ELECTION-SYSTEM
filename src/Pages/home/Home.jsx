import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/home_component/Navbar";
import Footer from "../../Components/home_component/Footer";

function Home() {
  return (
    <div className=" bg-black text-gray-200">
    <div className="flex flex-col min-h-screen bg-white">
      {/* Modern Navbar */}
      <Navbar />

      {/* Hero Section - Minimalist Gradient */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-950 to-purple-950 overflow-hidden">
        {/* Somali cultural background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMTBjMjIsMCw0MCwxOCw0MCw0MHMtMTgsNDAtNDAsNDBzLTQwLTE4LTQwLTQwUzI4LDEwLDUwLDEweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              <span className="block">One Person, One Vote</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-50">
                Equality and Justice
              </span>
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
              The most secure digital voting platform, ensuring your safety and security, while being easy to access and use
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="relative inline-flex items-center px-8 py-4 border border-transparent text-2xl font-semibold rounded-full text-white bg-gradient-to-br from-purple-900 via-blue-950 to-black shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Start
                <svg
                  className="ml-3 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                to="/login"
                className="relative inline-flex items-center px-8 py-4 border border-blue-100 text-lg font-semibold rounded-full text-white bg-black hover:bg-blue-900/100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Tusaale Platform
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            className="w-full h-16 text-white"
            viewBox="0 0 1200 120"
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
      </section>

      {/* Somali Cultural Showcase */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Culture & Technology"
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              The Democratic Culture of Somalia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image 1 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://i.pinimg.com/736x/26/e5/5f/26e55f3a7bf5e3b2bab708c69d6e10c3.jpg"
                alt="Beelaha Soomaaliyeed oo isugu yimaada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
                  Beelaha Soomaaliyeed oo isugu yimaada
                </h3>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://i.pinimg.com/736x/1a/6e/1e/1a6e1e00bc24c1632e46d6e4170312b3.jpg"
                alt="Xarunta Muqdisho ee quruxda badan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
                  Xarunta Muqdisho ee quruxda badan
                </h3>
              </div>
            </div>

            {/* Image 3 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://i.pinimg.com/1200x/fa/bf/0f/fabf0fd7e09ee0b1f9cacaadf73a6770.jpg"
                alt="Quraacda Laas Geel ee taariikhda dheer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
              Musharax Mohamed  cabdullahi farmaajo
                </h3>
              </div>
            </div>
          </div>

          {/* Additional Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Image 4 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://i.pinimg.com/736x/27/ba/04/27ba043788e0185858eb639ed99009ff.jpg"
                alt="musharax saciid cabdillahi deni"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
                Musharax Hassan Alli Kheyre 


                </h3>
              </div>
            </div>

            {/* Image 5 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://i.pinimg.com/1200x/f3/b5/d0/f3b5d06ffeb0841666559d4ca4c7f599.jpg"
                alt="xasan sheekh maxamuud"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
                musharax Hamze abdi barre
                </h3>
              </div>
            </div>

            {/* Image 6 */}
            <div className="relative rounded-xl overflow-hidden shadow-xl h-64">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EX-GJpVk0Hy-9Z_3HSlGAr-Ow_w6imOXhg&s"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">
                musharax sheekh shariif 
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Technology Showcase */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
               Built on the latest technology
              </h2>
              <p className="mt-3 text-xl text-gray-500">
               Our platform uses zero-knowledge proofs and ledger technology to create a tamper-proof voting system.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/technology"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white  bg-gradient-to-r from-black via-blue-950 to-purple-950 hover:from-blue-700 hover:to-blue-600 md:py-4 md:text-lg md:px-10"
                  >
                    Learn About Our Technology

                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white overflow-hidden rounded-lg">
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0  bg-gradient-to-r from-black via-blue-950 to-purple-950 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">
                        Security-First Architecture
                        </h3>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-purple-950"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                         Real-time verification with verifiable voting audit trail
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-purple-950"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                          Blockchain ensures an immutable history
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-purple-950"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                          Biometric verification options designed for high-security elections
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24  bg-gradient-to-r from-black via-blue-950 to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-200 font-semibold tracking-wide uppercase">
              Trusted in Somalia
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              What Our Partners Say
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    AA
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Axmed Cali</h3>
                  <p className="text-white">
                    Chairperson of Elections, Mogadishu
                  </p>
                </div>
              </div>
              <p className="mt-4 text-white">
                "We reduced election costs by 70% while increasing voter registration participation. Security has completely transformed how our city is managed."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                    FK
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    Fadumo Khaliif
                  </h3>
                  <p className="text-white">
                    "Director, Somali Democracy Institute"

                  </p>
                </div>
              </div>
              <p className="mt-4 text-white">
                "Cryptographic auditing gives us full confidence in election results. We are now implementing it nationwide."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold">
                    MA
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    Maxamed Cabdi
                  </h3>
                  <p className="text-white">
                    "Manager, Horn Digital Solutions"

                  </p>
                </div>
              </div>
              <p className="mt-4 text-white">
                "After evaluating many platforms, this is the only solution that meets our security needs while being easily accessible to Somali voters."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            "Ready to transform Somalia's elections?"

          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            "Join Somali institutions advancing democratic processes."
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white  bg-gradient-to-r from-black via-blue-950 to-purple-950 hover:from-blue-700 hover:to-blue-600"
              >
                start today
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white  bg-gradient-to-r from-black via-blue-950 to-purple-950 hover:bg-blue-200"
              >
               "Contact Our Team"

              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <Footer />
    </div>
    </div>
  );
}

export default Home;
