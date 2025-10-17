import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { recStore } from '../../store/RecStore';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import SearchSelect from '../../components/SearchSelect';
import Input from '../../components/Input';
import { CiImageOn } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { updateDate } from '../../store/todayDate';

const UploadReportModal = ({ onClose }) => {
    const { allBranchPatients, getAllPatients } = recStore();
    const { branch } = useParams();
    const { user } = useAuthStore();
    const [image, setImage] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [patientLoading, setPatientLoading] = useState(false);
    const date = updateDate();

    useEffect(() => {
        const timeout = setTimeout(() => setPatientLoading(true), 200);
        if (user?.role === 'doctor') {
            getAllPatients(branch).finally(() => {
                clearTimeout(timeout);
                setPatientLoading(false);
            });
        }
        else {
            getAllPatients(user?.branch).finally(() => {
                clearTimeout(timeout);
                setPatientLoading(false);
            });
        }
    }, [getAllPatients]);

    async function handleInputImage(e) {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(
                    reader.result
                );
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image first");
            return;
        }
        try {
            setLoading(true);
            await axios.post(`${DOC_API_URL}/upload-diagnosis-image/${selectedPatient}`, { image, date })
            toast.success("Image Uploaded");
            setImage(null);
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to upload image.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <ToastContainer toastClassName="my_toast" position='bottom-right' />
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white text-black hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <div className="bg-[#e9ecef] w-full sm:w-auto sm:mx-10 rounded-lg">
                    <h1 className="text-center font-semibold text-[#337ab7] text-xl sm:text-4xl">Upload Patient Report Images</h1>
                    <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-12 bg-white/80 h-auto p-8 md:max-w-[500px] w-full sm:max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
                        <div className="flex flex-col gap-2">
                            <h1>Patient Case Paper Number</h1>
                            <div className="relative w-full">
                                <SearchSelect options={allBranchPatients} loading={patientLoading} setSelectedPatient={setSelectedPatient} />
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 gap-2">
                            <h1>Select Case Paper Image</h1>
                            <Input icon={CiImageOn} type="file" name="diagnoseImage" onChange={handleInputImage} required />
                            {
                                image && <img src={image} className='h-40 w-40 object-cover' />
                            }
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">{loading ? <LuLoaderCircle className='mx-auto animate-spin' /> : "Upload"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadReportModal