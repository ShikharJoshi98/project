import { ClipboardPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Scribble from '../Scribble'
import FAQModal from './FAQModal';
import { docStore } from '../../../store/DocStore';
import { CiMedicalClipboard } from 'react-icons/ci';

const BriefMindSymptom = ({ complaint }) => {
  const [isFaqModalOpen, setFaqModalIsOpen] = useState(false);
  const { getCaseData, list } = docStore();
  useEffect(() => { getCaseData(complaint); },
    [getCaseData]);

  return (
    <div>
      <h1 className='sm:text-xl bg-blue-500 flex items-center justify-center gap-5 text-white text-lg font-semibold  py-2'>Frequently Asked Questions <CiMedicalClipboard onClick={() => setFaqModalIsOpen(true)} className='cursor-pointer' /></h1>
      <div className='flex flex-col items-center gap-1 py-2 bg-blue-300'>
        {
          list.map((data, index) => (
            <p key={index} className='text-lg'>{ index+1}. {data?.name}</p>
          ))
          }
       </div>
      <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Add {complaint}</h1>
      <Scribble complaint={complaint} />
      {isFaqModalOpen && <FAQModal onClose={() => setFaqModalIsOpen(false)} complaint={complaint} />}
    </div>
  )
}

export default BriefMindSymptom