import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HRDashboard from "./pages/HRDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated , user} = useAuthStore();
  console.log(isAuthenticated, user?.role);
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
  console.log(isAuthenticated);
  console.log(user?.role);
  
  return (
    <div >
      
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} /> 
          <Route path="/register" element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>} />
          <Route path="/forgotPassword" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>}/>
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>}/>

          <Route path="/dashboard-PATIENT" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
          <Route path="/dashboard-DOCTOR" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/dashboard-HR" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
          <Route path="/dashboard-RECEPTIONIST" element={<ProtectedRoute><ReceptionistDashboard /></ProtectedRoute>} />


      </Routes>
    </Router>
    </div>
  )
}

export default App
