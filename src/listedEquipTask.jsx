import React, { useState } from 'react';
import { Trash2, Pencil, CheckCircle, Save } from 'lucide-react';

const EqTask = ({ equip, onToggle, onDelete, onUpdate, onSave }) => {
  const [editedEquipment, setEditedEquipment] = useState({ ...equip });

  if (equip.isEditing) {
    // Render editing mode

    return (
      <div className="bg-yellow-50 p-4 rounded-lg shadow-md border-l-4 border-yellow-400">
        <div className="space-y-2">
          <input
            value={editedEquipment.equipment}
            onChange={(e) => setEditedEquipment({ ...editedEquipment, equipment: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Equipment Name"
          />
          <input
            value={editedEquipment.qty}
            onChange={(e) => setEditedEquipment({ ...editedEquipment, qty: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Quantity"
          />
          <input
            value={editedEquipment.packingtype}
            onChange={(e) => setEditedEquipment({ ...editedEquipment, packingtype: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Packing Type"
          />
          <input
            value={editedEquipment.purchasedtime}
            onChange={(e) => setEditedEquipment({ ...editedEquipment, purchasedtime: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Purchased Date"
          />
          <button
            onClick={() => onSave(editedEquipment)}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    );
  }

  // ✅ FIX 2: Rename `equipment` to `equip` in className condition and typo fix in `eu.completed`
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 ${
        equip.completed ? 'border-gray-400 opacity-70' : 'border-green-500'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(equip.id || equip._id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              equip.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {equip.completed && <CheckCircle className="w-4 h-4" />}
          </button>

          <div>
            <h3
              className={`text-lg font-semibold ${
                equip.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {equip.equipment || 'Unnamed Equipment'}
            </h3>
            <p className="text-sm text-gray-600">Qty: {equip.qty || 'N/A'}</p>
            <p className="text-sm text-gray-600">Packing: {equip.packingtype || 'N/A'}</p>
            <p className="text-sm text-gray-600">Purchased: {equip.purchasedtime || 'N/A'}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(equip.id || equip._id)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(equip.id || equip._id)}
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

export default EqTask;
