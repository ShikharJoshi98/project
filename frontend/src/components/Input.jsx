import React from 'react'

const Input = ({icon:Icon,...props}) => {
  return (
      <div className='relative   w-full '>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Icon className="size-4 text-blue-500"/>
          </div>
          <input {...props}
              className=' w-full bg-white h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'
          />
    </div>
  )
}

export default Input