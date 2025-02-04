import React from 'react'

const DoctorDashboard = () => {
  function handleLogout() {
    alert("logout button");
  }
  return (
    <div className='flex items-center justify-between'>
      <div>DoctorDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default DoctorDashboard