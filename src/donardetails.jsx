/*
  I need to embed the digilocker Api here
  We cannot embed it because digilocked api requires a well established organizations name
*/
import React, { useState } from 'react';
import { Sun, Moon, Mail, User, Calendar, MapPin, Home, Briefcase, GraduationCap, Users, Upload, Image, Search } from 'lucide-react';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import { useEffect } from 'react';
import {server_url} from './config/url'

function DonorDetailsForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    curraddress: '',
    currcity: '',
    gender: '',
    qualification: '',
    occupation: '',
    profilepic : null,
    aadharpic : null
  });
  const [ppic, setProfilePic] = useState(null);
  const [apic, setAadharPic] = useState(null);
  const[isExpired , setTokenExpiry] = useState(false);

  useEffect(()=>{
    const email = localStorage.getItem("email");
    setFormData({...formData , email : email});
    const token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)){
      localStorage.removeItem("token");
      setTokenExpiry(true);
    }
  },[])

  const handleChange = (e) => {
    var name = e.target.name;
    var val = e.target.value;
    
    setFormData({...formData , [name] : val});
  };

  const handlePicUpload = (e, type) => {    
    if(type == "profile"){
        setFormData({...formData , ["profilepic"] : e.target.files[0]});
        setProfilePic(URL.createObjectURL(e.target.files[0]));

    }else if(type == "aadhar"){
        setFormData({...formData , ["aadharpic"] : e.target.files[0]})
        setAadharPic(URL.createObjectURL(e.target.files[0]));
    }
  };

  async function handleSubmit () {
    // Basic validation
    if (!formData.email || !formData.name || !formData.age || !formData.curraddress || 
        !formData.currcity || !formData.gender || !formData.qualification || !formData.occupation | !formData.profilepic || !formData.profilepic) {
      alert('Please fill in all required fields');
      return;
    }
    
    let url = server_url + "/donar/dosavedeatils"
    let fd = new FormData();
    
    for(let prop in formData){

        if(formData[prop] != null && formData[prop] != undefined){
            fd.append(prop,formData[prop]);
        }
    }


    let token = localStorage.getItem("token");//fetched the saved token from the localstorage
    let resp = await axios.post(url, fd, {headers: { 'Content-Type': 'multipart/form-data', 'authorization ' : `Bearer ${token}` }})// sent the token in the req to validate
    alert(resp.data.msg);
  };

  async function handleUpdate () {
    //Basic validation
    if (!formData.email || !formData.name || !formData.age || !formData.curraddress || 
        !formData.currcity || !formData.gender || !formData.qualification || !formData.occupation) {
      alert('Please fill in all required fields');
      return;
    }
    
    let url = server_url + "/donar/doupdatedetails";
    let fd = new FormData();

    for (let prop in formData) {
    if (formData[prop] !== null && formData[prop] !== undefined) {

      if (prop === "profilepic") {
        if (formData.profilepic instanceof File) {
          fd.append("profilepic", formData.profilepic); // new upload
        } else {
          fd.append("profilepicpath", formData.profilepic); // existing path
        }
      } 
      
      else if (prop === "aadharpic") {
        if (formData.aadharpic instanceof File) {
          fd.append("aadharpic", formData.aadharpic);
        } else {
          fd.append("aadharpicpath", formData.aadharpic);
        }
      } 
      
      else {
        fd.append(prop, formData[prop]);
      }
    }
  }

    let token = localStorage.getItem("token");//Token
    let response = await axios.post(url , fd , {headers: { 'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}` }});
    alert(response.data.msg);
    console.log(response.data);
  };

   async function handleFetchData () {
        let url = server_url + "/donar/dofetch";
        let fd = new FormData();

        for(let prop in formData){
            if(formData[prop] != null && formData[prop] != undefined){
                fd.append(prop,formData[prop]);
            }
        }

    let token = localStorage.getItem("token");
    let response = await axios.post(url , fd , {headers: { 'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}`}});

    alert(JSON.stringify(response.data.obj));

    if(response.data.status){
        const donorData = response.data.obj;

        setFormData({
            email: donorData.email ,
            name: donorData.name ,
            age: donorData.age ,
            curraddress: donorData.curraddress ,
            currcity: donorData.currcity ,
            gender: donorData.gender ,
            qualification: donorData.qualification ,
            occupation: donorData.occupation ,
            profilepic : donorData.profilepicpath,
            aadharpic : donorData.aadharpicpath
        })

        setProfilePic(response.data.obj.profilepicpath);
        setAadharPic(response.data.obj.aadharpicpath);
    }
    alert(response.data.msg);
  };

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const qualificationOptions = [
    { value: '', label: 'Select Qualification' },
    { value: 'high-school', label: 'High School' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'other', label: 'Other' }
  ];

  const occupationOptions = [
    { value: '', label: 'Select Occupation' },
    { value: 'student', label: 'Student' },
    { value: 'employee', label: 'Employee' },
    { value: 'business', label: 'Business Owner' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'retired', label: 'Retired' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-2xl w-full space-y-8">
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
            Donor Details
          </h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>
            Please fill in your information to complete the registration
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Field with Fetch Data Button */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Email Address
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    readOnly
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isExpired}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                      darkMode
                        ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                        : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetchData}
                  className={`px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 flex items-center`}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="name"
                  type="text"
                  disabled={isExpired}
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Age
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="age"
                  type="number"
                  disabled={isExpired}
                  min="18"
                  max="80"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your age"
                />
              </div>
            </div>

            {/* Gender Field */}
            <div>
              <label htmlFor="gender" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Gender
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <select
                  name="gender"
                  required
                  disabled={isExpired}
                  value={formData.gender}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Current Address Field */}
          <div>
            <label htmlFor="curraddress" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
              Current Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <textarea
                name="curraddress" 
                rows="3" 
                disabled={isExpired}
                required 
                value={formData.curraddress}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                  darkMode
                    ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none`}
                placeholder="Enter your current address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current City Field */}
            <div>
              <label htmlFor="currcity" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Current City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="currcity" 
                  type="text" 
                  disabled={isExpired}
                  value={formData.currcity}
                  onChange={handleChange} 
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your city"
                />
              </div>
            </div>

            {/* Qualification Field */}
            <div>
              <label htmlFor="qualification" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Qualification
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <select 
                  name="qualification" 
                  required 
                  value={formData.qualification}
                  onChange={handleChange} 
                  disabled={isExpired}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  {qualificationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Occupation Field */}
            <div>
              <label htmlFor="occupation" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 transition-colors duration-200`}>
                Occupation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <select 
                  name="occupation" 
                  required 
                  value={formData.occupation}
                  onChange={handleChange} 
                  disabled={isExpired}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-900 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                >
                  {occupationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture Upload */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
                Profile Picture
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                darkMode
                  ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}>
                {ppic ? (
                  <div className="space-y-2">
                    <img
                      src={ppic}
                      alt="Profile preview"
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Profile picture uploaded
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <User className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Upload profile picture
                    </p>
                  </div>
                )}
                <input
                  type="file" accept="image/*" disabled={isExpired} onChange={(e) => handlePicUpload(e, 'profile')} className="hidden" id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </div>
            </div>

            {/* Aadhar Picture Upload */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 transition-colors duration-200`}>
                Aadhar Card
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                darkMode
                  ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}>
                {apic ? (
                  <div className="space-y-2">
                    <img
                      src={apic}
                      alt="Aadhar preview"
                      className="mx-auto h-24 w-32 rounded object-cover"
                    />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Aadhar card uploaded
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Image className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Upload Aadhar card
                    </p>
                  </div>
                )}
                <input
                  type="file" disabled={isExpired} accept="image/*" onChange={(e) => handlePicUpload(e, 'aadhar')} className="hidden" id="aadhar-upload"
                />
                <label
                  htmlFor="aadhar-upload"
                  className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div>
            <button
              type="button"
              onClick={handleUpdate}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 mb-4"
            >
              Update Donor Details
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Submit Donor Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDetailsForm;