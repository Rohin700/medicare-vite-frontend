/* 
    npm install jwt-decode to check the token expiry time at the times of filling the fields in a form
    npm i react-router-dom to import the useNavigate in our project
*/


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css';
import RegisterCombo from './registercombo';
import Signup from './signup';
import LoginForm from './login';
import DonorDetailsForm from './donardetails';
import MedicineDonationForm from './availMed';
import EquipmentDonationForm from './availequipments';
import MedicineList from './listedmed';
import RecipientProfileForm from './recipientdetails';
import MedicineFinder from './medfinder';

import EquipmentList from './listedEquip';
import EquipmentFinder from './equipfinder';

import { BrowserRouter } from 'react-router-dom';
import App from './app';

import MedicalNavbar from './navbarRouting/homeNav'
import HomeDashboard from './dashboard/homeDashboard';

import DonorNavbar from './navbarRouting/donarNav';

import RecipientNavbar from './navbarRouting/recipientNav';
import RecipientDashboard from './dashboard/recipientDashboard';

import ForgotPasswordForm from './changepassword';
import OTPVerification from './onetimepass';

//I haven't used the jwtoken in task files both for medicines and for the equipments



createRoot(document.getElementById('root')).render(
  // <RegisterCombo></RegisterCombo>
  
  // <Signup></Signup>
  // <LoginForm></LoginForm>

  // <DonorDetailsForm></DonorDetailsForm>
  // <RecipientProfileForm></RecipientProfileForm>

  // <MedicineDonationForm></MedicineDonationForm>
  // <EquipmentDonationForm></EquipmentDonationForm>


  // <MedicineList></MedicineList>
  // <MedicineFinder></MedicineFinder>

  // <EquipmentList></EquipmentList>
  // <EquipmentFinder></EquipmentFinder>

  // <MedicalNavbar></MedicalNavbar>
  // <HomeDashboard></HomeDashboard>

  // <DonorNavbar></DonorNavbar>
  
  // <RecipientNavbar></RecipientNavbar>
  // <RecipientDashboard></RecipientDashboard>

  // <ForgotPasswordForm></ForgotPasswordForm>
  // <OTPVerification></OTPVerification>

  <BrowserRouter>
    <App></App>
  </BrowserRouter>
)
