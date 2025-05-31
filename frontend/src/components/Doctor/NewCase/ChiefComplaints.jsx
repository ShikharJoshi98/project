import Scribble from "../Scribble"

const ChiefComplaints = ({complaint}) => {
    
  return (
      <div>
          <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Add {complaint}</h1>
          <Scribble complaint={complaint}/>
    </div>
  )
}

export default ChiefComplaints