import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const SearchSelect = ({ options, setSelectedPatient }) => {
  const selectedRef = useRef(null);
  const [option, setOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const filteredOptionArray = options.filter((option) => option?.label.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const closeHandler = (event) => {
      if (selectedRef.current && !event.composedPath().includes(selectedRef.current)) {
        setActive(false);
      }
    }
    document.addEventListener('click', closeHandler);
    return () => {
      document.removeEventListener('click', closeHandler);
    }
  }, [selectedRef.current])

  return (
    <div ref={selectedRef} className='relative w-full'>
      <div onClick={() => setActive(prev => !prev)} className="bg-white w-full relative cursor-pointer flex items-center flex-wrap gap-1 py-2 px-3 min-h-10 rounded-lg border border-gray-400">
        <p>{option}</p>
        <ChevronDown className="ml-auto shrink-0 cursor-pointer" />
      </div>
      {active && <div className='absolute left-0 right-0 z-10 px-5 py-2 max-h-36 overflow-y-auto flex flex-col gap-2 bg-white rounded-md border border-gray-400'>
        <input placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)} className='my-1 p-2 border-1 border-gray-300 rounded-lg focus:outline-none' />
        {
          (searchTerm.length>0?filteredOptionArray:options).map((option, index) => (
            <p onClick={() => { setSelectedPatient(option?.value); setOption(option?.label);  setSearchTerm('')}} className="cursor-pointer hover:bg-gray-100 p-2 rounded-md " key={index}>{option?.label}</p>
          ))
        }
      </div>}
    </div>
  )
}

export default SearchSelect