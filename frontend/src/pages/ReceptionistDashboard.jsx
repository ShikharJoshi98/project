import React from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const ReceptionistDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  }
  return (
    <div className='flex items-center justify-between'>
      <div>ReceptionistDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default ReceptionistDashboard