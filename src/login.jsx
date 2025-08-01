/*
  Have to embed the nodemailer here
*/ 
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Moon, Sun, Upload } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {server_url} from './config/url';

let LoginForm = () => {
  const [objFormData, setFormData] = useState({ email: "", pwd: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  const navg = useNavigate();

  let doNavigate = (url) =>{
    navg("/"+url);
  }

  const handleChange = (e) => {
    var name = e.target.name;
    var val = e.target.value;
    setFormData({ ...objFormData, [name]: val });
  };

  async function doLogin(e) {
    try{
        e.preventDefault(); // prevent form from refreshing the page
        console.log(objFormData);

        let url = server_url + "/login/dologin";
        let resp = await axios.post(url, objFormData);
        console.log(resp.data.obj.utype);
        
        if(resp.data.status){
          alert(resp.data.msg)
          // alert(resp.data.token);

          localStorage.setItem("token" , resp.data.token);
          localStorage.setItem("email" , resp.data.obj.email);
          localStorage.setItem("utype" , resp.data.obj.utype);

          doNavigate("fillotp");
        }
        else{
          alert(resp.data.msg);
        }

        }catch(err){
        console.log(err.message);
        alert(err.message);
      }
  }

  const handleForgotPass = async () => {
    let url = server_url + "/login/forgotPass";
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
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Please enter your credentials to continue
          </p>
        </div>

        {/* 👇 form tag added here */}
        <form onSubmit={doLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              {/* The $ here just starts that dynamic expression insertion */}
              {/* Because double (") and single (') quotes don’t allow JS expressions inside strings with ${...} so we have to use backticks `` */}
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // is an HTML attribute that tells the browser:
                  // "When the user has previously entered an email in similar forms, suggest it here automatically
                  onChange={handleChange}
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="pwd"
                  name="pwd"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border 
                    rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-200`}>
                Remember me
              </label>
            </div>
            <div className="text-sm">
              {/* <a href="#" //same thing as of doNavigate iski we have done good practice so practicing doNavigate()
              onClick={handleForgotPass}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Forgot your password?
              </a> */}
              <input type="button" 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer" 
              value="Forgot your password?"
              onClick={()=>doNavigate("changepass")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
              Don't have an account?{' '}
              <span
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-200"
                onClick={() => doNavigate("register")}
              >
                Sign up here
              </span>
            </p>
          </div>
        </form>
        {/* 👆 form closed here */}
      </div>
    </div>
  );
};

export default LoginForm;
