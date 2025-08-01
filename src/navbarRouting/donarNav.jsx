import React, { useState } from 'react';
import { Heart, Menu, X, User, Pill, Stethoscope, List, FileText, Home, LogOut } from 'lucide-react';
import { useNavigate,Outlet } from 'react-router-dom';

export default function DonorNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let navg = useNavigate();

  let doNavigate = (url) => {
    navg("/donar/" + url);
  }

  let doNavigateLogOut = () => {
    localStorage.removeItem("token");
    navg("/" , {replace : true} );
  }

  return (
    <>
    <nav className="bg-white shadow-lg border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-800">MediDonate</span>
              <span className="text-xs text-gray-500">Donor Portal</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("")}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("donardetails")}
            >
              <User className="h-4 w-4" />
              <span>Donor Details</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("meddonate")}
            >
              <Pill className="h-4 w-4" />
              <span>Medicine Donation</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("equipdonate")}
            >
              <Stethoscope className="h-4 w-4" />
              <span>Equipment Donation</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("listmed")}
            >
              <List className="h-4 w-4" />
              <span>Medicine List</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-green-50"
                onClick={()=>doNavigate("listequip")}
            >
              <FileText className="h-4 w-4" />
              <span>Equipment List</span>
            </button>

            <button className="flex items-center space-x-1 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 font-medium px-3 py-2 rounded-md"
                onClick={doNavigateLogOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 border border-gray-200">
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("")}
              >
                <Home className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </button>

              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("donardetails")}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Donor Details</span>
              </button>
              
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("meddonate")}
              >
                <Pill className="h-4 w-4" />
                <span className="font-medium">Medicine Donation</span>
              </button>
              
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("equipdonate")}
              >
                <Stethoscope className="h-4 w-4" />
                <span className="font-medium">Equipment Donation</span>
              </button>
              
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("listmed")}
              >
                <List className="h-4 w-4" />
                <span className="font-medium">Medicine List</span>
              </button>
              
              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-all duration-200"
                  onClick={()=>doNavigate("listequip")}
              >
                <FileText className="h-4 w-4" />
                <span className="font-medium">Equipment List</span>
              </button>

              <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200"
                  onClick={doNavigateLogOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
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