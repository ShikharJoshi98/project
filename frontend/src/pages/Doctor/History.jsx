import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { CiTrash } from 'react-icons/ci';

const History = ({ data, setSelectedData, setSubmit, onClose }) => {
  const location = useParams();

  async function deleteImage(id) {
    try {
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/followup-images/${id}`);
      const updatedFollowUps = data?.followUps.filter(item => item.id !== id);

      setSelectedData({
        ...data,
        followUps: updatedFollowUps,
      });
      setSubmit(prev => !prev);
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
  }
  async function deleteWriteUp(id) {
    try {
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/write-up-delete/${id}`);
      const updatedWriteUps = data?.writeUps.filter(item => item.id !== id);

      setSelectedData({
        ...data,
        writeUps: updatedWriteUps,
      });
      setSubmit(prev => !prev);
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
        <h1 className="text-blue-500 text-2xl mb-6 text-center font-semibold">{data?.date}</h1>
        <div className='flex flex-col gap-5'>
          {data?.followUps?.map((image, index) =>
            <div key={index} className='flex gap-2'>
              <img src={image?.followUp} className='overflow-x-auto' alt="follow up image" />
              <CiTrash size={25} onClick={() => deleteImage(image?.id)} />
            </div>
          )}
          {data?.writeUps?.map((writeUp, index) =>
            <div className='flex gap-2'>
              <div key={index} className='p-3 bg-white w-full'>{writeUp?.writeUp}</div>
              <CiTrash size={25} onClick={() => deleteWriteUp(writeUp?.id)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History