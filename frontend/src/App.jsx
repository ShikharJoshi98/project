import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import ItemStock from "./pages/HR/ItemStock";
import MedicineStock from "./pages/HR/MedicineStock";
import HRDashboard from "./pages/HR/HRDashboard";
import TaskDetails from "./pages/HR/TaskDetails";
import HomeoMedicine from "./pages/Doctor/HomeoMedicine";
import HomeoDisease from "./pages/Doctor/HomeoDisease";
import HomeoRedline from "./pages/Doctor/HomeoRedline";
import AppointmentDetails from "./pages/Doctor/AppointmentDetails";
import UploadPatientCase from "./pages/Doctor/UploadPatientCase";
import UploadDiagnosis from "./pages/Doctor/UploadDiagnosis";
import HistoryDetails from "./pages/Doctor/HistoryDetails";
import PresentComplaints from "./pages/Doctor/PresentComplaints";
import ConsultationCharges from "./pages/Doctor/ConsultationCharges";
import Investigation from "./pages/Doctor/Investigation";
import CaseReport from "./pages/Doctor/CaseReport";
import StaffManagment from "./pages/Doctor/StaffManagment";
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
import HRMedicine from "./pages/HR/HRMedicine";
import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import RegisterPatient from "./pages/Receptionist/RegisterPatient";
import PatientDetails from "./pages/Receptionist/PatientDetails";
import ItemStockRec from "./pages/Receptionist/ItemStockRec";
import MedicineStockRec from "./pages/Receptionist/MedicineStockRec";
import TaskDetailsRec from "./pages/Receptionist/TaskDetailsRec";
import ApplyLeaveRec from "./pages/Receptionist/ApplyLeaveRec";
import CourierListRec from "./pages/Receptionist/CourierListRec";
import AppointmentList from "./pages/Receptionist/AppointmentList";
import UpdateProfile from "./pages/Patient/UpdateProfile";
import PatientAppointment from "./pages/Patient/PatientAppointment";
import UploadPatientImage from "./pages/Patient/UploadPatientImage";
import AccessDenied from "./pages/AccessDenied";
import UpdateEmployee from "./pages/Doctor/UpdateEmployee";
import Scribble from "./pages/Doctor/Scribble";
import NewCaseDetails from "./pages/Doctor/NewCaseDetails";
import AppointmentList_Doc from "./pages/Doctor/AppointmentList_Doc";
import Prescription from "./pages/HR/Prescription";
import Bill from "./pages/HR/Bill";
import PayBalance from "./pages/HR/PayBalance";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/access-denied" replace />;
  }
  return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  let redirectRole = user?.role;

  if (isAuthenticated) {
    if (redirectRole === 'patient') {
      return <Navigate to='/dashboard-PATIENT' replace />
    }
    else if (redirectRole === 'doctor') {
      return <Navigate to='/dashboard-DOCTOR' replace />
    }
    else if (redirectRole === 'hr') {
      return <Navigate to='/dashboard-HR' replace />
    }
    else if (redirectRole === 'receptionist') {
      return <Navigate to='/dashboard-RECEPTIONIST' replace />
    }
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
          <Route path="/forgotPassword" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>} />
          <Route path="/access-denied" element={<AccessDenied />} />

          <Route path="/dashboard-PATIENT" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/update-profile" element={<ProtectedRoute allowedRoles={['patient']}><UpdateProfile /></ProtectedRoute>} />
          <Route path="/patient-appointment" element={<ProtectedRoute allowedRoles={['patient']}><PatientAppointment /></ProtectedRoute>} />
          <Route path="/upload-patient-image" element={<ProtectedRoute allowedRoles={['patient']}><UploadPatientImage /></ProtectedRoute>} />

          <Route path="/dashboard-DOCTOR" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/appointment-DOCTOR" element={<ProtectedRoute allowedRoles={['doctor']}><AppointmentList_Doc /></ProtectedRoute>} />
          <Route path="/appointment-details/:id" element={<ProtectedRoute allowedRoles={['doctor']}><AppointmentDetails /></ProtectedRoute>} />
          <Route path="/homeo-book-medicine" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoMedicine /></ProtectedRoute>} />
          <Route path="/homeo-book-disease" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoDisease /></ProtectedRoute>} />
          <Route path="/homeo-book-redline" element={<ProtectedRoute allowedRoles={['doctor']}><HomeoRedline /></ProtectedRoute>} />
          <Route path="/upload-case-image/:id" element={<ProtectedRoute allowedRoles={['doctor']}><UploadPatientCase /></ProtectedRoute>} />
          <Route path="/upload-diagnosis-image/:id" element={<ProtectedRoute allowedRoles={['doctor']}><UploadDiagnosis /></ProtectedRoute>} />
          <Route path="/history-details/:id" element={<ProtectedRoute allowedRoles={['doctor']}><HistoryDetails /></ProtectedRoute>} />
          <Route path="/present-complaints/:id" element={<ProtectedRoute allowedRoles={['doctor']}><PresentComplaints /></ProtectedRoute>} />
          <Route path="/consultation-charges/:id" element={<ProtectedRoute allowedRoles={['doctor']}><ConsultationCharges /></ProtectedRoute>} />
          <Route path="/investigation/:id" element={<ProtectedRoute allowedRoles={['doctor']}><Investigation /></ProtectedRoute>} />
          <Route path="/report/:id" element={<ProtectedRoute allowedRoles={['doctor']}><CaseReport /></ProtectedRoute>} />
          <Route path="/staff-update" element={<ProtectedRoute allowedRoles={['doctor']}><StaffManagment /></ProtectedRoute>} />
          <Route path="/bill-invoice" element={<ProtectedRoute allowedRoles={['doctor']}><BillInvoice /></ProtectedRoute>} />
          <Route path="/bill-info" element={<ProtectedRoute allowedRoles={['doctor']}><BillInfo /></ProtectedRoute>} />
          <Route path="/previous-issued-invoice" element={<ProtectedRoute allowedRoles={['doctor']}><PreviousIssuedInvoice /></ProtectedRoute>} />
          <Route path="/add-certificate" element={<ProtectedRoute allowedRoles={['doctor']}><AddCertificate /></ProtectedRoute>} />
          <Route path="/previous-issued-certificate" element={<ProtectedRoute allowedRoles={['doctor']}><PreviousIssuedCertificates /></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute allowedRoles={['doctor']}><Pricing /></ProtectedRoute>} />
          <Route path="/collection/:location" element={<ProtectedRoute allowedRoles={['doctor']}><TodayCollection /></ProtectedRoute>} />
          <Route path="/balance-list/:location" element={<ProtectedRoute allowedRoles={['doctor']}><BalanceList /></ProtectedRoute>} />
          <Route path="/doctor-diagnose-history" element={<ProtectedRoute allowedRoles={['doctor']}><DiagnoseHistory /></ProtectedRoute>} />
          <Route path="/view-courier-details/:location" element={<ProtectedRoute allowedRoles={['doctor']}><CourierDetails /></ProtectedRoute>} />
          <Route path="/doc-courier-mail" element={<ProtectedRoute allowedRoles={['doctor']}><CourierMail /></ProtectedRoute>} />
          <Route path="/approve-items/:location" element={<ProtectedRoute allowedRoles={['doctor']}><ApproveItems /></ProtectedRoute>} />
          <Route path="/approve-medicines/:location" element={<ProtectedRoute allowedRoles={['doctor']}><ApproveMedicines /></ProtectedRoute>} />
          <Route path="/update-employee/:id" element={<ProtectedRoute allowedRoles={['doctor']}><UpdateEmployee /></ProtectedRoute>} />
          <Route path="/scribble-pad/:scribbleType/:id" element={<ProtectedRoute allowedRoles={['doctor']}><Scribble /></ProtectedRoute>} />
          <Route path="/new-case-details/:id" element={<ProtectedRoute allowedRoles={['doctor']}><NewCaseDetails /></ProtectedRoute>} />

          <Route path="/dashboard-HR" element={<ProtectedRoute allowedRoles={['hr']}><HRDashboard /></ProtectedRoute>} />
          <Route path="/items-stock" element={<ProtectedRoute allowedRoles={['hr']}><ItemStock /></ProtectedRoute>} />
          <Route path="/medicine-stock" element={<ProtectedRoute allowedRoles={['hr']}><MedicineStock /></ProtectedRoute>} />
          <Route path="/task-details-HR" element={<ProtectedRoute allowedRoles={['hr']}><TaskDetails /></ProtectedRoute>} />
          <Route path="/apply-leave-HR" element={<ProtectedRoute allowedRoles={['hr']}><ApplyLeave /></ProtectedRoute>} />
          <Route path="/all-courier/:location" element={<ProtectedRoute allowedRoles={['hr']}><CourierList /></ProtectedRoute>} />
          <Route path="/collections-HR" element={<ProtectedRoute allowedRoles={['hr']}><Collections /></ProtectedRoute>} />
          <Route path="/HR-balance" element={<ProtectedRoute allowedRoles={['hr']}><BalanceHistory /></ProtectedRoute>} />
          <Route path="/email-courier-details" element={<ProtectedRoute allowedRoles={['hr']}><EmailCourierDetails /></ProtectedRoute>} />
          <Route path="/HR-medicine" element={<ProtectedRoute allowedRoles={['hr']}><HRMedicine /></ProtectedRoute>} />
          <Route path="/prescription-HR/:id" element={<ProtectedRoute allowedRoles={['hr']}><Prescription /></ProtectedRoute>} />
          <Route path="/medicine-payment/:id" element={<ProtectedRoute allowedRoles={['hr']}><Bill /></ProtectedRoute>} />
          <Route path="/balance-payment/:id" element={<ProtectedRoute allowedRoles={['hr']}><PayBalance /></ProtectedRoute>} />

          <Route path="/dashboard-RECEPTIONIST" element={<ProtectedRoute allowedRoles={['receptionist']}><ReceptionistDashboard /></ProtectedRoute>} />
          <Route path="/register-patient" element={<ProtectedRoute allowedRoles={['receptionist']}><RegisterPatient /></ProtectedRoute>} />
          <Route path="/patient-details" element={<ProtectedRoute allowedRoles={['receptionist']}><PatientDetails /></ProtectedRoute>} />
          <Route path="/items-stock-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><ItemStockRec /></ProtectedRoute>} />
          <Route path="/medicine-stock-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><MedicineStockRec /></ProtectedRoute>} />
          <Route path="/task-details-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><TaskDetailsRec /></ProtectedRoute>} />
          <Route path="/apply-leave-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><ApplyLeaveRec /></ProtectedRoute>} />
          <Route path="/courier-list-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><CourierListRec /></ProtectedRoute>} />
          <Route path="/appointment-details-rec" element={<ProtectedRoute allowedRoles={['receptionist']}><AppointmentList /></ProtectedRoute>} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
