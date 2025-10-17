import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import axios from 'axios';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { CiImageOn, CiTrash } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';
import { updateDate } from '../../store/todayDate';
import ImagesModal from '../../components/Doctor/ImagesModal';

const UploadDiagnosis = () => {
    const location = useParams();
    const { getDiagnosisImages, diagnosisImages } = docStore();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [isSubmit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const date = updateDate();
    const [reportImageModal, setReportImageModal] = useState(false);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true);
        }, 200);
        getDiagnosisImages(location.id).finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        });
    }, [isSubmit])

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
            setUploadLoading(true);
            await axios.post(`${DOC_API_URL}/upload-diagnosis-image/${location.id}`, { image, date })
            toast.success("Image Uploaded");
            setImage(null);
        } catch (error) {
            toast.error("Failed to upload image.");
        } finally {
            setUploadLoading(false);
            setSubmit(prev => !prev);
        }
    }

    return (
        <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen w-full p-8">
            <ToastContainer toastClassName="my_toast" position='bottom-right' />
            <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-10 text-[#337ab7]'>REPORT IMAGES</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-10 gap-2">
                        <h1>Select Image</h1>
                        <Input icon={CiImageOn} type="file" name="diagnoseImage" onChange={handleInputImage} required />
                        <div className="w-full flex items-center justify-center">
                            <button className="cursor-pointer bg-blue-400 font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">{uploadLoading ? <LuLoaderCircle className='mx-auto animate-spin' /> : "Upload"}</button>
                        </div>
                    </div>
                </form>
                <div className='flex items-center gap-20 flex-wrap mt-10'>
                    {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' /> : diagnosisImages.map((image, idx) => (
                        <div key={idx} className='flex flex-col items-center gap-2'>
                            <button onClick={() => { setImageData(image); setReportImageModal(true) }} className='p-2 bg-blue-500 cursor-pointer rounded-lg text-white'>{image?.date}</button>
                        </div>
                    ))}
                </div>
            </div>
            {reportImageModal && <ImagesModal onClose={() => setReportImageModal(false)} setImageData={setImageData} imageData={imageData} setSubmit={setSubmit} heading="Report Images" />}

        </div>
    )
}

export default UploadDiagnosis