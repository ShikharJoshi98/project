import ReactDOM from "react-dom";
import { useEffect, useState } from 'react';
import { recStore } from '../../store/RecStore';
import Input from '../Input';
import { docStore } from '../../store/DocStore';
import SearchSelect from '../SearchSelect';
import { useAuthStore } from '../../store/authStore';
import { RxCross2 } from 'react-icons/rx';
import { CiImageOn } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';

const UploadCase = ({ onClose }) => {
  const { patients, getPatientDetails } = recStore();
  const { user } = useAuthStore();
  const { uploadCase } = docStore();
  const [image, setImage] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    getPatientDetails(user?.role,user?.branch);
  }, [getPatientDetails]);  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("caseImage", image);
      await uploadCase(formData, selectedPatient);
      toast('Case Image Uploaded');
    } catch (error) {
      toast("Failed to upload image.");
    }
  }

  return ReactDOM.createPortal(
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-hidden flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white text-black hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
        <div className="bg-[#e9ecef] w-full sm:w-auto sm:mx-10 rounded-lg">
          <h1 className="text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl">Upload New Case Paper Images</h1>
          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-12 bg-white/80 h-auto p-8 md:max-w-[500px] w-full sm:max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <div className="flex flex-col gap-2">
              <h1>Patient Case Paper Number</h1>
              <div className="relative w-full">
                  <SearchSelect options={patients} setSelectedPatient={setSelectedPatient} />
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-2">
              <h1>Select Case Paper Image</h1>
              <Input icon={CiImageOn} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} required />
            </div>
            <div className="w-full flex items-center justify-center">
              <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default UploadCase;
