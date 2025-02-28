import AppointmentSidebar from "../../components/Doctor/AppointmentSidebar"
import Docnavbar from "../../components/Doctor/DocNavbar"
import SignatureCanvas from 'react-signature-canvas';


const FollowUp = () => {
  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>
              FOLLOW UP
            </h1>
            <div className="flex mt-10 items-center justify-center gap-5">
              <button className="p-2 cursor-pointer bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-102 rounded-md text-sm sm:text-xl ">Scribbling Pad</button>
              <button className="p-2 cursor-pointer bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-102 rounded-md text-sm sm:text-xl ">Writing Pad</button>
            </div>
            <div className="border-1 border-stone-700 rounded-lg   mx-auto mt-10 bg-white">
            <SignatureCanvas penColor='green'
    canvasProps={{className: 'sigCanvas w-[80vw] w-full h-[40vh] md:h-[85vh]'}} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FollowUp