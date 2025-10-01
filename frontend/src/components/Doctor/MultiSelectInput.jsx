import { useEffect, useRef, useState } from 'react'
import { ChevronDown, X } from 'lucide-react';

const MultiSelectInput = ({ Options, selectedOptions, setSelectedOptions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [active, setActive] = useState(false);
  const selectedRef = useRef(null);
  const filteredOptionArray = Options?.filter((options) => options.toLowerCase().includes(searchTerm.toLowerCase()));
  const setOptions = (value) => {
    if (selectedOptions?.includes(value)) {
      const selectedOptionsArray = selectedOptions?.filter((options) => options != value);
      setSelectedOptions([...selectedOptionsArray]);
    }
    else {
      setSelectedOptions([...selectedOptions, value]);
    }
  }

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
    <div className='relative w-full' ref={selectedRef}>
      <div onClick={() => setActive(true)} className="bg-white w-full relative cursor-pointer flex items-center flex-wrap gap-1 py-2 px-3 min-h-10 rounded-lg border border-gray-400"
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedOptions?.map((options, index) => (
            <div
              key={index}
              className="bg-red-200 px-4 py-0.5 flex border-2 border-red-300 items-center justify-center rounded-2xl"
            >
              <p className="flex items-center justify-center gap-3">
                {options}
                <X
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptions(options);
                  }}
                  className="w-4 cursor-pointer"
                />
              </p>
            </div>
          ))}
        </div>

        <ChevronDown onClick={(e) => {
          e.stopPropagation();
          setActive(prev => !prev);
        }} className="ml-auto shrink-0 cursor-pointer" />
      </div>

      {active && <div className='absolute left-0 right-0 z-10 px-5 py-2 max-h-36 overflow-y-auto flex flex-col gap-2 bg-white rounded-md border border-gray-400'>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' className='my-1 p-2 border-1 border-gray-300 rounded-lg focus:outline-none' />
        {filteredOptionArray.length > 0 ? filteredOptionArray?.map((option, index) => (
          <div className='flex items-center gap-4' key={index}>
            <input checked={selectedOptions?.includes(option)}
              onChange={() => setOptions(option)} type="checkbox" id={option} /><label htmlFor={option}>{option}</label>
          </div>
        )) : <p>Disease Not Found !</p>
        }
      </div>}
    </div>
  )
}

export default MultiSelectInput
