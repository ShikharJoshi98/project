import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import axios from 'axios';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { CiImageOn, CiTrash } from 'react-icons/ci';

const UploadDiagnosis = () => {
    const location = useParams();
    const { getDiagnosisImages, diagnosisImages } = docStore();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [isSubmit, setSubmit] = useState(false);

    useEffect(() => {
        getDiagnosisImages(location.id);
    }, [isSubmit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("diagnosisImage", image);
        try {
            await axios.post(`${DOC_API_URL}/upload-diagnosis-image/${location.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setSubmit((prev) => !prev);
            toast('Added Image');
        } catch (error) {
            console.error(error.message);
            toast("Failed to upload image.");
        }
    }

    const deleteImage = async (id)=> {
        try {
            let response = await axios.delete(`${DOC_API_URL}/patient/${location.id}/diagnosis-images/${id}`);
            setSubmit((prev) => !prev);
        } catch (error) {
            console.error("Delete request failed:", error.response?.data || error.message);
        }
    }

    return (
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
            <ToastContainer/>
            <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>DIAGNOSIS IMAGES</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-10 gap-2">
                        <h1 className='text-lg'>Select Image</h1>
                        <Input icon={CiImageOn} type="file" name="diagnoseImage" onChange={(e) => setImage(e.target.files[0])} required />
                        <div className="w-full flex items-center justify-center">
                            <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">Upload</button>
                        </div>
                    </div>
                </form>
                <div className='flex items-center gap-20 flex-wrap mt-10'>
                    {
                        diagnosisImages.map((image, idx) => (
                            <div className='flex flex-col items-center gap-2'>
                                <img src={image?.imageUrl} className='size-64' alt="" key={idx} />
                                <div title='delete' onClick={async () => deleteImage(image?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><CiTrash size={25} /></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default UploadDiagnosis