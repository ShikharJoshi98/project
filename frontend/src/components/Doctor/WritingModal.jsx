import { X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import ReactDOM from "react-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { list: "-1" },
            { list: "+1" },
        ],
        ["image", "link", "video"]
    ]
}

const WritingModal = ({ onClose }) => {

    const [value, setValue] = useState('');
    const quillRef = useRef(null); // Create a ref for the editor

    const getPlainText = () => {
        const editor = quillRef.current?.getEditor(); // Get the Quill editor instance
        return editor ? editor.getText().trim() : ''; // Extract plain text and trim extra spaces
    };

    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                ><X size={24} /></button>
                <div className='flex flex-col gap-3 items-center'>
                    <div className="bg-white border-none sm:w-[60vw] md:w-[80vw] h-[60vh] rounded-lg mx-auto mt-5">
                        <ReactQuill
                            className="  sm:w-[60vw] md:w-[80vw] h-[53vh] border-none"
                            theme="snow"
                            value={value}
                            onChange={(content) => setValue(content)}
                            modules={modules}
                        />
                    </div>
                    <button onClick={() => console.log(getPlainText())} className='bg-green-500 text-white rounded-md font-semibold text-lg cursor-pointer p-2 w-fit'>Save</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default WritingModal