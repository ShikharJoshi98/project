import React from 'react'

const HRDashboard = () => {
  function handleLogout() {
    alert("logout button");
  }
  return (
    <div className='flex items-center justify-between'>
      <div>HRDashboard</div>
      <button onClick={handleLogout} type='submit'>Logout</button>
      </div>
  )
}

export default HRDashboard