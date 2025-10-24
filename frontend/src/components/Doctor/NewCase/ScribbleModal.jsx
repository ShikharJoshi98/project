import { useEffect } from 'react'
import ReactDOM from "react-dom";
import Scribble from '../Scribble'
import { docStore } from '../../../store/DocStore'
import { useParams } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx';

const ScribbleModal = ({ onClose, complaint }) => {
  const { getMentalCausative, MentalCausativeData, MentalPersonalityData, getMentalPersonality } = docStore();
  const { id } = useParams();
  switch (complaint) {
    case 'Mental Causative Factor':
      useEffect(() => { getMentalCausative(id) }, [getMentalCausative]);
      break;
    case 'Mental Personality Character':
      useEffect(() => { getMentalPersonality(id) }, [getMentalPersonality]);
      break;
  }
  return ReactDOM.createPortal(
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[100vh] max-w-[99vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1">
          <RxCross2 size={24} />
        </button>
        <h1 className='sm:text-xl bg-blue-400 text-white text-lg font-semibold mt-10 text-center py-2'>{complaint}</h1>
        <div className='flex flex-col my-2 items-center gap-3'>
          {complaint === 'Mental Causative Factor' && MentalCausativeData[0]?.diseases.map((data, index) => (
            <h1 key={index}>{index + 1}. {data}</h1>))
          }
          {complaint === 'Mental Personality Character' && MentalPersonalityData[0]?.diseases.map((data, index) => (
            <h1 key={index}>{index + 1}. {data}</h1>))
          }
        </div>
        <Scribble complaint={complaint} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ScribbleModal