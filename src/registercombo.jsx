/*
    npm install @headlessui/react
    Provides unstyled but accessible components — like dropdowns, modals, and tabs.
    Fully customizable with Tailwind CSS.
*/
import React from 'react';
import { Listbox } from '@headlessui/react'

const RegisterCombo = ({ darkMode, doshowSelComp }) => {
  // const[prev , setprev] = React.useState("");

  const handleChange = (e) => {
    // setprev((prev) => ({ ...prev, role: e.target.value }));
    doshowSelComp(e.target.value);
  };

  return (
    <select
      className={`block w-full px-3 py-2 border rounded-md ${
        darkMode
          ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
          : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled hidden className='text-gray-500'>
        Select your role
      </option>
      <option value="donor">Donor</option>
      <option value="recipient">Needy Recipient</option>
    </select>
  );
};

export default RegisterCombo;