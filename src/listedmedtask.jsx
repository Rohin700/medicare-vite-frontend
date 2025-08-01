import React, { useState } from 'react';
import { Trash2, Pencil, CheckCircle, Save } from 'lucide-react';

const Task = ({ medicine, onToggle, onDelete, onUpdate, onSave }) => {
const [editedMedicine, setEditedMedicine] = useState({ ...medicine });


  if (medicine.isEditing) {
    // Render editing mode
    return (
      <div className="bg-yellow-50 p-4 rounded-lg shadow-md border-l-4 border-yellow-400">
        <div className="space-y-2">
          <input
            value={editedMedicine.medname}
            onChange={(e) => setEditedMedicine({ ...editedMedicine, medname: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Medicine Name"
          />
          <input
            value={editedMedicine.qty}
            onChange={(e) => setEditedMedicine({ ...editedMedicine, qty: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Quantity"
          />
          <input
            value={editedMedicine.packingtype}
            onChange={(e) => setEditedMedicine({ ...editedMedicine, packingtype: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Packing Type"
          />
          <input 
          value={editedMedicine.expdate}
          onChange={(e)=> setEditedMedicine({...editedMedicine , expdate : e.target.value})} 
          className='w-full border border-gray-300 p-2 rounded'
          placeholder='Expiry Date'
          />
          <button
            onClick={() => onSave(editedMedicine)}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    );
  }

  // Normal (non-edit) view
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 ${
      medicine.completed ? 'border-gray-400 opacity-70' : 'border-green-500'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(medicine.id || medicine._id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              medicine.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {medicine.completed && <CheckCircle className="w-4 h-4" />}
          </button>

          <div>
            <h3 className={`text-lg font-semibold ${
              medicine.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {medicine.medname || 'Unnamed Medicine'}
            </h3>
            <p className="text-sm text-gray-600">Qty: {medicine.qty || 'N/A'}</p>
            <p className="text-sm text-gray-600">Packing: {medicine.packingtype || 'N/A'}</p>
            <p className="text-sm text-gray-600">Packing: {medicine.expdate || 'N/A'}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(medicine.id || medicine._id)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(medicine.id || medicine._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
