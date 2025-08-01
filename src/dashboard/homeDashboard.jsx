import React, { useState } from 'react';
import { Heart, Menu, X, Pill, Clock, Shield, Truck, Star, Moon, Sun } from 'lucide-react';
import myPic from '../assets/mypic.png';

export default function HomeDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>

      {/* 🌗 Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md shadow-sm border transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-gray-800 via-gray-900 to-black' : 'from-blue-600 via-blue-700 to-blue-800'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">MediCare</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your trusted online pharmacy delivering quality healthcare products right to your doorstep. Safe, reliable, and convenient.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose MediCare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl hover:shadow-lg transition-shadow duration-200`}>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Round-the-clock availability for all your medical needs</p>
            </div>
            
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl hover:shadow-lg transition-shadow duration-200`}>
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>All products are verified and sourced from licensed suppliers</p>
            </div>
            
            <div className={`text-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl hover:shadow-lg transition-shadow duration-200`}>
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quick and secure delivery to your location</p>
            </div>
          </div>
        </div>
      </div>
      {/* Slogan */}
      <div className={`${darkMode ? 'bg-gray-600' : 'bg-blue-600'} text-white text-center text-xl font-semibold py-4 px-2 mb shadow-md dark:shadow-lg`}>
        "Connecting Lives, One Trusted Donation at a Time"
      </div>

      {/* Founder Deatils */}
  <div className={`${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'} py-10`}>
      <h2 className="text-3xl font-bold text-center mb-8">The Vision</h2>

     <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 max-w-4xl mx-auto">
        <img
          src ={myPic}
          alt="Founder"
          className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover shadow-md"
        />
    
        <p className="text-justify text-base leading-relaxed">
          Our platform ensures secure and trusted medicine donation by integrating GeminiAPI for donor
          identity verification. Verified donors can confidently share surplus medicines, while recipients can
          easily browse city-specific listings and directly connect with trusted individuals in their area.
          This localized and transparent approach promotes safety, accessibility, and community-driven
          healthcare support.
        </p>
      </div>
  </div>

      {/* Reach Us Section */}
      <div className="h-10 bg-gray-600 text-2xl text-center text-white py-1">
        Reach Us
      </div>

      <div className="w-full h-[500px]">
        <iframe
          title="Chitkara University Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.175134314862!2d76.6597778!3d30.5160865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1753975145511!5m2!1sen!2sin"
          className="w-full h-full border-0"
        ></iframe>
      </div>


      {/* Call to Action */}
      <div className={`${darkMode ? 'bg-gray-600' : 'bg-blue-600'} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust MediCare for their healthcare needs.
          </p>
        </div>
      </div>
    </div>
  );
}
