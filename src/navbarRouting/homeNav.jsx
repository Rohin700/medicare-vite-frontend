/*
     Navigate (Component)
     ✅ Used inside JSX to trigger a redirect.

     useNavigate (Hook)
    ✅ Used inside JavaScript logic/functions (not JSX).
*/ 
import React, { use, useState } from 'react';
import { Heart, Menu, X, Pill } from 'lucide-react';
import { useNavigate,Outlet } from 'react-router-dom';

export default function MedicalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let navg = useNavigate();

  let doNavigate = (url) => {
    navg("/"+url);
  }


  return (
    <>
    <nav className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-800">MediCare</span>
              <span className="text-xs text-gray-500">Online Pharmacy</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                onClick={()=>doNavigate("")}
            >
              <Pill className="h-4 w-4" />
              <span>Home</span>
            </button>
            
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                onClick={()=>doNavigate("register")}
            >
              Register
            </button>
            
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                onClick={()=>doNavigate("login")}
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 border border-gray-200">
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-all duration-200"
                onClick={()=>doNavigate("")}
              >
                <Pill className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </button>
              
              <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                onClick={()=>doNavigate("register")}
              >
                Sign Up
              </button>
              
              <button className="w-full text-left border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                onClick={()=>doNavigate("login")}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    <Outlet></Outlet>
    </>
  );
}