import { useStore } from "../../store/UpdateStore";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const BillModal = ({ onClose, orderId, amount, type }) => {
    const { getBillImages, billImages } = useStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true);
        }, 200);
        getBillImages(orderId).finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        });
    }, [getBillImages]);

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h3 className="font-semibold text-center text-base md:text-2xl" >Bill Details</h3>
                <p className="my-5">Bill Amount: {amount}</p>
                {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' /> : billImages.length > 0 ?
                    billImages.map((image, index) => (
                        <div key={index} className="mx-auto mt-10">
                            <img src={image?.imageUrl} alt="Bill Image" className="w-full mb-5" />
                        </div>
                    )) : <p className="text-blue-500 text-xl text-center">No Bill Uploaded</p>
                }
            </div>
        </div>
    )
}

export default BillModal