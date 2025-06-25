import { Image, Trash2, X } from "lucide-react"
import Input from "../Input"
import { useEffect, useState } from "react"
import { HR_API_URL, useStore } from "../../store/UpdateStore";
import axios from "axios";


const UploadBillModal = ({ onClose, orderId }) => {
  const [image, setImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const { getBillImages, billImages } = useStore();
  useEffect(() => {
    getBillImages(orderId)
  }, [getBillImages,submit]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Bill", image);
    try {
      await axios.post(`${HR_API_URL}/upload-Bill-image/${orderId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      alert('Uploaded Bill Image');
      setSubmit((prev) => !prev);

    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteBill = async (id) => {
    await axios.delete(`${HR_API_URL}/deleteBillImage/${orderId}/${id}`);
    setSubmit(prev => !prev);
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw]  flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all mb-8 duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <div className="overflow-y-auto">

          <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Upload Bill Image</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-5 gap-2">
              <h1>Upload Bill</h1>
              <Input icon={Image} type="file" onChange={(e) => setImage(e.target.files[0])} name="Bill" required />
            </div>
            <button className="cursor-pointer mx-auto block bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">
              Upload
            </button>
          </form>
          <h1 className="text-blue-500 text-xl md:text-2xl my-10 text-center font-semibold">Bill Images</h1>
          {
            billImages?.map((image, index) => (
              <div className="flex justify-between px-2">
                <img src={image?.imageUrl} alt="Bill Image" key={index} className="w-[90%] mb-5" />
                <div title='delete' onClick={()=>deleteBill(image?._id)}  className='text-white max-w-[10%] w-fit h-fit  bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UploadBillModal