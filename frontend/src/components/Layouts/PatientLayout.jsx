import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientNavbar from '../Patient/PatientNavbar'

const PatientLayout = () => {
  return (
      <div>
          <PatientNavbar />
          <Outlet/>
    </div>
  )
}

export default PatientLayout