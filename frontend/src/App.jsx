import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import ItemStock from "./pages/HR/ItemStock";
import MedicineStock from "./pages/HR/MedicineStock";
import HRDashboard from "./pages/HR/HRDashboard";
import ReceptionistUpdate from "./pages/HR/ReceptionistUpdate";
import DoctorUpdate_HR from "./pages/HR/DoctorUpdate_HR";
import TaskDetails from "./pages/HR/TaskDetails";
import HomeoMedicine from "./pages/Doctor/HomeoMedicine";
import HomeoDisease from "./pages/Doctor/HomeoDisease";
import HomeoRedline from "./pages/Doctor/HomeoRedline";
import GeneralAppointment from "./pages/Doctor/GeneralAppointment";
import RepeatAppointment from "./pages/Doctor/RepeatAppointment";
import CourierAppointment from "./pages/Doctor/CourierAppointment";
import AppointmentDetails from "./pages/Doctor/AppointmentDetails";
import UploadPatientCase from "./pages/Doctor/UploadPatientCase";
import UploadDiagnosis from "./pages/Doctor/UploadDiagnosis";
import FollowUp from "./pages/Doctor/FollowUp";



const ProtectedRoute = ({children,allowedRoles}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  if (!allowedRoles.includes(user?.role)) {
   
    return <Navigate to="/dashboard-HR" replace />;
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated , user} = useAuthStore();
  let redirectRole = user?.role;
  
  if (isAuthenticated) {
     if(redirectRole==='patient'){
      return <Navigate to='/dashboard-PATIENT' replace/>}
     else if (redirectRole === 'doctor') {
       return <Navigate to='/dashboard-DOCTOR' replace />
     }
     else if (redirectRole === 'hr') {
       return <Navigate to='/dashboard-HR' replace />
     }
     else if (redirectRole === 'receptionist') {
      return <Navigate to='/dashboard-RECEPTIONIST' replace/>}
     }
  
  return children;
 }

function App() {
  const { isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthStore();
  useEffect(() => { checkAuth() }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  
  return (
    <div >
      
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} /> 
          <Route path="/register" element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>} />
          <Route path="/forgotPassword" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>}/>
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>}/>

          <Route path="/dashboard-PATIENT" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/dashboard-DOCTOR" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/general-appointment" element={<ProtectedRoute allowedRoles={['doctor']}><GeneralAppointment /></ProtectedRoute>} />
          <Route path="/repeat-appointment" element={<ProtectedRoute allowedRoles={['doctor']}><RepeatAppointment /></ProtectedRoute>} />
          <Route path="/courier-appointment" element={<ProtectedRoute allowedRoles={['doctor']}><CourierAppointment /></ProtectedRoute>} />
          <Route path="/appointment-details/:id" element={<ProtectedRoute allowedRoles={['doctor']}><AppointmentDetails /></ProtectedRoute>} />
          <Route path="/homeo-book-medicine" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoMedicine /></ProtectedRoute>} />
          <Route path="/homeo-book-disease" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoDisease /></ProtectedRoute>} />
          <Route path="/homeo-book-redline" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoRedline /></ProtectedRoute>} />
          <Route path="/upload-case-image/:id" element={<ProtectedRoute allowedRoles={['doctor']}><UploadPatientCase /></ProtectedRoute>} />
          <Route path="/upload-diagnosis-image/:id" element={<ProtectedRoute allowedRoles={['doctor']}><UploadDiagnosis /></ProtectedRoute>} />
          <Route path="/follow-up/:id" element={<ProtectedRoute allowedRoles={['doctor']}><FollowUp /></ProtectedRoute>} />



          <Route path="/update-doctor/:id" element={<ProtectedRoute allowedRoles={['hr']}><DoctorUpdate_HR /></ProtectedRoute>} />
          <Route path="/update-receptionist/:id" element={<ProtectedRoute allowedRoles={['hr']}><ReceptionistUpdate /></ProtectedRoute>} />
          <Route path="/items-stock" element={<ProtectedRoute allowedRoles={['hr']}><ItemStock/></ProtectedRoute>} />
          <Route path="/medicine-stock" element={<ProtectedRoute allowedRoles={['hr']}><MedicineStock/></ProtectedRoute>} />
          <Route path="/task-details-HR" element={<ProtectedRoute allowedRoles={['hr']}><TaskDetails/></ProtectedRoute>} />

          <Route path="/dashboard-HR" element={<ProtectedRoute allowedRoles={['hr']}><HRDashboard /></ProtectedRoute>} />

          <Route path="/dashboard-RECEPTIONIST" element={<ProtectedRoute allowedRoles={['receptionist']}><ReceptionistDashboard /></ProtectedRoute>} />


      </Routes>
        </Router>
    </div>
  )
}

export default App
