import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useStore } from '../../store/UpdateStore';
import Input from '../../components/Input';
import { MdOutlineBloodtype } from 'react-icons/md';
import { CiCalendar, CiHospital1, CiMail, CiPhone, CiUser } from 'react-icons/ci';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const location = useParams();
    const { getDetails, employees, update } = useStore();
    const employee = employees.filter((emp) => emp?._id === location.id);
    const [formValues, setFormValues] = useState({
        fullname: "",
        phone: "",
        email: "",
        address: "",
        branch: "",
        age: "",
        gender: "",
        bloodGroup: "",
        department: "",
        Salary: "",
        attendance: "",
    })

    useEffect(() => {
        getDetails();
    }, [getDetails])

    useEffect(() => {
        const selectedEmployee = employees.find(emp => emp?._id === location.id);
        if (selectedEmployee) {
            setFormValues({
                fullname: selectedEmployee.fullname || "",
                phone: selectedEmployee.phone || "",
                email: selectedEmployee.email || "",
                address: selectedEmployee.address || "",
                branch: selectedEmployee.branch || "",
                age: selectedEmployee.age || "",
                gender: selectedEmployee.gender || "",
                bloodGroup: selectedEmployee.bloodGroup || "",
                department: selectedEmployee.department || "",
                Salary: selectedEmployee.Salary || "",
                attendance: selectedEmployee.attendance || "",
            });
        }
    }, [employees, location.id]);

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
            await update(location.id, formValues);
            alert("Employee details updated successfully!");
        } catch (error) {
            alert("Employee details updated successfully!");
        }
    }

    return (
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
            <form onSubmit={handleSubmit} className='z-10 my-8 mx-auto bg-white p-8 max-w-[50vw] w-full border rounded-xl text-zinc-600 text-sm shadow-lg ' >
                <h1 onClick={() => navigate('/dashboard-DOCTOR/staff-update')} className='text-2xl cursor-pointer '><FaAngleDoubleLeft /></h1>
                <h1 className='text-3xl font-semibold mb-5 text-center'>UPDATE {employee[0]?.role.toUpperCase()} DETAILS </h1>
                <div className='flex flex-col gap-4 m-auto '>
                    <div className='flex flex-col gap-2 '>
                        <h1>Full Name</h1>
                        <Input icon={CiUser} onChange={handleInputChange} value={formValues.fullname} name="fullname" type='text' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Email Address</h1>
                        <Input icon={CiMail} onChange={handleInputChange} name="email" value={formValues.email} type='email' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Contact Number</h1>
                        <Input icon={CiPhone} name="phone" onChange={handleInputChange} value={formValues.phone} type='tel' />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <h1>Age</h1>
                        <Input icon={CiUser} name="age" onChange={handleInputChange} value={formValues.age} type='number' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Gender</h1>
                        <div className='relative   w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <CiUser className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} value={formValues.gender} name="gender" id="Gender" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                                <option value="transgender">Transgender</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Blood Group</h1>
                        <div className='relative   w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <MdOutlineBloodtype className='size-4 text-blue-500' />
                            </div>
                            <select onChange={handleInputChange} value={formValues.blood} name="bloodGroup" id="Blood Type" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="o+ve" >O+ve</option>
                                <option value="a+">A+</option>
                                <option value="b+">B+</option>
                                <option value="ab+">AB+</option>
                                <option value="o+">O+</option>
                                <option value="a-">A-</option>
                                <option value="b-">B-</option>
                                <option value="ab-">AB-</option>
                                <option value="o-">O-</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Address</h1>
                        <textarea onChange={handleInputChange} value={formValues.address} name='address' className='w-full  h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition duration-200'></textarea>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Department</h1>
                        <Input icon={CiHospital1} onChange={handleInputChange} value={formValues.department} name="department" type='text' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Salary</h1>
                        <Input icon={CiUser} onChange={handleInputChange} name="Salary" value={formValues.Salary} type='number' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Attendance</h1>
                        <Input icon={CiCalendar} name="attendance" onChange={handleInputChange} value={formValues.attendance} type='number' />
                    </div>
                    <button className='block mx-auto cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Update</button>
                </div >
            </form>
        </div>
    )
}

export default UpdateEmployee