import { updateDate } from '../../store/todayDate';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import Input from '../../components/Input';
import { AiFillMedicineBox } from 'react-icons/ai';
import { FaRegFilePdf, FaRegTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { generatePDF, generateTablePDF } from '../../store/GenerateHomeoPdf';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CiSearch } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa6';

const HomeoBhagwat = () => {
    const todayDate = updateDate();
    const { homeoBhagwatSection, setHomeoBhagwatSection, gethomeobhagwat, Homeo, updatehomeobhagwat, homeobhagwat } = docStore();
    const [editingRow, setEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [formValues, setFormValues] = useState({ name: "", description: "", section: homeoBhagwatSection });
    const [submit, setSubmit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

     useEffect(() => {
        gethomeobhagwat();
    }, [gethomeobhagwat, submit]);

    const handleEditClick = (idx, medicine) => {
        setEditingRow(idx);
        setEditedData({ ...medicine });
    };
    const handleChange = (e, col) => {
        setEditedData((prev) => ({
            ...prev,
            [col]: e.target.value,
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSave = async () => {
        try {
            await updatehomeobhagwat(editedData._id, editedData);
            setEditingRow(null);
            window.scrollTo(0, 0);
            toast("Details updated successfully!");
        } catch (error) {
            toast("Failed to update details.");
        }
    }
    const deleteCol = async (id) => {
        try {
            const response = await axios.delete(`${DOC_API_URL}/homeo-delete/${id}`)
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            formValues.section = homeoBhagwatSection;
            await homeobhagwat(formValues);
            setSubmit((prev) => !prev);
            window.scrollTo(0, 0);
            toast("Added")
            setFormValues({
                name: "",
                description: ""
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen p-8 w-full'>
            <ToastContainer />
            <div className='bg-[#e9ecef] p-5 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Homeo Bhagwat Gita</h1>
                <h1 className=' text-blue-500 font-semibold mb-3 text-lg mt-4'>{todayDate}</h1>
                <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base'>
                    <button onClick={() => setHomeoBhagwatSection('medicine')} className={`cursor-pointer border-1 hover:scale-98 transition-all duration-300 ${homeoBhagwatSection === 'medicine' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>MEDICINE NAME</button>
                    <button onClick={() => setHomeoBhagwatSection('disease')} className={`cursor-pointer border-1 hover:scale-98 transition-all duration-300 ${homeoBhagwatSection === 'disease' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>DISEASE NAME</button>
                    <button onClick={() => setHomeoBhagwatSection('redline')} className={`cursor-pointer border-1 hover:scale-98 transition-all duration-300 ${homeoBhagwatSection === 'redline' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>RED LINE SYMPTOMS</button>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 min-w-full rounded-xl text-zinc-600 text-sm shadow-lg">
                    <div className="flex flex-col gap-4 m-auto">
                        <div className="flex flex-col gap-2">
                            <h1 className='text-black '>{homeoBhagwatSection === 'medicine' ? 'Medicine Name' : homeoBhagwatSection === 'disease' ? 'Disease Name' : 'Redline Symptoms'}</h1>
                            <Input icon={AiFillMedicineBox} type="text" value={formValues.name} onChange={handleInputChange} name="name" placeholder='Enter Name' required />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h1 className="text-black mb-2">Description:</h1>
                        <textarea value={formValues.description} onChange={handleInputChange} placeholder='Enter Description' name="description" className='w-full h-56 pl-3 pr-3 py-2 font-normal rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition duration-200'></textarea>
                    </div>
                    <div className='flex item justify-center '>
                        <button type="submit" className="bg-blue-500 text-lg w-40 transition-all duration-300 cursor-pointer hover:bg-blue-600 p-2 rounded-lg mt-3 text-white">Save</button>
                    </div>
                </form>
                <div>
                    <h1 className='text-xl mb-3 text-blue-600 font-semibold'>Search</h1>
                    <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} type="text" name="name" placeholder='Enter Medicine Name or description' />
                    <div className='w-full flex justify-center sm:justify-end '>
                        <button onClick={() => { generateTablePDF(Homeo.filter((item) => item?.section === homeoBhagwatSection)) }} className='bg-blue-500  p-2 text-white rounded-md cursor-pointer mt-5 flex items-center gap-4'>Generate Pdf<FaRegFilePdf size={25} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto mt-3">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md">
                        <thead >
                            <tr className=" bg-blue-500 text-white text-lg">
                                <th className="py-2 px-4 border">Serial No.</th>
                                <th className="py-2 px-4 border">Medicine</th>
                                <th className="py-2 px-4 border">Description</th>
                                <th className="py-2 px-4 border">Update</th>
                                <th className="py-2 px-4 border">Delete</th>
                                <th className="py-2 px-4 border">PDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Homeo.filter((item) => item?.section === homeoBhagwatSection && (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm))).map((item, index) => (
                                    <tr key={index} className='bg-blue-200'>
                                        <td className="py-3 px-4 border text-center">{index + 1}</td>
                                        <td className="py-3 px-4 border text-center">{editingRow === index ? (
                                            <input value={editedData.name || ""} onChange={(e) => handleChange(e, "name")} className="bg-white border rounded p-1" type="text"/>) : (item?.name)}</td>
                                        <td className="py-3 px-4 border text-center">{editingRow === index ? (
                                            <textarea value={editedData.description || ""} onChange={(e) => handleChange(e, "description")} onInput={(e) => {e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px";}} className="bg-white border rounded p-1 w-full resize-none min-h-20" type="text"></textarea>
                                        ) : (item?.description)}</td>
                                        <td className="py-3 px-4 border text-center">
                                            {editingRow === index ? ( <button onClick={handleSave} className="bg-green-500 text-white p-1 rounded">Save</button>) : (<button onClick={() => handleEditClick(index, item)} className="p-1 rounded"><FaPen className='mx-auto' size={25} /></button>)}
                                        </td>
                                        <td onClick={() => deleteCol(item?._id)} className="py-3 px-4 border"><FaRegTrashAlt className='mx-auto' size={25} /></td>
                                        <td onClick={() => generatePDF(item)} className="py-3 px-4 border"><FaRegFilePdf className='mx-auto' size={25} /></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HomeoBhagwat