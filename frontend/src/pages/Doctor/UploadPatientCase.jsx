import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { docStore } from '../../store/DocStore';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { CiImageOn, CiTrash } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import { LuLoaderCircle } from 'react-icons/lu';

const UploadPatientCase = () => {
  const { getCaseImages, caseImages, uploadCase, deleteCaseImage } = docStore();
  const location = useParams();
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 200);
    getCaseImages(location.id).finally(() => {
      clearTimeout(timeout);
      setLoading(false);
    });
  }, [isSubmit])
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caseImage", image);
    try {
      await uploadCase(formData, location.id);
      setSubmit((prev) => !prev);
      toast("Added image.");
    } catch (error) {
      console.error("Upload error:", error);
      toast("Failed to upload image.");
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full p-8">
      <ToastContainer />
      <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
        <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
        <h1 className='text-xl sm:text-4xl text-center font-semibold mt-10 text-[#337ab7]'>CASE PAPER IMAGES</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-10 gap-2">
            <h1 >Select Case Paper Image</h1>
            <Input icon={CiImageOn} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} required />
            <div className="w-full flex items-center justify-center">
              <button className="cursor-pointer bg-blue-400 font-semibold hover:text-gray-200 hover:bg-blue-600 text-white mt-7 w-52 p-2 rounded-full" type="submit">Upload</button>
            </div>
          </div>
        </form>
        <div className='flex items-center gap-20 flex-wrap mt-10'>
          {loading?<LuLoaderCircle className='animate-spin mx-auto mt-10'/>:caseImages.map((image, idx) => (
            <div className='flex flex-col items-center gap-2'>
              <img src={image?.imageUrl} className='size-64' alt="" key={idx} />
              <div title='delete' onClick={async () => { await deleteCaseImage(location.id, image?._id); setSubmit((prev) => !prev) }} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><CiTrash size={25} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UploadPatientCase