import React from 'react'
import MultiSelectDropdown from './MultiSelectInput'
import Input from '../Input';
import { Calendar, Clock, Pill, Tablets, TestTube } from 'lucide-react';

const PrescribeMedicine = () => {

    const options = ["Boils", "Diarrhea", "Appendix", "Fever", "Cough", "Flu", "Cold"];
    const handleSubmit = () => {
        
    }

  return (
      <div>
          <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
              PRESCRIBE MEDICINE
          </h1>
          <form onSubmit={handleSubmit}>
          <div className='sm:grid flex flex-col pl-10 gap-y-5 gap-x-2 grid-cols-2'>
              <div>
              <h1 className='text-black font-semibold mb-2'>Diagnosis:</h1>
              <MultiSelectDropdown options={options}/>
              </div>
              <div>
              <h1 className='text-black font-semibold mb-2'>Medicine:</h1>
                <Input icon={Pill} placeholder='Enter Medicine Name' />
              </div>
              <div>
              <h1 className='text-black font-semibold mb-2'>Potency:</h1>
              <div className='relative mt-2   w-full '>
              
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <TestTube className="size-4 text-blue-500"/>
          </div>
              <select                
                name="potency" required id="potency" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="Select Potency">Select Potency</option>
              <option value="3X">3X</option>
              <option value="6X">6X</option>
              </select>
                  </div>
              </div>
              <div>
              <h1 className='text-black font-semibold mb-2'>Start Date:</h1>
              <div className='relative mt-2   w-full '>
              
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Calendar className="size-4 text-blue-500"/>
          </div>
              <select                
                name="potency" required id="potency" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="today">Today</option>
              <option value="2nd day">2nd Day</option>
              <option value="3rd day">3rd Day</option>
              </select>
                  </div>
              </div>
              <div>
              <h1 className='text-black font-semibold mb-2'>Dose:</h1>
              <div className='relative mt-2   w-full '>
              
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Tablets className="size-4 text-blue-500"/>
          </div>
              <select                
                name="dose" required id="dose" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="today">Single Dose</option>
              <option value="3 Dose">3 dose Half-Hour Interval</option>
              <option value="2 Dose">2 dose Half-Hour Interval</option>
              </select>
                  </div>
              </div>
              <div>
              <h1 className='text-black font-semibold mb-2'>Duration:</h1>
              <div className='relative mt-2   w-full '>
              
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Clock className="size-4 text-blue-500"/>
          </div>
              <select                
                name="duration" required id="duration" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="select duration">Select Duration</option>
              <option value="7">7 Days</option>
              <option value="15">15 Days</option>
              </select>
                  </div>
              </div>
              <div className='col-span-2'>
                  <h1 className='text-black font-semibold mb-2'>Note:</h1>
                  <textarea placeholder='Mention if any' className='py-2 pl-3 min-h-20 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'></textarea>
              </div>
              </div>
              <div className='flex justify-center mt-5 '>
                  <button className='bg-blue-500 cursor-pointer text-lg hover:bg-blue-600 rounded-md text-white p-2'>Submit</button>
                  </div>
          </form>
    </div>
  )
}

export default PrescribeMedicine