import Input from "./Input"
import { useState } from "react"
import axios from "axios";
import { HR_API_URL, useStore } from "../store/UpdateStore";
import { recStore } from "../store/RecStore";
import { DOC_API_URL } from "../store/DocStore";
import { GoPackage } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const StockIssueModal = ({ item, onClose }) => {
    const [issue, setIssue] = useState(0);
    const { toggleStockUpdate } = recStore();
    const { medicalStockToggleSubmit } = useStore();
    const ApproveStock = async (id) => {
        try {
            if(item?.typeOfStock==='Item')
            {await axios.patch(`${DOC_API_URL}/approveStock/${id}`,
                {
                    approval_flag_new: false,
                    approval_flag_issue: true,
                    approval_flag_receive: false
                }
            )
                setSubmit(prev => !prev);
            }
            else {
                await axios.patch(`${DOC_API_URL}/approveMedicalStock/${id}`,
                {
                    approval_flag_new: false,
                    approval_flag_issue: true,
                    approval_flag_receive: false
                }
            )
                setSubmit(prev => !prev);
            }

        } catch (error) {
            console.log(error.message);
        }
    }
    const handleSumbit = async (e) => {
        try {
            if (item?.typeOfStock === 'Item') {
                e.preventDefault();
                await axios.patch(`${HR_API_URL}/update-stock/${item?._id}`, { docApproval_flag: false, quantity: parseInt(item.quantity), issue_quantity: parseInt(issue), approval_flag_receive: false,approval_flag_new:false });
                ApproveStock(item?._id);
                toggleStockUpdate();
                setIssue(0);
            }
            else {
                e.preventDefault();
                await axios.patch(`${HR_API_URL}/update-medical-stock/${item?._id}`, { docApproval_flag: false, quantity: parseInt(item.quantity), issue_quantity: parseInt(issue), approval_flag_receive: false,approval_flag_new:false });
                ApproveStock(item?._id);
                medicalStockToggleSubmit();
                setIssue(0);
            }
        
            onClose();
    } catch (error) {
        console.log(error);
    }
}

return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-[#e9ecef] min-h-[50vh] max-w-[40vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-6 shadow-lg">
            <button
                onClick={onClose}
                className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
            >
                <RxCross2 size={24} />
            </button>
            <h1 className="text-blue-500 text-2xl md:text-3xl mb-10 text-center font-semibold">
                ISSUE {item?.itemName}
            </h1>
            <form onSubmit={handleSumbit} className="mx-auto">
                <div className='flex flex-col gap-2 '>
                    <h1>Issue quantity:</h1>
                    <Input icon={GoPackage} value={issue} onChange={(e) => setIssue(e.target.value)} type='number' required />
                </div>
                <button className='cursor-pointer block mx-auto bg-blue-400 text-lg  font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full'>Issue</button>
            </form>
        </div>
    </div>
)
}

export default StockIssueModal