import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 flex items-center justify-center relative overflow-hidden'>
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-white border-blue-300 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;