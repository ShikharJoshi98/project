import { CiImageOn } from 'react-icons/ci'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'

const UploadPatientImage = () => {
    const { uploadCase } = docStore();
    const { user } = useAuthStore();
    const [image, setImage] = useState(null);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("caseImage", image);
            await uploadCase(formData, user?._id);
            toast("Image Uploaded");
        } catch (error) {
            alert("Failed to upload image.");
        }
    }

    return (       
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
                <ToastContainer/>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <h1 className='p-4 text-center mb-10 font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Upload Case Images</h1>
                    <form onSubmit={handleSubmit} className='max-w-[40vw] mx-auto'>
                        <Input icon={CiImageOn} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} placeholder='Upload Image' />
                        <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Upload</button>
                    </form>
                </div>
            </div>      
    )
}

export default UploadPatientImage