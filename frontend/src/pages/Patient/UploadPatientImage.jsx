import { CiImageOn } from 'react-icons/ci'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import { LuLoaderCircle } from 'react-icons/lu';

const UploadPatientImage = () => {
    const { uploadCase } = docStore();
    const { user } = useAuthStore();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
        toast.error("Please select an image first");
        return;
    }

    try {
        setLoading(true);
        const formData = new FormData();
        formData.append("caseImage", image);

        await uploadCase(formData, user?._id);
        toast.success("Image Uploaded");
        setImage(null);
    } catch (error) {
        toast.error("Failed to upload image.");
    } finally {
        setLoading(false); 
    }
}


    return (       
            <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen p-8 w-full'>
                <ToastContainer/>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 rounded-lg'>
                    <h1 className='p-4 text-center mb-10 font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Upload Case Images</h1>
                    <form onSubmit={handleSubmit} className='max-w-[40vw] mx-auto'>
                        <Input icon={CiImageOn} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} placeholder='Upload Image' />
                        <button disabled={loading} className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 text-white mt-7 w-52 p-2 rounded-full' type='submit' >{loading?<LuLoaderCircle className='mx-auto animate-spin'/>:"Upload"}</button>
                    </form>
                </div>
            </div>      
    )
}

export default UploadPatientImage