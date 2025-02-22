import { Image, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { recStore } from '../../store/RecStore';
import Input from '../Input';
import Select from "react-select";
import { docStore } from '../../store/DocStore';

const UploadCase = ({ onClose }) => {
  const { patients, getPatientDetails } = recStore();
  const { uploadCase } = docStore();
  useEffect(() => {
    getPatientDetails();
  }, [getPatientDetails]);

  // Map patients for dropdown
  const patientArray = patients.map((patient) => ({
    value: patient._id,
    label: `${patient.fullname} / ${patient.casePaperNo} / ${patient.phone} (M)`,
  }));

  const [image, setImage] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient object

  async function handleSubmit(e) {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append("caseImage", image);
    
    try {
      await uploadCase(formData, selectedPatient.value); 
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    }
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <div className="bg-[#e9ecef] w-full sm:w-auto sm:mx-10 rounded-lg">
          <h1 className="text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl">
            Upload New Case Paper Images
          </h1>
          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-12 bg-white/80 h-auto p-8 md:max-w-[500px] w-full sm:max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
            
            {/* Patient Selection */}
            <div className="flex flex-col gap-2">
              <h1>Patient Case Paper Number</h1>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-4 text-blue-500" />
                </div>
                <Select
                  options={patientArray}
                  placeholder="Search"
                  value={selectedPatient}
                  onChange={setSelectedPatient}
                  className="font-normal rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 transition duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mt-5 gap-2">
              <h1>Select Case Paper Image</h1>
              <Input icon={Image} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} required />
            </div>

            {/* Submit Button */}
            <div className="w-full flex items-center justify-center">
              <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">
                Upload
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCase;
