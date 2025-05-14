import Scribble from "../Scribble"

const ChiefComplaints = ({complaint}) => {
    
  return (
      <div>
          <div className="overflow-x-auto mt-10 rounded-lg">
                <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                    <thead className="bg-[#337ab7]  text-white">
                        <tr >
                            <th className="px-1 py-4 ">Date</th>
                            <th className="px-2 py-4 ">Complain</th>
                            <th className="px-4 py-4 ">Duration</th>
                            <th className="px-2 py-4 ">Remarks</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
          </div>
          <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Add {complaint}</h1>
          <Scribble complaint={complaint}/>
    </div>
  )
}

export default ChiefComplaints