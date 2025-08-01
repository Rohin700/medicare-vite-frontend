/*
  setFormData({
  ...formData,
  ...
}); 

this is not correct though it seems to be correct as if you're calling setFormData after an await or async call,
formData might be stale, because React state updates are asynchronous.
So by the time your setFormData({...formData, ...newValues}) runs, it might be using old or empty formData, not the most updated version.
That’s why values get erased (e.g., front pic data lost after back pic upload)

so to prevent this 
Must use 
setFormData(prev => ({
  ...prev,
  ...newData
}));

this is Up-to-Date State with the Functional Updater.
This ensures you always use the latest state.
*/ 

import React, { useState } from 'react';
import { Upload, User, Phone, Mail, Calendar, MapPin, CreditCard, Receipt } from 'lucide-react';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import { useEffect } from 'react';
import {serverai_url} from './config/urlai';

export default function RecipientProfileForm() {
  const [formData, setFormData] = useState({
    email: '',
    contactno: '',
    name: '',
    dob: '',
    gender: '',
    address: '',
    aadharfrontpicpath : null,
    aadharbackpicpath : null
  });

  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [isExpired , setTokenExpiry] = useState(false); 

  useEffect(()=>{
    let email = localStorage.getItem("email");
    setFormData({...formData , email : email});

    let token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)){
      setTokenExpiry(true);
      localStorage.removeItem("token");
    }
  },[])// Only runs once on mount
  //if i remove this [] then it will keep on running
  
  const handleInputChange = (e) => {
    var name = e.target.name;
    var val = e.target.value;

    setFormData({...formData, [name] : val});
  };

async function handleImageUpload(e, type) {
  const file = e.target.files[0];
  const previewURL = URL.createObjectURL(file);
  let url = serverai_url + "/recipient/picreader";

  let fd = new FormData();
  fd.append("aadharpic", file);
  fd.append("type", type);

  if (type === "front") {
    setFrontPreview(previewURL);

    try {
      let token = localStorage.getItem("token");
      let resp = await axios.post(url, fd, {headers: { 'Content-Type': 'multipart/form-data', 'authorization ' : `Bearer ${token}` }});
      alert(JSON.stringify(resp.data));

      setFormData(prev => ({
        ...prev,
        name: resp.data.name,
        gender: resp.data.gender,
        dob: resp.data.dob,
        aadharfrontpicpath: resp.data.aadharfrontpicpath
      }));
    } catch (err) {
      console.log(err);
      alert("Error uploading front image");
    }

  } else {
    setBackPreview(previewURL);

    try {
      let token = localStorage.getItem("token");
      let response = await axios.post(url, fd , {headers : {'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}});
      alert(JSON.stringify(response.data));

      setFormData(prev => ({
        ...prev,
        address: response.data.address,
        aadharbackpicpath: response.data.aadharbackpicpath
      }));
    } catch (err) {
      console.log(err);
      alert("Error uploading back image");
    }
  }
}

  async function handleFetch () {
    let url = serverai_url + "/recipient/dofetchdata";

    let token = localStorage.getItem("token");
    let resp = await axios.post(url , {email : formData.email} ,{headers: { 'Content-Type': 'multipart/form-data', 'authorization ' : `Bearer ${token}` }});
    alert(resp.data.msg);

    if(resp.data.status){
        const recipientData = resp.data.obj;

        setFormData({
            email : recipientData.email,
            contactno : recipientData.contactno,
            aadharfrontpicpath : recipientData.aadharfrontpicpath,
            aadharbackpicpath : recipientData.aadharbackpicpath,
            name : recipientData.name , 
            dob : recipientData.dob,
            address : recipientData.address,
            gender : recipientData.gender
        })
        setFrontPreview(resp.data.obj.aadharfrontpicpath);
        setBackPreview(resp.data.obj.aadharbackpicpath);
    }
  }
    

  async function handleSave () {
    if(!formData.email || !formData.contactno || !formData.aadharfrontpicpath || !formData.aadharbackpicpath){
        alert("Please fill the form accurately");
        return;
    }
    let url = serverai_url + "/recipient/dosavedetails";
    let fd = new FormData()

    for(let prop in formData){
        if(formData[prop] != null && formData[prop] != undefined){
            fd.append(prop,formData[prop]);
        }
    }
    let token = localStorage.getItem("token");
    let resp = await axios.post(url, fd , {headers : {'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})
    alert(resp.data.msg)
  };

  async function handleUpdate () {
    if(!formData.email || !formData.contactno || !formData.aadharfrontpicpath || !formData.aadharbackpicpath){
        alert("To updat please fill the fields accurately");
        return;
    }

    let url = serverai_url + "/recipient/doupdatedetails";
    let fd = new FormData();

    for(let prop in formData){
        if(formData[prop] != null && formData[prop] != undefined){
            fd.append(prop,formData[prop]);
        }
    }

    let token = localStorage.getItem("token");
    let resp = await axios.post(url, fd , {headers : {'Content-Type': 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})
    alert(resp.data.msg)
  };

  const handleClear = () => {
    setFormData({
      contactno: '',
      name: '',
      dob: '',
      gender: '',
      address: '',
      aadharfrontpicpath : null,
      aadharbackpicpath : null
    });

    setFrontPreview(null);
    setBackPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <User className="w-6 h-6" />
          Recipient Profile - Medical Form
        </h1>
        <p className="text-blue-600 mt-1">
          Please fill in all required information accurately
          {<span className=" ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Update Mode</span>}
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Section */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address *
          </label>
          <div className="flex gap-3">
            <input
              type="email"
              readOnly
              name="email"
              disabled={isExpired}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter recipient's email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={handleFetch}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Fetch
            </button>
          </div>
        </div>

        {/* Contact Number Section */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-1" />
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactno"
            disabled={isExpired}
            value={formData.contactno}
            onChange={handleInputChange}
            placeholder="Enter 10-digit contact number"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>

        {/* Aadhar Card Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Front Side Aadhar */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Aadhar Card - Front Side
              </h3>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              {frontPreview ? (
                <div className="space-y-3">
                  <img 
                    src={frontPreview} 
                    alt="Aadhar Front" 
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    disabled={isExpired}
                    onClick={() => {
                    setFormData({...formData , ["aadharfrontpicpath"]:null});
                    setFrontPreview(null);
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Upload Front Side of Aadhar Card</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    name='aadharfrontpicpath'
                    disabled={isExpired}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'front')}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Personal Details for Front Side */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  readOnly
                  name="name"
                  disabled={isExpired}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="As per Aadhar card"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date of Birth *
                </label>
                <input
                  type="text"
                  readOnly
                  name="dob"
                  disabled={isExpired}
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <input
                  type="text"
                  readOnly
                  name="gender"
                  disabled={isExpired}
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="As per Aadhar card"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Back Side Aadhar */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5 transform rotate-180" />
                Aadhar Card - Back Side
              </h3>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              {backPreview ? (
                <div className="space-y-3">
                  <img 
                    src={backPreview} 
                    alt="Aadhar Back" 
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    disabled={isExpired}
                    onClick={() => {
                      setBackPreview(null);
                      setFormData({...formData , ["aadharbackpicpath"]:null});
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Upload Back Side of Aadhar Card</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    name='aadharbackpicpath'
                    disabled={isExpired}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'back')}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Address Details for Back Side */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline w-4 h-4 mr-1" />
                Address *
              </label>
              <textarea
                name="address"
                disabled={isExpired}
                readOnly
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Complete address as per Aadhar card"
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Save Recipient Profile
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors font-medium"
            >
              Update Recipient Profile
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isExpired}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}