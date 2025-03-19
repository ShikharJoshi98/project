import React from 'react'

const SearchMedicine = ({pres,patientName}) => {

  return (
    <div className='shadow-sm bg-white text-gray-700 border text-[15px] font-semibold rounded-md border-gray-400 p-2 flex items-center justify-evenly'>
      <h1>Patient: <span className='font-normal'>{patientName}</span></h1>
      <h1>Date: <span className='font-normal'>{ pres.prescription_date}</span></h1>
        <h1>Medicine: <span className='font-normal'>{pres.medicine}</span></h1>
        <h1>Potency: <span className='font-normal'>{pres.potency}</span></h1>
    </div>
  )
}

export default SearchMedicine