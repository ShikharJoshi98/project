import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../../store/UpdateStore'
import { updateDate } from '../../store/todayDate'
import { CiUser } from 'react-icons/ci'


const TodayCollection = () => {
    const location = useParams();
    const [collectionType, setCollectionType] = useState('Collections');
    const { getCollection, collection, getDetails, employees } = useStore();
    const [employee, setEmployee] = useState();

    useEffect(() => {
        getCollection(location.location);
        getDetails();
    }, [getCollection, getDetails, location.location]);

    const todayDate = updateDate();
    let collectionSum = 0;
    let cashPayment = 0;
    let onlinePayment = 0;
    let balanceSum = 0;
    let advanceSum = 0;

    collection.map((item) => {
        collectionSum += item?.billPaid;
        if (item.modeOfPayment === 'cash') { cashPayment += item.billPaid }
        else { onlinePayment += item.billPaid }
    });
    collection.map((item) => {
        if (item?.dueBalance >= 0) balanceSum += item?.dueBalance
        else { advanceSum += item?.dueBalance }
    });
    const hrArray = employees.filter((employee) => employee?.role === 'hr' && employee?.branch === location.location);
    const collectionEmployee = collection.filter((item) => item?.paymentCollectedBy?._id === employee && item?.date === todayDate);

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen w-full p-8'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl md:text-4xl'>{collectionType.toUpperCase()} {(collectionType === 'repeat' || collectionType === 'courier') && 'MEDICINE'} {(location.location).toUpperCase()}</h1>
                <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                    <button onClick={() => { setCollectionType('Collections'); setEmployee() }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>All Collections</button>
                    <button onClick={() => { setCollectionType('general'); setEmployee('All') }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>General Collections</button>
                    <button onClick={() => { setCollectionType('repeat'); setEmployee('All') }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Repeat Medicine Collections</button>
                    <button onClick={() => { setCollectionType('courier');; setEmployee('All') }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Courier Medicine Collections</button>
                </div>
                {collectionType === 'Collections' && <div>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] text-white">
                                <tr>
                                    <th className="px-2 py-4 ">AMOUNT COLLECTED TODAY</th>
                                    <th className="px-2 py-4 ">CASH PAYMENT</th>
                                    <th className="px-4 py-4 ">ONLINE PAYMENT</th>
                                    <th className="px-2 py-4 ">BALANCE(DUES TODAY)</th>
                                    <th className="px-2 py-4 ">ADVANCE (TODAY)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-blue-200'>
                                    <td className="px-2 py-4 text-center">{collectionSum}</td>
                                    <td className="px-2 py-4 text-center">{cashPayment}</td>
                                    <td className="px-2 py-4 text-center">{onlinePayment}</td>
                                    <td className="px-2 py-4 text-center">{balanceSum}</td>
                                    <td className="px-2 py-4 text-center">{advanceSum}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h1 className='p-4 text-center mt-10 font-semibold text-[#337ab7] text-lg sm:text-xl md:text-3xl'>Collections Details</h1>
                    <div className='flex flex-col gap-2'>
                        <h1>Select Payment Collected by :  </h1>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <CiUser className="size-4 text-blue-500" />
                            </div>
                            <select onChange={(e) => setEmployee(e.target.value)} name="patient" required id="patient" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="" disabled selected className='font-normal' >Select Here</option>
                                <option value="All">All</option>
                                {hrArray.map((hr, index) =>
                                    <option key={index} value={hr?._id}>{hr?.fullname} - {hr?.username}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-8'>
                        <p className='text-lg'>Total Amount Collected: Rs {employee === 'All' ? collectionSum : collectionEmployee.reduce((sum, item) => sum + item?.billPaid, 0)}</p>
                        <p className='text-lg'>Total Cash: Rs {employee === 'All' ? cashPayment : collectionEmployee.filter((item) => item?.modeOfPayment === 'cash').reduce((sum, item) => sum + item?.billPaid, 0)}</p>
                        <p className='text-lg'>Total Online: Rs {employee === 'All' ? onlinePayment : collectionEmployee.filter((item) => item?.modeOfPayment === 'online').reduce((sum, item) => sum + item?.billPaid, 0)}</p>
                        <p className='text-lg'>Total Balance Rs {employee === 'All' ? balanceSum : collectionEmployee.filter((item) => item?.dueBalance >= 0).reduce((sum, item) => sum + item?.dueBalance, 0)}</p>
                        <p className='text-lg'>Total Advance Rs {employee === 'All' ? advanceSum : -1 * (collectionEmployee.filter((item) => item?.dueBalance < 0).reduce((sum, item) => sum + item?.dueBalance, 0))}</p>
                    </div>
                </div>}
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7] whitespace-nowrap text-sm text-white">
                            <tr>
                                <th className="px-1 py-4 ">Case Paper No.</th>
                                <th className="px-1 py-4 ">Name</th>
                                <th className="px-1 py-4 ">Total Amount</th>
                                <th className="px-1 py-4 ">Amount Paid</th>
                                <th className="px-1 py-4 ">Cash</th>
                                <th className="px-1 py-4 ">Online</th>
                                <th className="px-1 py-4 ">Type</th>
                                <th className="px-1 py-4 ">Balance(Dues Today)</th>
                                <th className="px-1 py-4 ">Payment Collected By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collection.filter((item) => ((item?.paymentCollectedBy?._id === employee || employee === 'All') && item?.date === todayDate && (item?.appointmentType === collectionType || collectionType === 'Collections'))).map((item, index) => {
                                    return <tr key={index} className='bg-blue-200'>
                                        <td className='px-1 text-center py-2'>{item?.patient?.casePaperNo}</td>
                                        <td className='px-1 text-center py-2'>{item?.patient?.fullname}</td>
                                        <td className='px-1 text-center py-2'>{item?.totalBill}</td>
                                        <td className='px-1 text-center py-2'>{item?.billPaid}</td>
                                        <td className='px-1 text-center py-2'>{item?.modeOfPayment === 'cash' && 'Cash'}</td>
                                        <td className='px-1 text-center py-2'>{item?.modeOfPayment === 'online' && 'Online'}</td>
                                        <td className='px-1 text-center py-2'>{item?.appointmentType}</td>
                                        <td className='px-1 text-center py-2'>{item?.dueBalance}</td>
                                        <td className='px-1 text-center py-2'>{item?.paymentCollectedBy?.fullname} - {item?.paymentCollectedBy?.username}</td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TodayCollection