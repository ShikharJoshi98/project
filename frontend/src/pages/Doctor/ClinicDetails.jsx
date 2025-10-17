import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FaPhone } from "react-icons/fa6";
import { LuLoaderCircle, LuMail, LuTrash } from "react-icons/lu";
import { DOC_API_URL, docStore } from "../../store/DocStore";
import axios from "axios";

const ClinicDetails = () => {
    const { getClinicDetails, clinicDetails } = docStore();
    const [selectBranch, setSelectBranch] = useState('Dombivali');
    const [formValues, setFormValues] = useState({
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            branch: selectBranch
        }))
    }, [selectBranch]);

    useEffect(() => {
        getClinicDetails();
    }, [submit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`${DOC_API_URL}/addClinicDetails`, formValues);
            setLoading(false);
            setFormValues({
                phone: '',
                email: '',
                branch: selectBranch
            });
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/deleteClinicDetail/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Clinic Details</h1>
                <div className='flex flex-col  gap-4 mt-4'>
                    <p className='text-black mb-2 mx-auto text-lg font-semibold'>Select Branch:</p>
                    <div className='h-9 bg-[#c8c8ce] mx-auto rounded-[18px]'><button onClick={() => setSelectBranch('Dombivali')} className={`py-1 ${selectBranch === 'Dombivali' ? 'bg-blue-500 rounded-[18px] text-white' : ''} py-1.5 px-5 cursor-pointer`}>Dombivali</button><button onClick={() => setSelectBranch('Mulund')} className={`py-1.5 px-5 ${selectBranch === 'Mulund' ? 'bg-blue-500 rounded-[18px] text-white' : ''} cursor-pointer`}>Mulund</button></div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <p>Phone Number :</p>
                        <Input icon={FaPhone} value={formValues.phone} type='text' onChange={handleInputChange} name="phone" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Email :</p>
                        <Input icon={LuMail} value={formValues.email} type='email' onChange={handleInputChange} name="email" />
                    </div>
                    <button className="bg-blue-500 rounded-md text-white mx-auto block my-4 px-3 py-1">{loading ? <LuLoaderCircle className="mx-auto animate-spin" size={24} /> : 'Add'}</button>
                </form>
                <div className="overflow-x-auto mt-10">
                    <table className="w-[90%] mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className=" bg-blue-500 text-white">
                                <th className="py-2 px-1 border">Branch</th>
                                <th className="py-2 px-1 border">Contact Details</th>
                                <th className="py-2 px-1 border">Email</th>
                                <th className="py-2 px-1 border">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clinicDetails.map((detail, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className="py-2 px-1 border text-center">{detail?.branch}</td>
                                        <td className="py-2 px-1 border text-center">
                                            <ul>{detail?.phone.map((phone, phoneIndex) => (
                                                <li key={phoneIndex} className="my-1" >{phone}</li>
                                            ))}
                                            </ul>
                                        </td>
                                        <td className="py-2 px-1 border text-center">{detail?.email}</td>
                                        <td onClick={() => handleDelete(detail?._id)} className="py-2 px-1 border text-center"><LuTrash className="text-red-500 cursor-pointer mx-auto" size={24} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClinicDetails