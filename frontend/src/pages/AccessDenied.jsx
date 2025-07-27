import { RxCross2 } from "react-icons/rx";

const AccessDenied = () => {
  return (
    <div className='min-h-screen bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 relative overflow-hidden' >
          <div className='mx-auto flex flex-col items-center gap-5 relative z-10 mt-44 mb-2 h-auto bg-white px-5 pt-5 pb-9 md:max-w-[430px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <RxCross2 size={54} className='text-red-500 font-semibold'/>
          <h1 className='text-3xl'>Access Denied</h1>              
        </div>
    </div>
  )
}

export default AccessDenied