import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { CiLocationOn, CiLock, CiMail, CiPhone, CiUser } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';
import PatientDetailModal from '../components/Receptionist/PatientDetailModal';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [pass, setPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [altphone, setAltPhone] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const [branch, setBranch] = useState("");
  const [passerror, setError] = useState(false);
  const { register, error, isLoading } = useAuthStore();
  const [isPatientRegisterModalOpen, setPatientRegisterModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass !== confirmpass) {
      setError(true);
      return;
    }
    else {
      setError(false);
    }
    try {
      await register(name, phone, altphone, email, username, pass, branch);
      setPatientRegisterModalIsOpen(true);
    }
    catch (error) {
      console.error(error);
    }
  };

  const usernameCreator = (newName, newPhone) => {
    let text = "";
    let firstName = newName.split(" ")[0] || "";
    let num = String(newPhone);
    text = firstName + num.slice(num.length - 4);
    setUsername(text);
  }

  const resetForm = () => {
    setName('');
    setEmail('');
    setAltPhone('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setBranch('');
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 relative overflow-hidden'>
      <div>
        <form onSubmit={handleSubmit} className='mx-auto relative z-10 my-8 h-auto bg-white p-8 md:max-w-[500px] max-w-[80vw] border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <h1 className='text-3xl font-semibold mb-5 text-center'>Registration Form</h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
          <div className='flex flex-col gap-4 m-auto items-start'>
            <Input icon={CiUser} type='text' required placeholder='Full Name*' value={name} onChange={(e) => { let newName = e.target.value; setName(newName); usernameCreator(newName, phone); }} />
            <Input icon={CiPhone} type='tel' required placeholder='Phone Number*' value={phone} onChange={(e) => { let newPhone = e.target.value; setPhone(newPhone); usernameCreator(name, newPhone); }} />
            <Input icon={CiPhone} type='tel' placeholder='Alternative Phone Number (Optional)' value={altphone} onChange={(e) => setAltPhone(e.target.value)} />
            <Input icon={CiMail} type='email' required placeholder='Email Address*' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input icon={CiUser} type='text' placeholder='Username (Auto generated)' value={username} disabled />
            <p className='text-xs -mt-2 ml-2 text-red-500'>Firstname and Last four Digits of your Mobile Number. e.g: aman9975</p>
            {showPassword ?
              <Input icon={CiLock} type='password' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} /> :
              <Input icon={CiLock} type='text' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} />
            }
            <div className='flex ml-2 -mt-2 items-center gap-2'>
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)} id='check' /><label htmlFor="check">Show Password</label>
            </div>
            {showConfirmPassword ?
              <Input icon={CiLock} type='password' required placeholder='Confirm Password*' value={confirmpass} onChange={(e) => setConfirmPassword(e.target.value)} /> :
              <Input icon={CiLock} type='text' required placeholder='Confirm Password*' value={confirmpass} onChange={(e) => setConfirmPassword(e.target.value)} />
            }
            <div className='flex ml-2 -mt-2 items-center gap-2'>
              <input type="checkbox" onChange={() => setConfirmShowPassword(!showConfirmPassword)} id='checkConfirm' /><label htmlFor="checkConfirm">Show Password</label>
            </div>
            <div className='relative mt-2   w-full '>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <CiLocationOn className="size-4 text-blue-500" />
              </div>
              <select onChange={(e) => { setBranch(e.target.value); }} value={branch} name="branch" required id="Branch" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                <option value="" disabled selected>Select Branch*</option>
                <option value="Dombivali">Dombivali</option>
                <option value="Mulund">Mulund</option>
              </select>
            </div>
            {passerror && <p className='text-red-500'>The confirm password must be the same as the password.</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <button className='mx-auto cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' disabled={isLoading}>
              {!passerror && !error && isLoading ? <LuLoaderCircle className='animate-spin mx-auto ' size={24} /> : "Register"}
            </button>
            <p className='mx-auto mt-5'>Already have an Account ? <span onClick={() => navigate('/login')} className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>Click here to login</span></p>
          </div>
        </form>
      </div>
      {isPatientRegisterModalOpen && <PatientDetailModal username={username} password={pass} onClose={() => { setPatientRegisterModalIsOpen(false); resetForm(); }} />}
    </div>
  )
}

export default Register