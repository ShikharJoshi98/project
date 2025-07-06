import { useEffect, useState } from 'react'
import AddItemModal from '../../components/HR/AddItemModal';
import VendorModal from '../../components/HR/VendorModal';
import AddItemStockModal from '../../components/HR/AddItemStockModal';
import OrderModal from '../../components/HR/OrderModal';
import axios from 'axios';
import { HR_API_URL } from '../../store/UpdateStore';
import ReorderLevelModal from '../../components/ReorderLevelModal';
import StockIssueModal from '../../components/StockIssueModal';
import { recStore } from '../../store/RecStore';
import Input from '../../components/Input';
import { SearchIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import HRnavbar from '../../components/HR/HRnavbar';
import HRSidebar from '../../components/HR/HRSidebar';

const ItemStock = () => {
    const [isItemModalOpen, setItemModalIsOpen] = useState(false);
    const { user } = useAuthStore();
    const { stockToggle, toggleStockUpdate } = recStore();
    const [isVendorModalOpen, setVendorModalIsOpen] = useState(false);
    const [isAddStockModalOpen, setAddStockModalIsOpen] = useState(false);
    const [isOrderModalOpen, setOrderModalIsOpen] = useState(false);
    const [itemStock, setItemStock] = useState([]);
    const [openReorderModal, setOpenReorderModal] = useState(false);
    const [issueModal, setissueModal] = useState(false);
    const [itemSelect, setItemSelect] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const getItemStock = async () => {
        const response = await axios.get(`${HR_API_URL}/get-item-stock/${user?.branch}`);
        setItemStock(response.data.itemStock);
    };

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
    useEffect(() => {
        try {
            getItemStock();

        } catch (error) {
            console.log("Error in fetch API hr getItemStock", error.message);
        }
    }, [isAddStockModalOpen, stockToggle]);

    const itemsList = itemStock.filter((item) => item?.itemName.toLowerCase().includes(searchTerm.toLowerCase()) && item?.branch===user?.branch);

    return (
        <div>
            <HRnavbar />
            <div className="flex">
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Items Stock {user?.branch}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-10 justify-center items-center md:gap-20 text-[6px] sm:text-[8px] md:text-base'>
                            <button onClick={() => setItemModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD ITEMS/UNIT LIST</button>
                            <button onClick={() => setVendorModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>VENDORS</button>
                            <button onClick={() => setAddStockModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD STOCK</button>
                            <button onClick={() => setOrderModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>PLACE ORDER</button>
                        </div>
                        <div className='flex items-center justify-center gap-2 mt-10'>
                            <Input onChange={(e)=>setSearchTerm(e.target.value)} icon={SearchIcon} placeholder='Search for Items Here' />
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] text-sm text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Count</th>
                                        <th className="px-1 py-2 ">Item</th>
                                        <th className="px-1 py-2 ">Quantity in store</th>
                                        <th className="px-1 py-2 ">Reorder level</th>
                                        <th className="px-1 py-2 ">Last updated</th>
                                        <th className="px-1 py-2 ">Issued quantity</th>
                                        <th className="px-1 py-2 ">Received quantity</th>
                                        <th className="px-1 py-2 ">Approval</th>
                                        <th className="px-1 py-2 ">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-black'>
                                    {
                                        itemsList?.map((item, index) => (

                                            <tr className={`${item.docApproval_flag === false ? 'bg-red-200' : 'bg-blue-200'}`}>
                                                <td className="px-1 py-2 text-center">{index + 1}</td>
                                                <td className="px-1 py-2 text-center ">{item?.itemName}</td>
                                                <td className="px-1 py-2 text-center ">{item?.docApproval_flag === false ? <span>{item?.quantity} {item?.unit}</span> : <span onClick={() => { setissueModal(true); setItemSelect(item) }} className='bg-white px-2 py-0.5 rounded-md'>{item?.quantity} {item?.unit}</span>}</td>
                                                <td className="px-1 py-2 text-center ">{item?.docApproval_flag === false ? <span>{item?.reorder_level}</span> : <span onClick={() => { setOpenReorderModal(true); setItemSelect(item) }} className='bg-white px-2 py-0.5 rounded-md'>{item?.reorder_level}</span>}</td>
                                                <td className="px-1 py-2 text-center ">{timeStamp(item?.last_updated)}</td>
                                                <td className="px-1 py-2 text-center ">{item?.issue_quantity}</td>
                                                <td className="px-1 py-2 text-center ">{item?.approval_flag_receive===true?item?.receive_quantity:item?.approval_flag_new === true ? item?.receive_quantity : 0}</td>
                                                <td className="px-1 py-2 text-center "> {item?.docApproval_flag === false ? <span className='border-2 px-2 rounded-md py-0.5 text-red-500'>PENDING</span> : <span className='border-2 px-2 rounded-md py-0.5 text-blue-500'>APPROVED</span>}</td>
                                                <td className="px-1 py-2 text-center ">{item?.approval_flag_receive===true?"ITEM RECEIVED(ORDER)":item?.approval_flag_issue===true?"ITEM ISSUED":item?.approval_flag_new ? "NEW ITEM" : "NEW ITEM ADDED"}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isItemModalOpen && <AddItemModal onClose={() => setItemModalIsOpen(false)} />}
            {isVendorModalOpen && <VendorModal onClose={() => setVendorModalIsOpen(false)} />}
            {isAddStockModalOpen && <AddItemStockModal onClose={() => setAddStockModalIsOpen(false)} />}
            {isOrderModalOpen && <OrderModal onClose={() => setOrderModalIsOpen(false)} />}
            {openReorderModal && <ReorderLevelModal item={itemSelect} onClose={() => setOpenReorderModal(false)} />}
            {issueModal && <StockIssueModal item={itemSelect} onClose={() => setissueModal(false)} />}
        </div>
    )
}

export default ItemStock
