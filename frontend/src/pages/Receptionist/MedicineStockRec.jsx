import { useEffect, useState } from 'react'
import AddMedicineModal from '../../components/HR/AddMedicineModal'
import AddMedicalStockModel from '../../components/HR/AddMedicalStockModel'
import VendorMedicalModal from '../../components/HR/VendorMedicalModal';
import OrderMedicalModal from '../../components/HR/OrderMedicalModal';
import { useStore } from '../../store/UpdateStore'
import { useAuthStore } from '../../store/authStore'
import ReorderLevelModal from '../../components/ReorderLevelModal'
import StockIssueModal from '../../components/StockIssueModal'
import { LuLoaderCircle } from 'react-icons/lu';

const MedicineStockRec = () => {
    const [isMedicineModalOpen, setMedicineModalIsOpen] = useState(false);
    const [isVendorModalOpen, setVendorModalIsOpen] = useState(false);
    const [isAddStockModalOpen, setAddStockModalIsOpen] = useState(false);
    const [isOrderModalOpen, setOrderModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPotency, setSearchPotency] = useState('');
    const [issueModal, setissueModal] = useState(false);
    const [openReorderModal, setOpenReorderModal] = useState(false);
    const [medicineSelect, setMedicineSelect] = useState();
    const { getMedicine, medicines, potencys, getPotency, getMedicalStock, medicalStock, medicalStockToggle } = useStore();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMedicine();
        getPotency();
        const timeout = setTimeout(() => setLoading(true), 200);
        getMedicalStock(user?.branch).finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        });
    }, [getMedicine, getPotency, getMedicalStock, medicalStockToggle]);

    const timeStamp = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        };
        const formattedDate = date.toLocaleString("en-US", options);
        return formattedDate;
    }
    const filteredMedicalStock = medicalStock.filter((medicine) => {
        const matchesMedicine = searchTerm === '' || medicine?.medicineName === searchTerm;
        const matchesPotency = searchPotency === '' || medicine?.potency === searchPotency;
        return matchesMedicine && matchesPotency;
    });

    return (
        <>
            <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full p-8 overflow-hidden'>
                <div className='bg-[#e9ecef]  w-auto p-5 rounded-lg '>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Medicine Stock {user?.branch}</h1>
                    <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-10 justify-center items-center md:gap-20 text-[6px] sm:text-[8px] md:text-sm'>
                        <button onClick={() => setMedicineModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD MEDICINE/POTENCY LIST</button>
                        <button onClick={() => setVendorModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>VENDORS</button>
                        <button onClick={() => setAddStockModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD STOCK</button>
                        <button onClick={() => setOrderModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>PLACE ORDER</button>
                    </div>
                    <div className='flex flex-col gap-2 mt-10'>
                        <p>Search Medicine :</p>
                        <select
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            name="select medicine"
                            id="medicine-select"
                            className="py-2 rounded-lg w-full bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                        >
                            <option value="">Select Medicines</option>
                            {medicines.map((medicine, index) => (
                                <option key={index}>{medicine?.medicine}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 mt-5'>
                        <p>Search Potency :</p>
                        <select
                            value={searchPotency}
                            onChange={(e) => setSearchPotency(e.target.value)}
                            name="select potency"
                            id="potency-select"
                            className="py-2 rounded-lg w-full bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                        >
                            <option value="">Select Potencys</option>
                            {potencys.map((el, index) => (
                                <option key={index}>{el?.potency}</option>
                            ))}
                        </select>
                    </div>
                    {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] text-sm text-white">
                                <tr >
                                    <th className="px-1 py-2 ">Count</th>
                                    <th className="px-1 py-2 ">Medicine</th>
                                    <th className="px-1 py-2 ">Potency</th>
                                    <th className="px-1 py-2 ">Quantity in store</th>
                                    <th className="px-1 py-2 ">Reorder level</th>
                                    <th className="px-1 py-2 ">Last updated</th>
                                    <th className="px-1 py-2 ">Issued quantity</th>
                                    <th className="px-1 py-2 ">Received quantity</th>
                                    <th className="px-1 py-2 ">Approval</th>
                                    <th className="px-1 py-2 ">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredMedicalStock?.map((medicine, index) => (
                                        <tr key={index} className={`${medicine?.docApproval_flag === false ? 'bg-red-200' : 'bg-blue-200'}`}>
                                            <td className="px-1 py-2 text-center">{index + 1}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.medicineName}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.potency}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.docApproval_flag === false ? medicine?.quantity : <span onClick={() => { setissueModal(true); setMedicineSelect(medicine) }} className='bg-white px-2 py-0.5 rounded-md'> {medicine?.quantity}</span>}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.docApproval_flag === false ? <span>{medicine?.reorder_level}</span> : <span onClick={() => { setOpenReorderModal(true); setMedicineSelect(medicine) }} className='bg-white px-2 py-0.5 rounded-md'>{medicine?.reorder_level}</span>}</td>
                                            <td className="px-1 py-2 text-center ">{timeStamp(medicine?.last_updated)}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.issue_quantity}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.approval_flag_receive === true ? medicine?.receive_quantity : medicine?.approval_flag_new === true ? medicine?.receive_quantity : 0}</td>
                                            <td className="px-1 py-2 text-center "> {medicine?.docApproval_flag === false ? <span className='border-2 px-2 rounded-md py-0.5 text-red-500'>PENDING</span> : <span className='border-2 px-2 rounded-md py-0.5 text-blue-500'>APPROVED</span>}</td>
                                            <td className="px-1 py-2 text-center ">{medicine?.approval_flag_receive === true ? "ITEM RECEIVED(ORDER)" : medicine?.approval_flag_issue === true ? "ITEM ISSUED" : medicine?.approval_flag_new ? "NEW ITEM" : "NEW ITEM ADDED"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
            {isMedicineModalOpen && <AddMedicineModal onClose={() => setMedicineModalIsOpen(false)} />}
            {isVendorModalOpen && <VendorMedicalModal onClose={() => setVendorModalIsOpen(false)} />}
            {isAddStockModalOpen && <AddMedicalStockModel onClose={() => setAddStockModalIsOpen(false)} />}
            {isOrderModalOpen && <OrderMedicalModal onClose={() => setOrderModalIsOpen(false)} />}
            {openReorderModal && <ReorderLevelModal item={medicineSelect} onClose={() => setOpenReorderModal(false)} />}
            {issueModal && <StockIssueModal item={medicineSelect} onClose={() => setissueModal(false)} />}
        </>
    )
}

export default MedicineStockRec