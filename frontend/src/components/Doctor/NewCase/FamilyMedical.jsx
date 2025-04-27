import { PlusCircle, User, Users } from 'lucide-react';
import React, { useState } from 'react'
import MultiSelectDropdown from '../MultiSelectInput';
import Input from '../../Input';
import { MdAssignmentAdd } from 'react-icons/md';
import AddComplaintModal from './AddComplaintModal';

const FamilyMedical = ({ complaint }) => {
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);
    const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);

    const listType = ["AIDS", "Boils"];

    const handleSubmit = () => {

    }
    return (
        <div>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold'>Add {complaint}</h1>
                    <button className="bg-gray-700 block place-self-end transition-all duration-300 cursor-pointer hover:bg-black px-5 py-2 rounded-lg text-white">Clear Form</button>
                    <div className='flex flex-col gap-2'>
                        <h1>Relation*</h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <Users className="size-4 text-blue-500" />
                            </div>
                            <select className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select the Relation</option>
                                <option value="Paternal Grand Father">Paternal Grand Father</option>
                                <option value="Paternal Grand Mother">Paternal Grand Mother</option>
                                <option value="Maternal Grand Father">Maternal Grand Father</option>
                                <option value="Maternal Grand Mother">Maternal Grand Mother</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Sister">Sister</option>
                                <option value="Brother">Brother</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1 >List of disease*</h1>
                        <MultiSelectDropdown Options={listType} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Any Other</h1>
                        <Input icon={PlusCircle} type="text" placeholder="Enter if any other" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Dead alive* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <User className="size-4 text-blue-500" />
                            </div>
                            <select className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select</option>
                                <option value="Alive">Alive</option>
                                <option value="Dead">Dead</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Age*</h1>
                        <Input icon={User} type="text" placeholder="Enter Age" required />
                    </div>
                    <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </form>
                <div className='sm:w-1/2 w-full'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                        <MdAssignmentAdd onClick={() => setComplaintModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                    </div>
                    <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                        {listType.map((investigation, index) => (
                            <>
                                <h1 className='text-xl p-1' key={index}>{investigation}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}
        </div>
    )
}

export default FamilyMedical