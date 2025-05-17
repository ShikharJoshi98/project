import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DOC_API_URL } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const WritingModal = ({ writeUpType,onClose }) => {
    const location = useParams();
    const [value, setValue] = useState("");
    console.log(writeUpType);
    const handleSave = async () => {
        if (writeUpType === 'present complaints') {
            const response  = await axios.post(`${DOC_API_URL}/add-presentComplaintWriteUp/${location.id}`,{
            value
        });
        setValue("");
        }
        else if(writeUpType==='follow up'){
        const response  = await axios.post(`${DOC_API_URL}/add-write-up-patient/${location.id}`,{
            value
        });
        setValue("");}
    }

    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl  text-center font-semibold">
                    Writing Pad
                </h1>
                <div className="flex flex-col gap-3 items-center">
                    <textarea name="Writing Pad" placeholder="Write ..." onChange={(e)=>setValue(e.target.value)} className="bg-white border sm:w-[60vw] md:w-[80vw] h-[60vh] rounded-lg p-3 mx-auto mt-5"></textarea>
                    <button onClick={() => handleSave()} className="bg-green-500 text-white rounded-md font-semibold text-lg cursor-pointer p-2 w-fit">Save</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default WritingModal;
