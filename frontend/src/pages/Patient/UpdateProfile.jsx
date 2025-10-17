import Input from '../../components/Input'
import { CiMail, CiPhone, CiUser } from 'react-icons/ci'
import { FaCarrot, FaGraduationCap } from 'react-icons/fa'
import { FaHouse, FaUser } from 'react-icons/fa6'
import { ImManWoman } from 'react-icons/im'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import { REC_API_URL, recStore } from '../../store/RecStore'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const UpdateProfile = () => {
    const { user } = useAuthStore();
    const { setUpdate } = recStore();
    const [formValues, setFormValues] = useState({
        imageData: user?.imageData,
        username: user?.username || "",
        casePaperNo: user?.casePaperNo || "",
        fullname: user?.fullname || "",
        age: user?.age || "",
        phone: user?.phone || "",
        Altphone: user?.Altphone || "",
        email: user?.email || "",
        address: user?.address || "",
        qualification: user?.qualification || "",
        occupation: user?.occupation || "",
        dietaryPreference: user?.dietaryPreference || "",
        gender: user?.gender || "",
        maritalStatus: user?.maritalStatus || "",
        referredBy: user?.referredBy || ""
    })

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageData" && files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues((prev) => ({
                    ...prev,
                    [name]: reader.result,
                }));
            };

            reader.readAsDataURL(file);
        }
        else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${REC_API_URL}/update-patient/${user?._id}`, formValues);
            toast("Profile Updated");
            setUpdate((prev) => !prev)
        } catch (error) {
            alert("Unable to update patient details")
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 p-5 to-sky-700 overflow-hidden min-h-screen w-full'>
            <form onSubmit={handleSubmit} className='z-10 my-8 mx-auto bg-white p-8 sm:max-w-[50vw] w-full border rounded-xl text-zinc-800 text-sm shadow-lg'>
                <ToastContainer toastClassName="my_toast" position='bottom-right' />
                <h1 className='text-3xl font-semibold mb-5 text-center'>Update Profile Details</h1>
                <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
                <div className='flex flex-col gap-4 m-auto'>
                    <div className='flex flex-col gap-2'>
                        <h1>Profile Picture</h1>
                        <Input icon={CiUser} key={formValues.imageData} name="imageData" onChange={handleInputChange} type="file" />
                        {
                            formValues.imageData &&
                            <img src={formValues.imageData} className="h-20 w-20 object-contain border border-gray-300 rounded-md" />
                        }
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Username</h1>
                        <Input icon={CiUser} type='text' onChange={handleInputChange} name="username" value={formValues.username} placeholder='Full Name' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Case Paper No.</h1>
                        <Input icon={CiUser} type='text' onChange={handleInputChange} name="casePaperNo" value={formValues.casePaperNo} placeholder='Case Paper No.' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Name</h1>
                        <Input icon={CiUser} type='text' onChange={handleInputChange} name="fullname" value={formValues.fullname} placeholder='Full Name' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Age</h1>
                        <Input icon={CiUser} type='text' onChange={handleInputChange} name="age" value={formValues.age} placeholder='Age' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Gender</h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <CiUser className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="gender" value={formValues.gender} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled className='font-normal' >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Address</h1>
                        <Input icon={FaHouse} type='text' onChange={handleInputChange} name="address" value={formValues.address} placeholder='Address' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Phone Number</h1>
                        <Input icon={CiPhone} type='tel' onChange={handleInputChange} name="phone" value={formValues.phone} placeholder='Phone Number' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Alternative Phone Number</h1>
                        <Input icon={CiPhone} onChange={handleInputChange} name="Altphone" value={formValues.Altphone} placeholder='Alternative Number if any' type='tel' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Email Address</h1>
                        <Input icon={CiMail} placeholder='eg. abc@example.com' onChange={handleInputChange} name="email" value={formValues.email} type='email' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Qualification</h1>
                        <Input icon={FaGraduationCap} type='text' onChange={handleInputChange} name="qualification" value={formValues.qualification} placeholder='Qualification' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Occupation*</h1>
                        <Input icon={MdOutlineBusinessCenter} onChange={handleInputChange} name="occupation" value={formValues.occupation} type='text' placeholder='Occupation' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Dietary Preference </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <FaCarrot className="size-4 text-blue-500" />
                            </div>
                            <select name="dietaryPreference" onChange={handleInputChange} value={formValues.dietaryPreference} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled className='font-normal' >Select Dietary Preference</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non Vegetarian">Non Vegetarian</option>
                                <option value="Egg">Egg</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Marital Status </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <ImManWoman className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="maritalStatus" value={formValues.maritalStatus} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled className='font-normal' >Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widow">Widow</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Referred By :</h1>
                        <Input icon={FaUser} type='text' onChange={handleInputChange} name="referredBy" value={formValues.referredBy} placeholder='Referred By' />
                    </div>
                    <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile