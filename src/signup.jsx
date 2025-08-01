/*
  Have to embed the nodemailer here
*/ 
import React, { use, useState } from "react";
import { User, Mail, Phone, Lock, Moon, Sun } from 'lucide-react';
import RegisterCombo from "./registercombo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {server_url} from './config/url';


const Signup = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [obj, setObj] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneno: "",
    pwd: "",
    utype: ""
  });

  const doUpdate = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setObj({ ...obj, [name]: value });
  };

  const showSelComp = (selComp) => {
    alert(selComp);
    setObj({ ...obj, ["utype"]: selComp });
  };

  const doRegister = async () => {
    if(obj.pwd.length < 8){
      alert("Password length is less than 8");
      return;
    }
    try {
      console.log(obj);
      let url = server_url + "/register/doregister";
      let resp = await axios.post(url, obj);

      alert(resp.data.msg);
      // alert(resp.data.token);

      // localStorage.setItem("token" , resp.data.token);//the received token from the backend is set in the local storage 
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  let navg = useNavigate();
  let doNavigate=(url)=>{
    navg("/"+url);
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-md w-full space-y-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md ${
              darkMode
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            } transition-colors duration-200 shadow-sm border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="text-center">
          <h2 className={`mt-6 text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>
            Register for a free account
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Please fill in your details to create an account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); doRegister(); }}>
          <div className="space-y-4">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="fname" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="fname"
                    name="fname"
                    type="text"
                    value={obj.fname}
                    onChange={doUpdate}
                    className={`block w-full pl-10 pr-3 py-2 border 
                      rounded-md ${
                      darkMode
                        ? 'bg-gray-800 text-white placeholder-gray-400'
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Your first name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lname" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="lname"
                    name="lname"
                    type="text"
                    value={obj.lname}
                    onChange={doUpdate}
                    className={`block w-full pl-10 pr-3 py-2 border 
                      rounded-md ${
                      darkMode
                        ? 'bg-gray-800 text-white placeholder-gray-400'
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Your last name"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  value={obj.email}
                  name="email"
                  type="email"
                  onChange={doUpdate}
                  className={`block w-full pl-10 pr-3 py-2 border 
                    rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phoneno" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="phoneno"
                  name="phoneno"
                  value={obj.phoneno}
                  type="tel"
                  onChange={doUpdate}
                  className={`block w-full pl-10 pr-3 py-2 border 
                    rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="pwd" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="pwd"
                  value={obj.pwd}
                  name="pwd"
                  type="password"
                  onChange={doUpdate}
                  className={`block w-full pl-10 pr-3 py-2 border 
                    rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Password"
                />
              </div>
            </div>

            <RegisterCombo
              darkMode={darkMode}
              doshowSelComp={showSelComp}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 -ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">Register</span>
          </button>
          
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Already have an account?{" "}
            <span
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-200"
              onClick={() => doNavigate("login")}
            >
            Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;