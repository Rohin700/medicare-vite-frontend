// npm install jwt-decode to decode the token in the frontend where we are checking the ecpiry time 
import React, { useState } from 'react';
import { Sun, Moon, Mail, Pill, Building, Calendar, Package, Hash, FileText } from 'lucide-react';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import { useEffect } from 'react';
import {server_url} from './config/url'

function MedicineDonationForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    medname: '',
    company: '',
    expdate: '',
    packingtype: '',
    qty: '',
    otherinfo: ''
  });
  
  const[isExpired, setTokenExpiry] = useState(false);//to check the expiry fo the jwtoken
  useEffect(()=>{
    let email = localStorage.getItem("email");
    setFormData({...formData, email : email})

    const token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)){
      setTokenExpiry(true);
      localStorage.removeItem("token");
    }
  },[])

  const handleChange = (e) => {

    var name = e.target.name;
    var val = e.target.value;

    setFormData({...formData , [name] : val})
  };

  async function handleSubmit () {
   if(!formData.email || !formData.company || !formData.medname || !formData.expdate || !formData.packingtype || !formData.qty || !formData.otherinfo){
        alert("Kindly fill the complete information");
        return;
   }

    let url = server_url + "/donar/doavailmed"
    let fd = new FormData();

    for (let prop in formData) {
    if (formData[prop] != null && formData[prop] !== undefined) {
        if (prop === "medname" && typeof formData[prop] === "string") {
            fd.append(prop, formData[prop].toLowerCase());
        } else {
            fd.append(prop, formData[prop]);
        }
      }
    }

    let token = localStorage.getItem("token");
    let resp = await axios.post(url ,fd ,{headers : {'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})

    alert(resp.data.msg);
  };

  async function handleUpdate() {
    if(!formData.email || !formData.company || !formData.medname || !formData.expdate || !formData.packingtype || !formData.qty || !formData.otherinfo){
        alert("Kindly fill the complete information");
        return;
   }
    let url = server_url + "/donar/doupdatemed";
    let fd = new FormData();

    for(let prop in formData){
        if(formData[prop] != null && formData[prop] != undefined){
          if(prop === "medname" && typeof formData[prop] === "string"){
            fd.append(prop , formData[prop]);
          }
        }
    }

    let token = localStorage.getItem("token");
    let resp = await axios.post(url , fd , {headers : {'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}`}});
    alert(resp.data.msg);
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
            Donate Medicine
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Help others by donating your unused medicines
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
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
                  name="email"
                  type="email"
                  readOnly
                  autoComplete="email"
                  required
                  disabled={isExpired}
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Medicine Name Field */}
            <div>
              <label htmlFor="medname" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Medicine Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Pill className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  disabled={isExpired}
                  id="medname"
                  name="medname"
                  type="text"
                  required
                  value={formData.medname}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter medicine name"
                />
              </div>
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Company
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="company"
                  name="company"
                  disabled={isExpired}
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter company name"
                />
              </div>
            </div>

            {/* Expiry Date Field */}
            <div>
              <label htmlFor="expdate" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Expiry Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="expdate"
                  name="expdate"
                  disabled={isExpired}
                  type="date"
                  required
                  value={formData.expdate}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                />
              </div>
            </div>

            {/* Packing Type Field */}
            <div>
              <label htmlFor="packingtype" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Packing Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <select
                  id="packingtype"
                  name="packingtype"
                  required
                  disabled={isExpired}
                  value={formData.packingtype}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  <option value="">Select packing type</option>
                  <option value="bottle">Bottle</option>
                  <option value="strip">Strip</option>
                  <option value="syringe">Syringe</option>
                </select>
              </div>
            </div>

            {/* Quantity Field */}
            <div>
              <label htmlFor="qty" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Quantity
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="qty"
                  name="qty"
                  disabled={isExpired}
                  type="number"
                  min="1"
                  required
                  value={formData.qty}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            {/* Other Info Field */}
            <div>
              <label htmlFor="otherinfo" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Other Information
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <textarea
                  id="otherinfo"
                  name="otherinfo"
                  disabled={isExpired}
                  rows="3"
                  value={formData.otherinfo}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none`}
                  placeholder="Any additional information about the medicine..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Donate Medicine
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Update
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
              Your donation will help save lives.{' '}
              <span className="font-medium text-blue-600">Thank you for your generosity!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineDonationForm;