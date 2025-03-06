import React from 'react'

const TodayPrescriptions = () => {
    return (
        <div>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                TODAY'S PRESCRIPTION
            </h1>
            
            <div className="overflow-x-auto p-4 mt-3">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className=" bg-blue-500 text-white ">
                            <th className="py-2 px-4 border">Diagnosis</th>
                            <th className="py-2 px-4 border">Medicine</th>
                            <th className="py-2 px-4 border">Potency</th>
                            <th className="py-2 px-4 border">Start Date</th>
                            <th className="py-2 px-4 border">Dose</th>
                            <th className="py-2 px-4 border">Note</th>
                            <th className="py-2 px-4 border">Today's Date</th>
                            <th className="py-2 px-4 border">Duration</th>
                            <th className="py-2 px-4 border">Next Visit</th>
                            <th className="py-2 px-4 border">Update</th>
                            <th className="py-2 px-4 border">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TodayPrescriptions