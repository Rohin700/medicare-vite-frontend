import React, { useState } from 'react';
import { Sun, Moon, Mail, Wrench, Building, Clock, Package, Hash, FileText } from 'lucide-react';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import { useEffect } from 'react';
import {server_url} from './config/url'

function EquipmentDonationForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    equipment: '',
    company: '',
    purchasedtime: '',
    packingtype: '',
    qty: '',
    otherinfo: ''
  });

  const[isExpired , setTokenExpiry] = useState(false);
  useEffect(()=>{
    let email = localStorage.getItem("email");
    setFormData({...formData, email : email})

    let token = localStorage.getItem("token")
    if(!token || isTokenExpired(token)){
      localStorage.removeItem("token")
      setTokenExpiry(true);
    }
  },[])

  const handleChange = (e) => {
    var name = e.target.name;
    var val = e.target.value;

    setFormData({...formData , [name] : val});
  };

  async function handleSubmit () {
    if(!formData.email || !formData.equipment || !formData.company || !formData.purchasedtime || !formData.packingtype || !formData.qty || !formData.otherinfo){
      alert("Please Fill the form carefully")
      return
    }
    let url = server_url + "/donar/doavailequipment";

    let fd = new FormData();
    
    for(let prop in formData){
      if(formData[prop] != null && formData[prop] != undefined){
        if(prop === "equipment" && typeof formData[prop] === "string"){
          fd.append(prop , formData[prop].toLowerCase());
        }else{
          fd.append(prop , formData[prop]);
        }
      }
    }

    let token = localStorage.getItem("token");
    let response = await axios.post(url , fd, {headers : {'Content-Type': 'multipart/form-data', 'authorization' : `Bearer ${token}`}})

    alert(response.data.msg);
  };

  async function handleUpdate () {
    if(!formData.email || !formData.equipment || !formData.company || !formData.purchasedtime || !formData.packingtype || !formData.qty || !formData.otherinfo){
      alert("Please Fill the form carefully")
      return
    }

    let url = server_url + "/donar/doupdateequipment"

    let fd = new FormData();

    for(let prop in formData){
      if(formData[prop] != null && formData[prop] != undefined){
        fd.append(prop , formData[prop]);
      }
    }

    let token = localStorage.getItem("token");
    let response = await axios.post(url , fd , {headers : {'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})
    alert(response.data.msg);
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
            Donate Equipment
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Help others by donating your unused equipment
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
                  value={formData.email}
                  readOnly
                  disabled={isExpired}
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

            {/* Equipment Name Field */}
            <div>
              <label htmlFor="equipment" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Equipment Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Wrench className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="equipment"
                  name="equipment"
                  type="text"
                  disabled={isExpired}
                  required
                  value={formData.equipment}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter equipment name"
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
                  onChange={handleChange}
                  disabled={isExpired}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter company name"
                />
              </div>
            </div>

            {/* Purchased Time Field */}
            <div>
              <label htmlFor="purchasedtime" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Purchased Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <select
                  id="purchasedtime"
                  name="purchasedtime"
                  disabled={isExpired}
                  required
                  value={formData.purchasedtime}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  <option value="">Select purchase time</option>
                  <option value="under 3 months">Under 3 months</option>
                  <option value="under 6 months">Under 6 months</option>
                  <option value="under 1 year">Under 1 year</option>
                  <option value="more than a year">More than a year</option>
                </select>
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
                  value={formData.packingtype}
                  onChange={handleChange}
                  disabled={isExpired}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  <option value="">Select packing type</option>
                  <option value="wrapped with box">Wrapped with box</option>
                  <option value="unwrapped with box">Unwrapped with box</option>
                  <option value="unwrapped without box">Unwrapped without box</option>
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
                  type="number"
                  min="1"
                  required
                  disabled={isExpired}
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
                  disabled={isExpired}
                  name="otherinfo"
                  rows="3"
                  value={formData.otherinfo}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none`}
                  placeholder="Any additional information about the equipment..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Donate Equipment
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
export default EquipmentDonationForm;