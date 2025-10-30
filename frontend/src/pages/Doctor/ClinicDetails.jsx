import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FaImage, FaPhone } from "react-icons/fa6";
import { LuClock, LuLoaderCircle, LuMail, LuTrash } from "react-icons/lu";
import { DOC_API_URL, docStore } from "../../store/DocStore";
import axios from "axios";
import { useAuthStore } from '../../store/authStore';

const ClinicDetails = () => {
    const { getClinicDetails, clinicDetails, getLetterHead, letterHead } = docStore();
    const { user } = useAuthStore();
    const [selectBranch, setSelectBranch] = useState('Dombivali');
    const [formValues, setFormValues] = useState({
        phone: '',
        email: '',
        shift: ''
    });
    const [loading, setLoading] = useState(false);
    const [imageLoading, setimageLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [billInvoiceImage, setBillInvoiceImage] = useState('');
    const [letterHeadImage, setLetterHead] = useState('');
    const [imageLoader, setImageLoader] = useState(false);

    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            branch: selectBranch
        }))
    }, [selectBranch]);

    useEffect(() => {
        getClinicDetails();
    }, [submit]);

    useEffect(() => {
        const timeout = setTimeout(() => setImageLoader(true), 200);
        getLetterHead(user?._id).finally(() => {
            clearTimeout(timeout);
            setImageLoader(false);
        });
    }, [submit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    async function handleInputImage(e) {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            if (name === 'billInvoiceImage') {
                reader.onloadend = () => {
                    setBillInvoiceImage(
                        reader.result
                    );
                };
            }
            else if (name === 'letterHeadImage') {
                reader.onloadend = () => {
                    setLetterHead(
                        reader.result
                    );
                };
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`${DOC_API_URL}/addClinicDetails`, formValues);
            setLoading(false);
            setFormValues({
                phone: '',
                email: '',
                branch: selectBranch,
                shift: ''
            });
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }
    const uploadImage = async (e) => {
        e.preventDefault();
        try {
            setimageLoading(true);
            await axios.post(`${DOC_API_URL}/uploadLetterHead`, { billInvoiceImage, letterHeadImage, doctor: user?._id })
            setimageLoading(false);
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
                    <div className="flex flex-col gap-2">
                        <p>Add Shifts :</p>
                        <Input icon={LuClock} value={formValues.shift} type='text' onChange={handleInputChange} name="shift" />
                    </div>
                    <button className="bg-blue-500 rounded-md text-white mx-auto block my-4 px-3 py-1">{loading ? <LuLoaderCircle className="mx-auto animate-spin" size={24} /> : 'Add'}</button>
                </form>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Upload Clinic Dociments</h1>
                <form onSubmit={uploadImage} className="flex flex-col gap-3" >
                    <div className="flex flex-col gap-2">
                        <p>Upload Bill Invoice :</p>
                        <Input icon={FaImage} type='file' name="billInvoiceImage" onChange={handleInputImage} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Upload Letter Head : (for investigations and certificates)</p>
                        <Input icon={FaImage} type='file' name="letterHeadImage" onChange={handleInputImage} />
                    </div>
                    <button className="bg-blue-500 rounded-md text-white mx-auto block my-4 px-3 py-1">{imageLoading ? <LuLoaderCircle className="mx-auto animate-spin" size={24} /> : 'Add'}</button>
                </form>
                <div className="overflow-x-auto mt-10">
                    <table className="w-[90%] mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className=" bg-blue-500 text-white">
                                <th className="py-2 px-1 border">Branch</th>
                                <th className="py-2 px-1 border">Contact Details</th>
                                <th className="py-2 px-1 border">Email</th>
                                <th className="py-2 px-1 border">Shifts</th>
                                <th className="py-2 px-1 border">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clinicDetails.map((detail, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className="py-2 px-1 border text-center">{detail?.branch}</td>
                                        <td className="py-2 px-1 border text-center">
                                            {detail?.phone.length > 0 ? <ul>{detail?.phone.map((phone, phoneIndex) => (
                                                <li key={phoneIndex} className="my-1 flex items-center justify-center gap-3" >{phone}<LuTrash onClick={async () => { await axios.delete(`${DOC_API_URL}/deletePhoneNumber/${phoneIndex}/${detail?._id}`); setSubmit(prev => !prev) }} className="cursor-pointer text-red-600" /></li>
                                            ))}
                                            </ul>
                                                :
                                                '-'
                                            }
                                        </td>
                                        <td className="py-2 px-1 border text-center">{(detail?.email
                                            ?
                                            (
                                                <>
                                                    {detail?.email}
                                                    <button
                                                        onClick={async () => { await axios.delete(`${DOC_API_URL}/deleteClinicEmail/${detail?._id}`); setSubmit(prev => !prev) }}
                                                        className="inline-flex items-center cursor-pointer text-red-600 ml-2"
                                                    >
                                                        <LuTrash />
                                                    </button>
                                                </>
                                            )
                                            :
                                            '-')}
                                        </td>
                                        <td className="py-2 px-1 border text-center">
                                            {detail?.shifts.length > 0 ? <ul>{detail?.shifts.map((shift, shiftIndex) => (
                                                <li key={shiftIndex} className="my-1 flex items-center justify-center gap-3" >{shift}<LuTrash onClick={async () => { await axios.delete(`${DOC_API_URL}/deleteShift/${shiftIndex}/${detail?._id}`); setSubmit(prev => !prev) }} className="cursor-pointer text-red-600" /></li>
                                            ))}
                                            </ul>
                                                :
                                                '-'
                                            }
                                        </td>
                                        <td onClick={() => handleDelete(detail?._id)} className="py-2 px-1 border text-center"><LuTrash className="text-red-500 cursor-pointer mx-auto" size={24} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <h1 className="text-3xl mt-6 mb-3 font-semibold">Bill Invoice</h1>
                {imageLoader ? <LuLoaderCircle className="mx-auto animate-spin" size={24} /> : <img src={letterHead?.billInvoiceImage} className="object-contain mx-auto" />}
                <h1 className="text-3xl mt-6 mb-3 font-semibold">Letterhead</h1>
                {imageLoader ? <LuLoaderCircle className="mx-auto animate-spin" size={24} /> : <img src={letterHead?.letterHeadImage} className="object-contain mx-auto" />}
            </div>
        </div>
    )
}

export default ClinicDetails