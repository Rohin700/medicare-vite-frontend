import React, { useState } from 'react';
import { Search, Download, Pill, Mail, Calendar, MapPin, User, Package } from 'lucide-react';
import Task from "./listedmedtask";
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import { useEffect } from 'react';
import {server_url} from './config/url';

const MedicineList = () => {
  const [donorEmail, setDonorEmail] = useState('');
  const [loading , setLoading] = useState(false);
  const [medicines , setMedicines] = useState([]);
  const [errors , setError] = useState("");
  const [fetchBtn , setFetchBtn] = useState(false);

  const [isExpired , setTokenExpiry] = useState(false);

  useEffect(()=>{
    let email = localStorage.getItem("email");
    setDonorEmail(email);

    let token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)){
      setTokenExpiry(true);
      localStorage.removeItem("token");
    }
  })


  async function fetchMedicines () {
    if (!donorEmail) {
      alert("Please Enter the email")
      return;
    } 

    if (!isValidEmail(donorEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try{

      let url = server_url + "/donar/dofetchallmed";

      let token = localStorage.getItem("token");
      let response = await axios.post(url , {email : donorEmail} , {headers : {'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})

      if (response.data.status == true) {
        alert(JSON.stringify(response.data.obj, null, 2));

        const medicinedata = Array.isArray(response.data.obj) ? response.data.obj : [response.data.obj];//This line checks if response.data.obj is an array or a single object
        const medicineDataWithStatus = medicinedata.map((obj)=>{
          return {
            ...obj ,
            id : obj.id || obj._id,
            completed : false ,
            isEditing : false 
          }
        })
        setMedicines(medicineDataWithStatus);
      }else {
        alert(response.data.msg);
        setMedicines([]);
      }
      setLoading(false);
    }catch(err){
      setError(err);
      alert(err);
    }
  }


  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function deleteMedicine (id) {
    try{
    let url = server_url + "/donar/dodeletemed";
    
    let token = localStorage.getItem("token");
    let resp = await axios.post(url , {_id : id} , {headers : {'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}})
     alert(resp.data.msg);

     if(resp.data.status){
      let updatedMedList = medicines.filter((obj)=>{
        return obj._id !== id;
      })
      setMedicines(updatedMedList);
     }

    }catch(err){
      alert(JSON.stringify(err));
    }
  }

  const toggleMedicine = () => {

  }

  const updateMedicine = (id) => {
    setFetchBtn(!fetchBtn);
    let medicines2 = medicines.map((obj)=>
      obj.id === id ?{...obj ,isEditing : true} : obj
  )

    setMedicines(medicines2);
  }

  async function saveMedicine  (editedMedicine)  {
    console.log("Edited medicine:", editedMedicine);

    try{
    let url = server_url + "/donar/doupdatemedtodo";
    let fd = new FormData();

    if (!editedMedicine.email || !editedMedicine.company) {
      alert("Missing email or company. Cannot update.");
      return;
    }

    for(let prop in editedMedicine){
      if(editedMedicine[prop]!= null && editedMedicine[prop]!= undefined){
        if(prop === "medname" && typeof editedMedicine[prop] === "string"){
          fd.append(prop , editedMedicine[prop].toLowerCase());
        }else{
          fd.append(prop , editedMedicine[prop]);
        }
      }
    }

    let token = localStorage.getItem("token");
    let resp = await axios.post(url , fd , {headers:{'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}});

    alert(resp.data.msg);

    const updatedList = medicines.map((med) =>
      med._id === editedMedicine._id
        ? { ...editedMedicine, isEditing: false }
        : med
    );

    setMedicines(updatedList);
    setFetchBtn(!fetchBtn);

    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center gap-3 justify-center mb-2">
          <Pill className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Medicine Donation List</h1>
        </div>
        <p className="text-center opacity-90">Enter donor email to fetch their medicine donations</p>
      </div>

      {/* Email Input and Fetch Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              disabled={isExpired}
              placeholder="Enter donor's email address..."
              value={donorEmail}
              readOnly
              onChange={(e) => setDonorEmail(e.target.value)}
              name="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={fetchMedicines}
            disabled={fetchBtn}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-5 h-5" />
            {loading ? 'Fetching...' : 'Fetch Medicines'}
          </button>
        </div>
        {errors && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors}
          </div>
        )}
        </div>

        {medicines.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Medicine Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600">
                {medicines.length}
              </h3>
              <p className="text-blue-800">Total Medicines</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">
                {medicines.filter((m) => !m.completed).length}
              </h3>
              <p className="text-green-800">Available</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-600">
                {medicines.filter((m) => m.completed).length}
              </h3>
              <p className="text-gray-800">Completed</p>
            </div>
          </div>
        </div>
        )}

        <div className="space-y-4">
        {medicines.map((medicine) => (
          <Task
            key={medicine.id || medicine._id}
            medicine={medicine}
            onToggle={toggleMedicine}
            onDelete={deleteMedicine}
            onUpdate={updateMedicine}
            onSave={saveMedicine}
          />
        ))}
        

        {medicines.length === 0 && !loading && (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No medicines found</h3>
            <p className="text-gray-400">Enter a donor's email to fetch their medicine donations</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MedicineList;