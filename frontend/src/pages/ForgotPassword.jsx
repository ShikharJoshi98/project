import { useState } from 'react'
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { LuLoaderCircle } from 'react-icons/lu';
import { CiMail, CiUser } from 'react-icons/ci';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className='min-h-screen  bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700   relative overflow-hidden' >
      {!isSubmitted ? (<form onSubmit={handleSubmit} className='mx-auto relative z-10 my-7 h-auto bg-white p-5 md:max-w-[430px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
        <h1 className='text-3xl  font-semibold mb-5 text-center'><span className='text-blue-400'> FORGOT</span> PASSWORD</h1>
        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-8 w-28 mx-auto ' />
        <div className='flex items-center flex-col gap-6'>
          <p className='text-center'>Enter your username and email address and we'll send you a link to reset your password.</p>
          <Input icon={CiUser} type='text' required placeholder='Username*' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input icon={CiMail} type='email' required placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className='mx-auto font-semibold mt-2 cursor-pointer bg-blue-400 text-lg hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white  w-52 p-2 rounded-full' type='submit'>
            {isLoading ? <LuLoaderCircle className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
          </button>
          <p onClick={() => navigate('/login')} className=' group mt-1 cursor-pointer text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1 '> <FaLongArrowAltLeft/>Back to Login</p>
        </div>
      </form>) : (
        <div className='mx-auto flex flex-col items-center relative z-10 my-7 h-auto bg-white p-5 md:max-w-[430px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <div className='w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4'>
            <CiMail className='h-8 w-8 text-white'/>
          </div>
          <p className='text-zinc-900 text-center mb-6'>If an account exists for {email}, you will receive a password reset link shortly.</p>
          <p onClick={() => navigate('/login')} className=' group mt-1 -ml-5 cursor-pointer text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1'> <FaLongArrowAltLeft /> Back to Login</p>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword