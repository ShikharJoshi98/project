import React from 'react'

const AboutCard = () => {
  return (
    <div >
        <div className='flex flex-col  p-5 items-center gap-5 max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px] h-auto mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
          <h1 className='text-xl md:text-4xl font-semibold text-slate-800'>ABOUT DOCTOR</h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm  w-28 ' />
          <h1 className='text-xl text-center md:text-2xl font-semibold text-slate-800'>"Service to the Patient is Service to Nation "</h1>
          <div className='flex flex-col items-center gap-[6px]'>
            <img src="/Dr. Santosh Yadav.png" alt="" className='object-contain border-4 shadow-md shadow-zinc-500 border-zinc-500 rounded-md' />
            <h1 className='text-2xl font-semibold'>Dr. Santosh K Yadav</h1>
            <h1 className='text-xl text-blue-600 font-bold'>M.D. (Homeopathy)</h1>
            <h1 className='text-xl text-blue-600 font-bold'>Ph.D.(Homeopathy)</h1>
            <h2 className=' text-lg font-medium mt-2'>About Dr. Santosh K Yadav</h2>
            <div className='text-center flex flex-col gap-3 font-medium mb-6  text-xs md:text-sm'>     
            <p >Dr. Santosh K Yadav is a consultant homeopathic doctor is flourishing homeopathic clinical practice in Dombivali and Mulund since 2000. All across India patient consulting him from various state and world wide. he is known too thousands of patients as a kind and lively homeopathy doctor. </p > 

            <p>He is president of Wings medical foundation. He completed his BHMS (Bachelor of Homeopathic Medicine & Surgery) from Amravati university and done his post graduation( M.D Homoeopathy ) from aurangabad university.He also done Ph.D. in Homoeopathy field .</p>
            </div> 
           </div>
        </div>
      </div>
  )
}

export default AboutCard