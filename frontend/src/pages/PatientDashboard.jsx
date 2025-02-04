import React from 'react'

const PatientDashboard = () => {
  function handleLogout() {
    alert("logout button");
  }
  return (
    <div className='flex items-center justify-between'>
      <div>PatientDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default PatientDashboard