import { Package, X } from "lucide-react"
import Input from "./Input"
import { useState } from "react"
import { recStore } from "../store/RecStore";
import axios from "axios";
import { HR_API_URL, useStore } from "../store/UpdateStore";

const ReorderLevelModal = ({ item, onClose }) => {
    const [reOrderLevel, setReOrderLevel] = useState(0);
    const { toggleStockUpdate } = recStore();
    const { medicalStockToggleSubmit } = useStore();
    const handleSubmit = async (e) => {
        if (item?.typeOfStock === 'Item') {
            e.preventDefault();
            await axios.patch(`${HR_API_URL}/update-stock/${item._id}`, { reorder_level: parseInt(reOrderLevel) });
            toggleStockUpdate();
            setReOrderLevel(0);
            onClose();
        }
        else {
            e.preventDefault();
            await axios.patch(`${HR_API_URL}/update-medical-stock/${item._id}`, { reorder_level: parseInt(reOrderLevel) });
            medicalStockToggleSubmit();
            setReOrderLevel(0);
            onClose();
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] min-h-[50vh] max-w-[30vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-10 text-center font-semibold">
                    Set Reorder Level
                </h1>
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className='flex flex-col gap-2 '>
                        <h1>Reorder Level</h1>
                        <Input icon={Package} onChange={(e) => setReOrderLevel(e.target.value)} value={reOrderLevel} type='number' required />
                    </div>
                    <button className='cursor-pointer block mx-auto bg-blue-400 text-lg  font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ReorderLevelModal