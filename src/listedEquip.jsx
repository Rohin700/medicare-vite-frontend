import React, { useEffect, useState } from 'react';
import { Search, Download, Pill, Mail, Calendar, MapPin, User, Package } from 'lucide-react';
import EqTask from './listedEquipTask';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import {server_url} from './config/url';


const EquipmentList = () => {
  const [donorEmail, setDonorEmail] = useState('');
  const [loading , setLoading] = useState(false);
  const [equipments , setEquipments] = useState([]);
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

  async function fetchEquipments () {
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

      let url = server_url + "/donar/dofetchallequip";

      let token = localStorage.getItem("token");
      let response = await axios.post(url , {email : donorEmail} , {headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }});

      if (response.data.status == true) {
        alert(JSON.stringify(response.data.obj, null, 2));

        const equipmentdata = Array.isArray(response.data.obj) ? response.data.obj : [response.data.obj];//This line checks if response.data.obj is an array or a single object
        const equipmentDataWithStatus = equipmentdata.map((obj)=>{
          return {
            ...obj ,
            id : obj.id || obj._id,
            completed : false ,
            isEditing : false 
          }
        })
        setEquipments(equipmentDataWithStatus);
      }else {
        alert(response.data.msg);
        setEquipments([]);
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

  async function deleteEquipment (id) {
    try{
    let url = server_url + "/donar/dodeleteequip";
    
    let token = localStorage.getItem("token");
    let resp = await axios.post(url , {_id : id} , {headers: { "Content-Type": "application/x-www-form-urlencoded",'authorization' : `Bearer ${token}` }})
     alert(resp.data.msg);

     if(resp.data.status){
      let updatedEquipList = equipments.filter((obj)=>{
        return obj._id !== id;
      })
      setEquipments(updatedEquipList);
     }

    }catch(err){
      alert(JSON.stringify(err));
    }
  }

  const updateEquipment = (id) => {
    setFetchBtn(!fetchBtn);
    let equipment2 = equipments.map((obj)=>
      obj.id === id ? {...obj, isEditing : true} : obj
    )

    setEquipments(equipment2);
  }

  async function saveEquipment  (editedEquipment)  {
    console.log("Edited medicine:", editedEquipment);

    try{
    let url = server_url + "/donar/doupdateequiptodo";
    let fd = new FormData();

    if (!editedEquipment.email || !editedEquipment.company) {
      alert("Missing email or company. Cannot update.");
      return;
    }

    for(let prop in editedEquipment){
      if(editedEquipment[prop]!= null && editedEquipment[prop]!= undefined){
        if(prop === "equipment" && typeof editedEquipment[prop] === "string"){
          fd.append(prop , editedEquipment[prop].toLowerCase());
        }else{
          fd.append(prop , editedEquipment[prop]);
        }
      }
    }

    let token = localStorage.getItem("token");
    let resp = await axios.post(url , fd , {headers:{'Content-Type' : 'multipart/form-data' , 'authorization' : `Bearer ${token}`}});

    alert(resp.data.msg);

    const updatedList = equipments.map((equip) =>
      equip._id === editedEquipment._id
        ? { ...editedEquipment, isEditing: false }
        : equip
    );

    setEquipments(updatedList);
    setFetchBtn(!fetchBtn);

    }catch(err){
      console.log(err.message);
    }
  }


  const toggleEquipment = () => {
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center gap-3 justify-center mb-2">
          <Pill className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Equipment Donation List</h1>
        </div>
        <p className="text-center opacity-90">Enter donor email to fetch their Equipment donations</p>
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
            onClick={fetchEquipments}
            disabled={fetchBtn}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-5 h-5" />
            {loading ? 'Fetching...' : 'Fetch Equipments'}
          </button>
        </div>
        {errors && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors}
          </div>
        )}
        </div>

        {equipments.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Equipment Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600">
                {equipments.length}
              </h3>
              <p className="text-blue-800">Total Equipments</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">
                {equipments.filter((eq) => !eq.completed).length}
              </h3>
              <p className="text-green-800">Available</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-600">
                {equipments.filter((eq) => eq.completed).length}
              </h3>
              <p className="text-gray-800">Completed</p>
            </div>
          </div>
        </div>
        )}

        <div className="space-y-4">
        {equipments.map((equip) => (
          <EqTask
            key={equip._id}
            equip={equip}
            onDelete={deleteEquipment}
            onUpdate={updateEquipment}
            onToggle={toggleEquipment}
            onSave={saveEquipment}
          />
        ))}
        

        {equipments.length === 0 && !loading && (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No Equipment found</h3>
            <p className="text-gray-400">Enter a donor's email to fetch their Equipment donations</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EquipmentList;