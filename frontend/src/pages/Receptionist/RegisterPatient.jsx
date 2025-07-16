import { useState } from 'react'
import Input from '../../components/Input'
import PatientDetailModal from '../../components/Receptionist/PatientDetailModal'
import axios from 'axios'
import { REC_API_URL } from '../../store/RecStore'
import { useAuthStore } from '../../store/authStore'
import { CiHospital1, CiMail, CiPhone, CiUser } from 'react-icons/ci'

const RegisterPatient = () => {
    const [isPatientRegisterModalOpen, setPatientRegisterModalIsOpen] = useState(false);
    const { user } = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formValues, setFormValues] = useState({
        fullname: "",
        phone: "",
        Altphone: "",
        email: "",
        branch: user?.branch
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REC_API_URL}/register`, { ...formValues, username, password });
            setPatientRegisterModalIsOpen(true)
            setFormValues({
                fullname: "",
                phone: "",
                Altphone: "",
                email: "",
                branch: user?.branch
            })
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const usernameCreator = (newName, newPhone) => {
        let text = "";
        let firstName = newName.split(" ")[0] || "";
        let num = String(newPhone);
        text = firstName + num.slice(num.length - 4);
        setUsername(text);
    }
    const passwordCreator = (newName, newPhone, branch) => {
        let text = "";
        let firstName = newName.split(" ")[0] || "";
        let num = String(newPhone);
        text = branch.toUpperCase().slice(0, 3) + '-' + firstName + num.slice(num.length - 4);
        setPassword(text);
    }

    return (
        <>
            <div onSubmit={handleSubmit} className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen  w-full'>
                <form className='z-10 my-8 mx-auto bg-white p-8 sm:max-w-[50vw] w-full border rounded-xl text-zinc-800 text-sm shadow-lg'>
                    <h1 className='text-2xl font-semibold mb-5 w-fit mx-auto'>Register Patient</h1>
                    <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto'/>
                    <div className='flex flex-col gap-4 m-auto '>
                        <div className='flex flex-col gap-2 '>
                            <h1>Name*</h1>
                            <Input icon={CiUser} onChange={(e) => { handleInputChange(e); usernameCreator(e.target.value, formValues.phone); passwordCreator(e.target.value, formValues.phone, formValues.branch) }} value={formValues.fullname} name="fullname" type='text' placeholder='Full Name' required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Phone Number*</h1>
                            <Input icon={CiPhone} onChange={(e) => { handleInputChange(e); usernameCreator(formValues.fullname, e.target.value); passwordCreator(formValues.fullname, e.target.value, formValues.branch) }} value={formValues.phone} name="phone" type='tel' placeholder='Phone Number' required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Alternative Phone Number</h1>
                            <Input icon={CiPhone} onChange={handleInputChange} value={formValues.Altphone} name="Altphone" placeholder='Alternative Number if any' type='tel' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Email Address</h1>
                            <Input icon={CiMail} onChange={handleInputChange} value={formValues.email} name="email" placeholder='eg. abc@example.com' type='email' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Branch* </h1>
                            <div className='relative w-full '>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <CiHospital1 className="size-4 text-blue-500" />
                                </div>
                                <select onChange={(e) => { handleInputChange(e); passwordCreator(formValues.fullname, formValues.phone, e.target.value) }} value={formValues.branch} name="branch" required id="branch" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300'>
                                    <option value={user?.branch}>{user?.branch}</option>
                                </select>
                            </div>
                        </div>
                        <button className='cursor-pointer block mx-auto bg-blue-500 text-lg font-semibold hover:text-gray-200 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Register</button>
                    </div>
                </form>
            </div>
            {isPatientRegisterModalOpen && <PatientDetailModal username={username} password={password} onClose={() => setPatientRegisterModalIsOpen(false)} />}
        </>
    )
}

export default RegisterPatient