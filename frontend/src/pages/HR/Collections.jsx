import { useEffect, useState } from 'react'
import { useStore } from '../../store/UpdateStore'
import { useAuthStore } from '../../store/authStore'
import { recStore } from '../../store/RecStore';
import { docStore } from '../../store/DocStore';
import { LuLoaderCircle } from 'react-icons/lu';

const Collections = () => {
    const { getCollection, collection } = useStore();
    const { getClinicDetails, clinicDetails } = docStore();
    const { user } = useAuthStore();
    const { isShift, shiftToggle, getShift } = recStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getClinicDetails();
    }, []);

    useEffect(() => {
        if (user?._id && user?.role) {
            getShift(user.role, user._id);
        }
    }, [user]);

    useEffect(() => {
        if (user?.branch) {
            const timeout = setTimeout(() => setLoading(true), 200);

            getCollection(user.branch, isShift?.shift)
                .finally(() => {
                    clearTimeout(timeout);
                    setLoading(false);
                });
        }
    }, [user?.branch, isShift?.shift]);
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
    const clinic = clinicDetails?.filter((detail, _) => detail?.branch === location.location)

    return (
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
            <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{user?.branch} - Collections</h1>
                {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
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
                </div>}
                <h1 className='p-4 text-center mt-10 font-semibold text-[#337ab7] text-lg sm:text-xl md:text-3xl'>Details</h1>
                {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7] whitespace-nowrap text-sm text-white">
                            <tr >
                                <th className="px-1 py-4 ">Case Paper No.</th>
                                <th className="px-1 py-4 ">Name</th>
                                <th className="px-1 py-4 ">Total Amount</th>
                                <th className="px-1 py-4 ">Amount Paid</th>
                                <th className="px-1 py-4 ">Cash</th>
                                <th className="px-1 py-4 ">Online</th>
                                <th className="px-1 py-4 ">Transaction Details</th>
                                <th className="px-1 py-4 ">Status</th>
                                <th className="px-1 py-4 ">Type</th>
                                <th className="px-1 py-4 ">Balance(Dues Today)</th>
                                <th className="px-1 py-4 ">Payment Collected By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collection.map((item, index) => {

                                    return <tr key={index} className='bg-blue-200'>
                                        <td className='px-1 text-center py-2'>{item?.patient?.casePaperNo}</td>
                                        <td className='px-1 text-center py-2'>{item?.patient?.fullname}</td>
                                        <td className='px-1 text-center py-2'>{item?.totalBill}</td>
                                        <td className='px-1 text-center py-2'>{item?.billPaid}</td>
                                        <td className='px-1 text-center py-2'>{item?.modeOfPayment === 'cash' && 'Cash'}</td>
                                        <td className='px-1 text-center py-2'>{item?.modeOfPayment === 'online' && 'Online'}</td>
                                        <td className='px-1 text-center py-2'>{item?.transactionDetails}</td>
                                        <td className='px-1 text-center py-2'>{item?.balance_paid_flag === true ? 'Paid Balance today' : '-'}</td>
                                        <td className='px-1 text-center py-2'>{item?.appointmentType}</td>
                                        <td className={`px-1 text-center py-2 ${item?.dueBalance < 0 ? 'text-green-600' : 'text-red-600'}`}>Rs {Math.abs(item?.dueBalance)} {item?.dueBalance < 0 ? 'Advance' : 'Balance'}</td>
                                        <td className='px-1 text-center py-2'>{item?.paymentCollectedBy?.fullname} - {item?.paymentCollectedBy?.username}</td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default Collections