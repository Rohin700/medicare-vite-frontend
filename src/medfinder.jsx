import React, { useState, useEffect } from 'react';
import { Search, MapPin, Pill, User, Phone, Mail, X, Calendar, MapPin as Location } from 'lucide-react';
import axios from 'axios';
import { isTokenExpired } from './utility/tokenExpiry';
import {server_url} from './config/url';

const MedicineFinder = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donarDetails, setDonarDetails] = useState(null);
  const [selectedDonor , setSelectedDonor] = useState(null);

  const[isExpired , setTokenExpiry] = useState(false);
  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)){
      setTokenExpiry(true);
      localStorage.removeItem("token");
    }
  })

  useEffect(() => {//as many times as we will render this useeffect calls will be made that much time
    const fetchCities = async () => {
      setCitiesLoading(true);
      try {
        let url = server_url + "/recipient/dofetchdonardetails";
        let response = await axios.post(url);//I brought the entire donar details collection
        // alert(JSON.stringify(response.data));

        setDonarDetails(response.data);

        let cities = response.data.map((obj) => obj.currcity);
        let distinctCities = [...new Set(cities)];

        setCities(distinctCities);
        
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally{
        setCitiesLoading(false);
      }
    };
    fetchCities();
    }, []);

  const handleFetch = async () => {
    if (!selectedCity || !medicineName.trim()) {
      alert('Please select a city and enter a medicine name');
      return;
    }

    setLoading(true);
    
    try {
      let url = server_url + "/recipient/dofetchmed";
      let fd = new FormData();

      fd.append("city" , selectedCity)
      fd.append("medname" , medicineName.toLowerCase());

    let token = localStorage.getItem("token");
    let resp = await axios.post(url ,fd , {headers : {"Content-Type" : "multipart/form-data" , 'authorization' : `Bearer ${token}`}})
    alert(JSON.stringify(resp.data));
    
    setSearchResults(resp.data);
      
    } catch (error) {
      console.error('Error fetching medicine data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  function donarDetailsAndOpenModel(email){
    for (let i = 0; i < donarDetails.length; i++) {
     if (donarDetails[i].email === email) {
        setSelectedDonor(donarDetails[i]);
        alert(JSON.stringify(donarDetails[i]));
        setIsModalOpen(true);
        return; 
     }
    }
    alert("Donor details not found.");
  }


 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Pill className="text-blue-600" />
          Medicine Finder
        </h2>
        <p className="text-gray-600">Find medicines and their availability in your city</p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {/* City Combo Box */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Select City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={citiesLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            <option value="">
              {citiesLoading ? 'Loading cities...' : 'Choose a city...'}
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Medicine Name Text Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Pill className="inline w-4 h-4 mr-1" />
            Medicine Name
          </label>
          <input
            type="text"
            value={medicineName}
            disabled={isExpired}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="Enter medicine name (e.g., aspirin, ibuprofen)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fetch Button */}
        <div className="flex items-end">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Fetch Medicine
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-6">
        {searchResults && searchResults.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{medicineName}" in {selectedCity}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-wrap items-center gap-2">
                      <Pill className="text-blue-600 w-5 h-5 mb-4"/>
                      <h2 className="text-lg font-semibold text-gray-600 capitalize">
                        <u>{result.medname}</u>
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-600 capitalize">
                        Company : {result.company}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-600 capitalize">
                        Packing : {result.packingtype}
                      </h4>
                      <h4 className="text-lg font-semibold text-gray-600 capitalize">
                        Quantity : {result.qty}
                      </h4>
                      <h4 className="text-lg font-semibold text-gray-600 capitalize">
                        Expiry Date : {result.expdate?.substring(0,10)}
                      </h4>
                    </div>
                  </div>
                  
                  
                  <button
                    onClick={()=>donarDetailsAndOpenModel(result.email)}
                    disabled={isExpired}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Donor Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          searchResults && searchResults.length === 0 && selectedCity && medicineName && !loading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">No results found for "{medicineName}" in {selectedCity}.</p>
            </div>
          )
        )}
      </div>

      {/* Donor Details Modal */}
      {isModalOpen && selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Donor Contact Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Donor Name */}
              {selectedDonor.name && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800">{selectedDonor.name}</p>
                  </div>
                </div>
              )}
              
              {/* Phone */}
              {selectedDonor.contact && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-800">{selectedDonor.contact}</p>
                  </div>
                </div>
              )}
              
              {/* Email */}
              {selectedDonor.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800">{selectedDonor.email}</p>
                  </div>
                </div>
              )}
              
              {/* Address */}
              {selectedDonor.curraddress && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">Address:</span>
                    <p className="text-gray-800">{selectedDonor.curraddress}</p>
                  </div>
                </div>
              )}

              {selectedDonor.currcity && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-600">City:</span>
                    <p className="text-gray-800">{selectedDonor.currcity}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineFinder;