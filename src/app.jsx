import React from "react";
import { Routes ,Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Home
import MedicalNavbar from "./navbarRouting/homeNav";
import Signup from "./signup";
import LoginForm from "./login";
import HomeDashboard from "./dashboard/homeDashboard";
import ForgotPasswordForm from "./changepassword";
import OTPVerification from "./onetimepass";

//Donar
import DonorNavbar from "./navbarRouting/donarNav";
import DonorDashboard from "./dashboard/donarDashboard";
import DonorDetailsForm from "./donardetails";
import MedicineDonationForm from "./availMed";
import EquipmentDonationForm from "./availequipments";
import MedicineList from "./listedmed";
import EquipmentList from "./listedEquip";

//Recipient
import RecipientNavbar from "./navbarRouting/recipientNav";
import RecipientDashboard from "./dashboard/recipientDashboard";
import RecipientProfileForm from "./recipientdetails";
import MedicineFinder from "./medfinder";
import EquipmentFinder from "./equipfinder";


//From her i have done the routing thing

function App(){

    //This is the basic routing;
    // return(
    //     <> 
    //         <MedicalNavbar></MedicalNavbar>
    //         <Routes>
    //             <Route path="/home" element={<HomeDashboard></HomeDashboard>}></Route>
    //             <Route path="/register" element={<Signup></Signup>}></Route>
    //             <Route path="/login" element={<LoginForm></LoginForm>}></Route>
    //         </Routes>  
    //     </>
    // )

    return(
        <>
            <Routes>
                <Route path="/" element={<MedicalNavbar></MedicalNavbar>}>
                    <Route index element={<HomeDashboard></HomeDashboard>}></Route>
                    <Route path="register" element={<Signup></Signup>}></Route>
                    <Route path="login" element={<LoginForm></LoginForm>}></Route>
                    <Route path="fillotp" element={<OTPVerification></OTPVerification>}></Route>
                    <Route path="changepass" element={<ForgotPasswordForm></ForgotPasswordForm>}></Route>
                </Route>


                <Route path="/donar" element={<DonorNavbar />}>
                    <Route index element={<DonorDashboard></DonorDashboard>}></Route>
                    <Route path="donardetails" element={<DonorDetailsForm />} />
                    <Route path="meddonate" element={<MedicineDonationForm />} />
                    <Route path="equipdonate" element={<EquipmentDonationForm />} />
                    <Route path ="listmed" element={<MedicineList></MedicineList>} ></Route>
                    <Route path ="listequip" element={<EquipmentList></EquipmentList>} ></Route>
                </Route>

                <Route path="/recipient" element={<RecipientNavbar/>}>
                    <Route index element={<RecipientDashboard></RecipientDashboard>}></Route>
                    <Route path="recipientdetails" element={<RecipientProfileForm></RecipientProfileForm>}></Route>
                    <Route path = "findermed" element={<MedicineFinder></MedicineFinder>}></Route>
                    <Route path = "finderequip" element={<EquipmentFinder></EquipmentFinder>}></Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} /> if we have to navigate to some page from here then we must use Navigate instead of useNavigate
            </Routes>
        </>
    )
}

export default App;