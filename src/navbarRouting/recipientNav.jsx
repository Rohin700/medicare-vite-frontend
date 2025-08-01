import React, { useState } from 'react';
import { Home, User, Pill, Wrench, LogOut, Bandage, Menu, X } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function RecipientNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navg = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const doNavigate = (url) => {
    navg("/recipient/" + url);
    setIsMenuOpen(false); // close menu on nav
  };

  const doNavigateLogOut = () => {
    localStorage.removeItem("token");
    navg("/", { replace: true });
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b-2 border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start items-center h-16 gap-8">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <Bandage className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-yellow-600">MediRequire</span>
                <span className="text-xs text-gray-500">Recipient Portal</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-25 ml-6">
              <button onClick={() => doNavigate("")} className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-green-50 font-medium">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>

              <button onClick={() => doNavigate("recipientdetails")} className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-green-50 font-medium">
                <User className="h-4 w-4" />
                <span>Recipient Details</span>
              </button>

              <button onClick={() => doNavigate("findermed")} className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-green-50 font-medium">
                <Pill className="h-4 w-4" />
                <span>Medicine Finder</span>
              </button>

              <button onClick={() => doNavigate("finderequip")} className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md hover:bg-green-50 font-medium">
                <Wrench className="h-4 w-4" />
                <span>Equipment Finder</span>
              </button>

              <button onClick={doNavigateLogOut} className="flex items-center space-x-1 text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md font-medium">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden ml-auto">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-green-600 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-2 px-2 pt-2 pb-3 space-y-1 bg-gray-100 rounded-lg border border-gray-200">
              <button onClick={() => doNavigate("")} className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>

              <button onClick={() => doNavigate("recipientdetails")} className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition">
                <User className="h-4 w-4" />
                <span>Recipient Details</span>
              </button>

              <button onClick={() => doNavigate("findermed")} className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition">
                <Pill className="h-4 w-4" />
                <span>Medicine Finder</span>
              </button>

              <button onClick={() => doNavigate("finderequip")} className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition">
                <Wrench className="h-4 w-4" />
                <span>Equipment Finder</span>
              </button>

              <button onClick={doNavigateLogOut} className="flex items-center gap-2 w-full text-left px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
