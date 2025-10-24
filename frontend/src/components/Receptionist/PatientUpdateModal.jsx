import { BriefcaseBusiness, Carrot, GraduationCap, Hospital, HouseIcon, Image, Mail, Phone, User } from 'lucide-react'
import { ImManWoman } from "react-icons/im";
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { REC_API_URL, recStore } from '../../store/RecStore';
import axios from 'axios';
import { CiUser } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';

const PatientUpdateModal = ({ patientId, onClose }) => {
    const { setUpdate, getPatient, patient } = recStore();
    const [formValues, setFormValues] = useState(
        {
            imageData: "",
            username: "",
            casePaperNo: "",
            fullname: "",
            age: "",
            phone: "",
            Altphone: "",
            email: "",
            address: "",
            qualification: "",
            occupation: "",
            dietaryPreference: "",
            gender: "",
            maritalStatus: "",
        })
    useEffect(() => {
        if (patientId) {
            getPatient(patientId);
        }
    }, [getPatient, patientId]);
    useEffect(() => {
        if (patient) {
            setFormValues({
                imageData: patient?.imageData || "",
                username: patient?.username || "",
                casePaperNo: patient?.casePaperNo || "",
                fullname: patient?.fullname || "",
                age: patient?.age || "",
                phone: patient?.phone || "",
                Altphone: patient?.Altphone || "",
                email: patient?.email || "",
                address: patient?.address || "",
                qualification: patient?.qualification || "",
                occupation: patient?.occupation || "",
                dietaryPreference: patient?.dietaryPreference || "",
                gender: patient?.gender || "",
                maritalStatus: patient?.maritalStatus || "",
            });
        }
    }, [patient]);


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
            const response = await axios.put(`${REC_API_URL}/update-patient/${patientId}`, formValues);
            setUpdate();
            onClose();
        } catch (error) {
            alert("Unable to update patient details")
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <form onSubmit={handleSubmit} className='z-10 my-8 mx-auto bg-white p-8 sm:max-w-[50vw] w-full border rounded-xl text-zinc-800 text-sm shadow-lg ' >
                    <h1 className='text-3xl font-semibold mb-5 text-center'>Update Patient Details</h1>
                    <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
                    <div className='flex flex-col gap-4 m-auto '>
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
                            <Input icon={User} type='text' onChange={handleInputChange} name="username" value={formValues.username} placeholder='Username' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Case Paper No.</h1>
                            <Input icon={User} type='text' onChange={handleInputChange} name="casePaperNo" value={formValues.casePaperNo} placeholder='Case Paper No.' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Name</h1>
                            <Input icon={User} type='text' onChange={handleInputChange} name="fullname" value={formValues.fullname} placeholder='Full Name' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Age</h1>
                            <Input icon={User} type='text' onChange={handleInputChange} name="age" value={formValues.age} placeholder='Age' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Gender</h1>
                            <select onChange={handleInputChange} name="gender" value={formValues.gender} className='py-2 pl-2 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900' id="">
                                <option value="" disabled selected className='font-normal' >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Address</h1>
                            <Input icon={HouseIcon} type='text' onChange={handleInputChange} name="address" value={formValues.address} placeholder='Address' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Phone Number</h1>
                            <Input icon={Phone} type='tel' onChange={handleInputChange} name="phone" value={formValues.phone} placeholder='Phone Number' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Alternative Phone Number</h1>
                            <Input icon={Phone} onChange={handleInputChange} name="Altphone" value={formValues.Altphone} placeholder='Alternative Number if any' type='tel' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Email Address</h1>
                            <Input icon={Mail} onChange={handleInputChange} name="email" value={formValues.email} placeholder='eg. abc@example.com' type='email' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Qualification</h1>
                            <Input icon={GraduationCap} onChange={handleInputChange} name="qualification" value={formValues.qualification} type='text' placeholder='enter qualification' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Occupation</h1>
                            <Input icon={BriefcaseBusiness} onChange={handleInputChange} name="occupation" value={formValues.occupation} type='text' placeholder='enter occupation' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Dietary Preference </h1>
                            <div className='relative w-full '>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Carrot className="size-4 text-blue-500" />
                                </div>
                                <select name="dietaryPreference" onChange={handleInputChange} value={formValues.dietaryPreference} id="diet" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                    <option value="" disabled selected className='font-normal' >Select Dietary Preference</option>
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
                                <select name="maritalStatus" onChange={handleInputChange} value={formValues.maritalStatus} id="diet" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                    <option value="" disabled selected className='font-normal' >Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widow">Widow</option>
                                </select>
                            </div>
                        </div>
                        <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientUpdateModal