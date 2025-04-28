import { X } from 'lucide-react'
import React from 'react'
import Scribble from '../Scribble'

const ScribbleModal = ({onClose,scribbleType}) => {
  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[100vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1">
          <X size={24} />
        </button>
        <h1 className='sm:text-xl bg-blue-400 text-white text-lg font-semibold mt-10 text-center py-2'>{scribbleType}</h1>
        {/* list of factors */}
        <Scribble/>
      </div>

    </div>
  )
}

export default ScribbleModal