import { LuLoaderCircle } from "react-icons/lu";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 flex items-center justify-center relative overflow-hidden'>
			<LuLoaderCircle className="text-white animate-spin" size={94} />
		</div>
	);
};

export default LoadingSpinner;