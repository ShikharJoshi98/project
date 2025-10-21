import { CiImageOn } from 'react-icons/ci'
import Input from '../../components/Input'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import { LuLoaderCircle } from 'react-icons/lu';
import axios from 'axios';
import { updateDate } from '../../store/todayDate';

const UploadPatientImage = () => {
    const { uploadCase } = docStore();
    const { user } = useAuthStore();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const date = updateDate();

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
            await axios.post(`${DOC_API_URL}/upload-diagnosis-image/${user?._id}`, { image, date })
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
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen p-8 w-full'>
            <ToastContainer toastClassName="my_toast" position='bottom-right' />
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 rounded-lg'>
                <h1 className='p-4 text-center mb-10 font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Report Images/Record</h1>
                <form onSubmit={handleSubmit} className='max-w-[40vw] mx-auto'>
                    <Input icon={CiImageOn} type="file" name="diagnoseImage" onChange={handleInputImage} required />

                    <button disabled={loading} className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 text-white mt-7 w-52 p-2 rounded-full' type='submit' >{loading ? <LuLoaderCircle className='mx-auto animate-spin' /> : "Upload"}</button>
                    {
                        image && <img src={image} className='h-90 w-90 mx-auto object-contain' />
                    }
                </form>
            </div>
        </div>
    )
}

export default UploadPatientImage