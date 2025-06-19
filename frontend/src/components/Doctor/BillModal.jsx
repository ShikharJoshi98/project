import { X } from "lucide-react"
import { useStore } from "../../store/UpdateStore";
import { useEffect } from "react";

const BillModal = ({ onClose, orderId }) => {
    const { getBillImages, billImages } = useStore();
    useEffect(() => {
        getBillImages(orderId)
    }, [getBillImages]);
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><X size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Bills</h1>
                {
                    billImages.map((image, index) => (
                        <div className="mx-auto">
                            <img src={image?.imageUrl} alt="Bill Image" key={index} className="w-full mb-5" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BillModal