import React from 'react'

const History = () => {

    async function deleteImage(id) {
        try {
          await axios.delete(`${DOC_API_URL}/patient/${location.id}/followup-images/${id}`);
          setSubmit((prev) => !prev);
        } catch (error) {
          console.error("Delete request failed:", error.response?.data || error.message);
        }
      }

    return (
        <div>
          <div className='mt-10'>
              {
                followUpImages.map((image, idx) => (
                  <>
                  <h1>{image.date}</h1>
                  <div className='flex  items-center gap-2'>
                    
                    <img src={image?.follow_string} className='w-[80vw] rounded-md h-[40vh] md:h-[85vh]  bg-white' alt="" key={idx} />
                    <div title='delete' onClick={async () => deleteImage(image?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
                    </div>
                    </>
                ))

              }
            </div>
            <div className='mt-5'>
              {
                writeUp.map((data, idx) => (
                  <>
                  <h1>{data.date}</h1>
                  <div className='flex  items-center gap-2'>
                    
                      <h1 className='w-[80vw] rounded-md h-[40vh] md:h-[85vh]  bg-white' key={idx} >{data.writeUp_value }</h1>
                    <div title='delete' onClick={async () => deleteImage(image?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
                    </div>
                    </>
                ))

              }
            </div>
        </div>
    )
}

export default History