import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import { CiLock } from 'react-icons/ci';

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);
			toast("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='min-h-screen bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 relative overflow-hidden'>
			<div className='p-8'>
				<form onSubmit={handleSubmit} className='mx-auto flex items-center gap-5 flex-col relative z-10 my-20 h-auto bg-white p-5 md:max-w-[430px] max-w-[80vw] border rounded-xl text-zinc-600 text-sm shadow-lg '>
					<ToastContainer />
					<h1 className='text-3xl  font-semibold mb-5 text-center'><span className='text-blue-400'> RESET</span> PASSWORD</h1>
					<Input icon={CiLock} type='password' placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
					<Input icon={CiLock} type='password' placeholder='Confirm New Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
					{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
					<button className='mx-auto font-semibold mt-2 cursor-pointer bg-blue-400 text-lg hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white  w-52 p-2 rounded-full' disabled={isLoading}>
						{isLoading ? "Resetting..." : "Set New Password"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword