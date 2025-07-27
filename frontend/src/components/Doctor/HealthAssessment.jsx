import { useEffect, useState } from 'react'
import Input from '../Input'
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import { FaHeartbeat, FaTrash } from 'react-icons/fa';
import { FaWeightScale } from 'react-icons/fa6';
import { recStore } from '../../store/RecStore';

const HealthAssessment = () => {
  const { patient, getPatient } = recStore();
  const location = useParams();
  const [isSubmit, setSubmit] = useState(false);
  const [bp, setbp] = useState("");
  const [weight, setweight] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateDate = () => {
      const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
      setCurrentDate(date);
    };

    updateDate();
  }, []);
  useEffect(() => {
    getPatient(location.id);
  }, [isSubmit,getPatient,location.id]);
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post(`${DOC_API_URL}/add-health-records/${location.id}`, { weight, bloodPressure: bp, date: currentDate });
    setSubmit((prev) => !prev);
    setbp(""); setweight("")
  }
  async function deleteRow(rowid) {
    await axios.delete(`${DOC_API_URL}/patient/${location.id}/health-record/${rowid}`);
    setSubmit((prev) => !prev);
  }
  // console.log(patient)
  return (
    <div>
      <h1 className='text-xl sm:text-4xl text-center font-semibold my-10 text-[#337ab7]'>
        HEALTH ASSESSMENT
      </h1>
      <div className="bg-white p-5 mb-10 shadow-lg mx-auto rounded-lg max-w-[434px]">
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <h1 className="text-stone-700 mb-2">Blood Pressure (mmHg):</h1>
            <Input
              icon={FaHeartbeat}
              type="text"
              placeholder="Mention Here"
              value={bp}
              onChange={(e) => setbp(e.target.value)} />
          </div>
          <div className='mb-3'>
            <h1 className="text-stone-700 mb-2  ">Weight (Kg):</h1>
            <Input
              icon={FaWeightScale}
              type="text"
              placeholder="Mention Here"
              value={weight}
              onChange={(e) => setweight(e.target.value)} />
          </div>
          <div className='flex justify-center mt-5'>
            <button className='bg-blue-500 cursor-pointer font-semibold text-white hover:bg-blue-600 p-2 rounded-lg '>Submit</button>
          </div>
        </form>
      </div>
      <div className='p-2 overflow-x-auto w-full mt-5'>
        <table className="border-collapse  w-full border-2 border-gray-500 ">
          <thead>
            <tr className="bg-blue-500 text-lg text-white">
              <th className="border border-gray-500 p-2">SNo.</th>
              <th className="border border-gray-500 p-2">Assesment Date</th>
              <th className="border border-gray-500 p-2">Blood Pressure</th>
              <th className="border border-gray-500 p-2">Weight</th>
              <th className="border border-gray-500 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {patient?.healthRecords.map((healthRecord, recordIdx) => (
              <tr key={recordIdx} className="bg-blue-200 text-lg">
                <td className="border border-gray-300 px-4 py-2 text-center">{recordIdx+1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{healthRecord?.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {healthRecord?.bloodPressure} mmHg                  </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {healthRecord?.weight} Kg
                </td>
                <td onClick={() => deleteRow(healthRecord?._id)} className="border cursor-pointer border-gray-300 px-4 text-red-600 py-2 text-center"><FaTrash /></td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HealthAssessment