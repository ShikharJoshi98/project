import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
      <div className='bg-[#343a40]   '>
          <div className='flex flex-col px-20 py-10 sm:grid md:grid-cols-[1.1fr_1fr_1fr_1fr] gap-14 my-10 mt-10 text-sm '>
              <div>
                  <h2 onClick={()=>navigate('/')} className='text-white font-semibold  cursor-pointer  mb-4'>Wings Classical Homeopathy</h2>
                  <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                  <p className='w-full text-[#c2c4c2]'>" Service To Patient is Service To Nation "</p>
              </div>
              <div>
                  <h2 className='text-white font-semibold  mb-4'>SERVICES</h2>
                  <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                  <p className='w-full text-[#c2c4c2]'>All Types Of Chronic Diseases.</p>

              </div>
              <div>
                  <h2 className='text-white font-semibold  mb-4'>DOMBIVALI Branch-1</h2>
                  <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                  <p className='w-full text-[13px] font-medium text-[#c2c4c2] text-left leading-relaxed'>Address : 102, "Sanvi Appartment", 1st Floor, Near Shiv Sena Office, Gupte Road, Dombivali (W). <br />
Time : <br />
9.30 am to 2 pm <br />
5.30 pm to 10 pm. <br />
Tel : <br />
0251 - 2492081 / 2484950 
Mobile : <br />
+91-8080899990, +91 9892064974
Email : <br />
wingshomeopathy@gmail.com <br />
Visit Us : www.wingshomeopathy.com</p>
              </div>
              <div>
                  <h2 className='text-white font-semibold  mb-4'>MULUND Branch-2</h2>
                  <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                  <p className='w-full text-[13px] font-medium text-[#c2c4c2] text-left leading-relaxed'>
                  Address : Kapeesh Mall, Shop No. 17 ,18, 19, & 20, 1st Floor, M.G. Road, Near Mulund Railway Station, Mulund (W). <br />
Time : <br />
2.30 pm to 5 pm. <br />
Sunday- 10.30 am to 4.30 pm. <br />
<p className='text-yellow-500'>Thursday -Closed</p> 
Tel : <br />
022 - 25628989 <br />
Mobile : <br />
+91-8080848403, +91 9892064974
Email : <br />
wingshomeopathy@gmail.com
                  </p>
              </div>
          </div>
          <hr className='w-full mt-4 bg-[#c2c4c2] h-[0.3px] border-none ' />
          <div className=' md:flex-row flex flex-col  items-center justify-around text-[13px] text-[#c2c4c2] py-8'>
              <p className=''>© Copyright Wings Classical Homeopathy. All Rights Reserved.</p>
              <p>Designed with 💜 By <a href="https://www.snteducation.com/" target='blank' className='hover:underline hover:text-blue-500 transition-all duration-400'> Snt Super Net Technology Munirka Delhi(New)</a></p>
          </div>
      </div>
  )
}

export default Footer