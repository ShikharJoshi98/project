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
import HistoryDetails from "./pages/Doctor/HistoryDetails";
import PresentComplaints from "./pages/Doctor/PresentComplaints";
import VideoAudioRecorder from "./pages/Doctor/VideoAudioRecorder";
import ConsultationCharges from "./pages/Doctor/ConsultationCharges";
import Investigation from "./pages/Doctor/Investigation";
import CaseReport from "./pages/Doctor/CaseReport";
import StaffManagment from "./pages/Doctor/StaffManagment";
import DoctorUpdate from "./pages/HR/DoctorUpdate_HR";
import BillInvoice from "./pages/Doctor/BillInvoice";
import BillInfo from "./pages/Doctor/BillInfo";
import PreviousIssuedInvoice from "./pages/Doctor/PreviousIssuedInvoice";
import AddCertificate from "./pages/Doctor/AddCertificate";
import PreviousIssuedCertificates from "./pages/Doctor/PreviousIssuedCertificates";
import Pricing from "./pages/Doctor/Pricing";
import TodayCollection from "./pages/Doctor/TodayCollection";
import BalanceList from "./pages/Doctor/BalanceList";
import DiagnoseHistory from "./pages/Doctor/DiagnoseHistory";
import CourierDetails from "./pages/Doctor/CourierDetails";
import CourierMail from "./pages/Doctor/CourierMail";
import ApproveItems from "./pages/Doctor/ApproveItems";
import ApproveMedicines from "./pages/Doctor/ApproveMedicines";
import ApplyLeave from "./pages/HR/ApplyLeave";
import CourierList from "./pages/HR/CourierList";
import Collections from "./pages/HR/Collections";
import BalanceHistory from "./pages/HR/BalanceHistory";
import EmailCourierDetails from "./pages/HR/EmailCourierDetails";



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
          <Route path="/history-details/:id" element={<ProtectedRoute allowedRoles={['doctor']}><HistoryDetails /></ProtectedRoute>} />
          <Route path="/present-complaints/:id" element={<ProtectedRoute allowedRoles={['doctor']}><PresentComplaints /></ProtectedRoute>} />
          <Route path="/record-media/:id" element={<ProtectedRoute allowedRoles={['doctor']}><VideoAudioRecorder/></ProtectedRoute>} />
          <Route path="/consultation-charges/:id" element={<ProtectedRoute allowedRoles={['doctor']}><ConsultationCharges/></ProtectedRoute>} />
          <Route path="/investigation/:id" element={<ProtectedRoute allowedRoles={['doctor']}><Investigation/></ProtectedRoute>} />
          <Route path="/report/:id" element={<ProtectedRoute allowedRoles={['doctor']}><CaseReport/></ProtectedRoute>} />
          <Route path="/staff-update" element={<ProtectedRoute allowedRoles={['doctor']}><StaffManagment/></ProtectedRoute>} />
          <Route path="/bill-invoice" element={<ProtectedRoute allowedRoles={['doctor']}><BillInvoice/></ProtectedRoute>} />
          <Route path="/bill-info" element={<ProtectedRoute allowedRoles={['doctor']}><BillInfo/></ProtectedRoute>} />
          <Route path="/previous-issued-invoice" element={<ProtectedRoute allowedRoles={['doctor']}><PreviousIssuedInvoice/></ProtectedRoute>} />
          <Route path="/add-certificate" element={<ProtectedRoute allowedRoles={['doctor']}><AddCertificate/></ProtectedRoute>} />
          <Route path="/previous-issued-certificate" element={<ProtectedRoute allowedRoles={['doctor']}><PreviousIssuedCertificates/></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute allowedRoles={['doctor']}><Pricing/></ProtectedRoute>} />
          <Route path="/collection/:location" element={<ProtectedRoute allowedRoles={['doctor']}><TodayCollection/></ProtectedRoute>} />
          <Route path="/balance-list/:location" element={<ProtectedRoute allowedRoles={['doctor']}><BalanceList/></ProtectedRoute>} />
          <Route path="/doctor-diagnose-history" element={<ProtectedRoute allowedRoles={['doctor']}><DiagnoseHistory/></ProtectedRoute>} />
          <Route path="/view-courier-details/:location" element={<ProtectedRoute allowedRoles={['doctor']}><CourierDetails/></ProtectedRoute>} />
          <Route path="/doc-courier-mail" element={<ProtectedRoute allowedRoles={['doctor']}><CourierMail/></ProtectedRoute>} />
          <Route path="/approve-items/:location" element={<ProtectedRoute allowedRoles={['doctor']}><ApproveItems/></ProtectedRoute>} />
          <Route path="/approve-medicines/:location" element={<ProtectedRoute allowedRoles={['doctor']}><ApproveMedicines/></ProtectedRoute>} />
         
          <Route path="/dashboard-HR" element={<ProtectedRoute allowedRoles={['hr']}><HRDashboard /></ProtectedRoute>} />
          <Route path="/update-doctor/:id" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorUpdate/></ProtectedRoute>} />
          <Route path="/update-receptionist/:id" element={<ProtectedRoute allowedRoles={['doctor']}><ReceptionistUpdate /></ProtectedRoute>} />
          <Route path="/items-stock" element={<ProtectedRoute allowedRoles={['hr']}><ItemStock/></ProtectedRoute>} />
          <Route path="/medicine-stock" element={<ProtectedRoute allowedRoles={['hr']}><MedicineStock/></ProtectedRoute>} />
          <Route path="/task-details-HR" element={<ProtectedRoute allowedRoles={['hr']}><TaskDetails/></ProtectedRoute>} />
          <Route path="/apply-leave-HR" element={<ProtectedRoute allowedRoles={['hr']}><ApplyLeave/></ProtectedRoute>} />
          <Route path="/all-courier/:location" element={<ProtectedRoute allowedRoles={['hr']}><CourierList/></ProtectedRoute>} />
          <Route path="/collections-HR" element={<ProtectedRoute allowedRoles={['hr']}><Collections/></ProtectedRoute>} />
          <Route path="/HR-balance" element={<ProtectedRoute allowedRoles={['hr']}><BalanceHistory/></ProtectedRoute>} />
          <Route path="/email-courier-details" element={<ProtectedRoute allowedRoles={['hr']}><EmailCourierDetails/></ProtectedRoute>} />

          <Route path="/dashboard-RECEPTIONIST" element={<ProtectedRoute allowedRoles={['receptionist']}><ReceptionistDashboard /></ProtectedRoute>} />


      </Routes>
        </Router>
    </div>
  )
}

export default App
