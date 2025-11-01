import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { CiLocationOn, CiLock, CiMail, CiPhone, CiUser } from 'react-icons/ci';
import { LuImage, LuLoaderCircle, LuUser } from 'react-icons/lu';
import PatientDetailModal from '../components/Receptionist/PatientDetailModal';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [casePaperNo, setCasePaperNo] = useState("");
  const navigate = useNavigate();
  const [pass, setPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [altphone, setAltPhone] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const [branch, setBranch] = useState("");
  const [patientCard, setPatientCard] = useState("");
  const [passerror, setError] = useState(false);
  const { register, error, isLoading } = useAuthStore();
  const [isPatientRegisterModalOpen, setPatientRegisterModalIsOpen] = useState(false);
  const [patientStatus, setPatientStatus] = useState('new');

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
      const prefix = branch === "Dombivali" ? "DOM-" : "MUL-";
      const finalCasePaperNo = `${prefix}${casePaperNo ? casePaperNo : 'NEW'}`;
      await register(patientCard, name, phone, altphone, email, username, pass, branch, finalCasePaperNo);
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
  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (name === "patientCard" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientCard(
          reader.result
        );
      };
      reader.readAsDataURL(file);
    }
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
    setCasePaperNo('');
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#ecf3fe] to-white relative overflow-hidden'>
      <div>

        <form onSubmit={handleSubmit} className='mx-auto relative z-10 my-8 h-auto border border-gray-500 bg-white/40 backdrop-blur-lg p-8 md:max-w-[500px] max-w-[80vw] rounded-xl text-zinc-600 text-sm shadow-lg'>
          <h1 className='text-3xl font-semibold mb-5 text-center'><span className='bg-gradient-to-br from-blue-400 via-blue-500 to-sky-600 bg-clip-text text-transparent'>Registration</span> Form</h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
          <div className='flex flex-col gap-2 mb-3'>
            <h1>Are you a new patient or a existing patient ?</h1>
            <div className='relative w-full '>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <LuUser className="size-4 text-blue-500" />
              </div>
              <select defaultValue='new' onChange={(e) => setPatientStatus(e.target.value)} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                <option value="returning">Existing Patient</option>
                <option value="new">New Patient</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-4 m-auto items-start'>
            {patientStatus === 'returning' && <div className='flex flex-col gap-2 w-full'>
              <h1>Upload Patient Card (if available)</h1>
              <Input icon={LuImage} key={patientCard} name="patientCard" onChange={(e) => handleImageUpload(e)} type="file" />
              {
                patientCard &&
                <img src={patientCard} className="h-20 w-20 object-contain border border-gray-300 rounded-md" />
              }
            </div>}
            <select onChange={(e) => { setBranch(e.target.value); }} value={branch} name="branch" required id="Branch" className='py-2 pl-3 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="" disabled>Select Branch*</option>
              <option value="Dombivali">Dombivali</option>
              <option value="Mulund">Mulund</option>
            </select>
            {patientStatus === 'returning' && <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                {branch === "Dombivali" ? "DOM-" : branch === "Mulund" ? "MUL-" : ""}
              </span>
              <input
                type="text"
                placeholder="Case Paper No. (for old patients only)"
                value={casePaperNo}
                onChange={(e) => setCasePaperNo(e.target.value)}
                className="pl-14 pr-3 py-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>}
            <Input icon={CiUser} type='text' required placeholder='Full Name*' value={name} onChange={(e) => { let newName = e.target.value; setName(newName); usernameCreator(newName, phone); }} />
            <Input icon={CiPhone} type='tel' required placeholder='Phone Number*' value={phone} onChange={(e) => { let newPhone = e.target.value; setPhone(newPhone); usernameCreator(name, newPhone); }} />
            <Input icon={CiPhone} type='tel' placeholder='Alternative Phone Number (Optional)' value={altphone} onChange={(e) => setAltPhone(e.target.value)} />
            <Input icon={CiMail} type='email' required placeholder='Email Address*' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='flex flex-col gap-2 w-full'>
              <p>Username :</p>
              <Input icon={CiUser} type='text' placeholder='Username (Auto generated)' value={username} disabled />
            </div>
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