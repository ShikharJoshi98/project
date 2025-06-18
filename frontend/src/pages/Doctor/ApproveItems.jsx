import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { SearchIcon } from 'lucide-react';
import OrderItemBalanceModal from '../../components/Doctor/OrderItemBalanceModal';
import OrderItemHistoryModal from '../../components/Doctor/OrderItemHistoryModal';
import axios from 'axios';
import { HR_API_URL } from '../../store/UpdateStore';
import { DOC_API_URL } from '../../store/DocStore';


const ApproveItems = () => {
    const location = useParams();
    const [isOrderItemModalOpen, setOrderItemModalIsOpen] = useState(false);
    const [isOrderItemHistoryModalOpen, setOrderItemHistoryModalIsOpen] = useState(false);
    const [itemStock, setItemStock] = useState([]);
    const [submit, setSubmit] = useState(false);
 const getItemStock = async () => {
        const response = await axios.get(`${HR_API_URL}/get-item-stock`);
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
    const ApproveStock = async (id) => {
        try {
            await axios.patch(`${DOC_API_URL}/approveStock/${id}`,
                {docApproval_flag:true}
            )
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        } 
    }
    useEffect(() => {
            try {
                getItemStock();
            } catch (error) {
                console.log("Error in fetch API hr getItemStock", error.message);
            }
        }, [getItemStock,submit]);
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Items Stock {location.location}</h1>
                        <div className='sm:flex grid grid-cols-1 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9  md:text-lg'>
                            <button onClick={()=>setOrderItemModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Order History</button>
                            <button onClick={()=>setOrderItemHistoryModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Order Balances</button>
                        </div>
                        <h1 className='text-xl font-semibold mt-10'>Item : </h1>
                        <div className='flex items-center gap-2 mt-2'>
                            <Input icon={SearchIcon} placeholder='Search for Items here' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">Count</th>
                                        <th className="px-2 py-4 ">Item</th>
                                        <th className="px-2 py-4 ">Quantity in Store</th>
                                        <th className="px-2 py-4 ">Reorder Level</th>
                                        <th className="px-2 py-4 ">Last Updated</th>
                                        <th className="px-2 py-4 ">Issued Quantity</th>
                                        <th className="px-2 py-4 ">Received Quantity</th>
                                        <th className="px-2 py-4 ">Approval</th>
                                        <th className="px-2 py-4 ">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        itemStock?.map((item, index) => (
                                            <tr className='bg-blue-200'>
                                                <td className="px-1 py-2 text-center">{index + 1}</td>
                                                <td className="px-1 py-2 text-center ">{item?.itemName}</td>
                                                <td className="px-1 py-2 text-center ">{<span>{item?.quantity} {item?.unit}</span>}</td>
                                                <td className="px-1 py-2 text-center ">{<span>{item?.reorder_level}</span>}</td>
                                                <td className="px-1 py-2 text-center ">{timeStamp(item?.last_updated)}</td>
                                                <td className="px-1 py-2 text-center ">{item?.issue_quantity}</td>
                                                <td className="px-1 py-2 text-center ">{item?.approval_flag_new === false ? item?.receive_quantity : 0}</td>
                                                <td className="px-1 py-2 text-center "> {item?.docApproval_flag === false ? <button onClick={()=>ApproveStock(item?._id)} className='px-2 rounded-md py-0.5 cursor-pointer bg-green-500 text-white'>Click to Approve</button> : <span className='border-2 px-2 rounded-md py-0.5 text-blue-500'>APPROVED</span>}</td>
                                                <td className="px-1 py-2 text-center ">{item?.approval_flag_new ? "NEW ITEM" : "ITEM ISSUED"}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isOrderItemModalOpen && <OrderItemHistoryModal location={location.location} onClose={() => setOrderItemModalIsOpen(false)} />}
            {isOrderItemHistoryModalOpen && <OrderItemBalanceModal location={location.location} onClose={() => setOrderItemHistoryModalIsOpen(false)} />}
        </div>
    )
}

export default ApproveItems