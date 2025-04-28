import { ClipboardPlus } from 'lucide-react'
import React from 'react'
import Scribble from '../Scribble'

const BriefMindSymptom = ({ complaint }) => {
  return (
    <div>
      <h1 className='sm:text-xl bg-blue-500 flex items-center justify-center gap-5 text-white text-lg font-semibold  py-2'>Frequently Asked Questions <ClipboardPlus className='cursor-pointer' /></h1>
      {/* faqs */}
      <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Add {complaint }</h1>
      <Scribble/>
    </div>
  )
}

export default BriefMindSymptom