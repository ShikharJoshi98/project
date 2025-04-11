import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const PatientDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  console.log(user);
  function handleLogout() {
    logout();
    navigate('/login');
  }
  return (
    <div className='flex items-center justify-between'>
      <div>PatientDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default PatientDashboard