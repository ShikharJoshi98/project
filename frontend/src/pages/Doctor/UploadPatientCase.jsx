import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useLocation, useParams } from 'react-router-dom';
import { Delete, DeleteIcon, Image, Trash2 } from 'lucide-react';
import Input from '../../components/Input';
import { docStore } from '../../store/DocStore';

const UploadPatientCase = () => {
    const { getCaseImages,caseImages,uploadCase,deleteCaseImage } = docStore();
    const location = useParams();
    useEffect(() => {
        getCaseImages(location.id);
    }, [getCaseImages])
      const [image, setImage] = useState(null);
    
    async function handleSubmit() {
        
   

        const formData = new FormData();
        formData.append("caseImage", image);
        
        try {
          await uploadCase(formData, location.id); 
          alert("Image uploaded successfully!");
        } catch (error) {
          console.error("Upload error:", error);
          alert("Failed to upload image.");
        }
    }
  return (
      <div>
          <Docnavbar />
          <div className="flex">
          <AppointmentSidebar />
              <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
              <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
              <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>
                          CASE PAPER IMAGES
                      </h1>
                      <form onSubmit={handleSubmit}>
                      <div className="flex flex-col mt-10 gap-2">
                          
                              <h1 className='text-lg'>Select Case Paper Image</h1>
                              
                              <Input icon={Image} type="file" name="caseImage" onChange={(e) => setImage(e.target.files[0])} required />
                              <div className="w-full flex items-center justify-center">
              <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">
                Upload
              </button>
            </div>
            </div>
                      </form>
                      <div className='flex items-center gap-20 flex-wrap mt-10'>  
                          {
                              caseImages.map((image, idx) => (
                                  <div className='flex flex-col items-center gap-2'>
                                  <img src={image?.imageUrl} className='size-64' alt="" key={idx} />
                                  <div title='delete' onClick={async () => { await deleteCaseImage(location.id, image?._id); const newImages = caseImages.filter(img => img._id !== image?._id);  docStore.setState({caseImages:newImages})}} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2/></div>
                                </div>
                              ))
                          }
                      </div>
              </div>
              </div>
          </div>
    </div>
  )
}

export default UploadPatientCase