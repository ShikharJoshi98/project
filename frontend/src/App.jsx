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
          <Route path="/register" element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>}/>
          <Route path="/dashboard-PATIENT" element={<PatientDashboard />} />
          <Route path="/dashboard-DOCTOR" element={<DoctorDashboard />} />
          <Route path="/dashboard-HR" element={<HRDashboard />} />
          <Route path="/dashboard-RECEPTIONIST" element={<ReceptionistDashboard />} />

      </Routes>
    </Router>
    </div>
  )
}

export default App
