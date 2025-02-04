import React from 'react'

const ReceptionistDashboard = () => {
  function handleLogout() {
    
  }
  return (
    <div className='flex items-center justify-between'>
      <div>ReceptionistDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default ReceptionistDashboard