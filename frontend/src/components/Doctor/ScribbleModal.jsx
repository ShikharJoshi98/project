import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Eraser, Pen, Redo, SaveIcon, Trash, Undo, X } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { DOC_API_URL } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const ScribbleModal = ({ onClose }) => {

    const location = useParams();
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    

    const handlePenClick = () => {
        setEraseMode(false);
        console.log(location.id)
        canvasRef.current?.eraseMode(false);
    }

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    }

    const handleUndoClick = () => {
        canvasRef.current?.undo();
    }

    const handleRedoClick = () => {
        canvasRef.current?.redo();
    }

    const handleClearClick = () => {
        canvasRef.current?.clearCanvas();
    }

    const handleSaveClick = async () => {
        if (canvasRef.current) {
            try {
                const imageData = await canvasRef.current.exportImage("png"); 
                const response = await axios.post(`${DOC_API_URL}/add-follow-up-patient/${location.id}`,{
                    savedImage : imageData
                });
                console.log(response.data)
                alert("Saved Successfully.Continue Writing...")
                canvasRef.current?.clearCanvas();
            } catch (error) {
                console.error("Error saving image:", error);
            }
        }
    };

    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-5">
            <div className="bg-[#e9ecef] z-[10000] max-h-[100vh] max-w-[100vw]  flex items-start gap-2 w-full rounded-xl p-2 md:p-2 shadow-lg">
                <ReactSketchCanvas width="95%" height="573px" ref={canvasRef} eraserWidth={20} strokeColor='black' canvasColor="white" className="!rounded-md !border-2 !border-blue-400" />
                <div className="flex flex-col items-center ">
                    <button onClick={onClose} className="cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1 mb-10"><X size={24} /></button>
                    <div className="flex flex-col items-center gap-4">
                        <button type="button" title="Pencil" disabled={!eraseMode} className={`${eraseMode ? 'text-gray-400 ' : 'border-blue-400 text-black'} border-2 rounded-lg transition-all duration-300  p-3 bg-gray-200 shadow-md cursor-pointer`} onClick={handlePenClick}><Pen size={16} /></button>
                        <button type="button" title="Eraser" disabled={eraseMode} className={`${!eraseMode ? 'text-gray-400 ' : 'text-black border-blue-400'} border-2 rounded-lg transition-all duration-300 p-3 bg-gray-200 shadow-md cursor-pointer`} onClick={handleEraserClick}><Eraser size={16} /></button>
                        <hr className="bg-blue-400 h-0.5 border-none w-8 my-5" />
                        <button type="button" title="Undo" className='border-2 border-blue-400 rounded-lg transition-all duration-300  p-3 bg-gray-200 shadow-md cursor-pointer' onClick={handleUndoClick} ><Undo size={16} /></button>
                        <button type="button" title="Redo" variant='outline' className='border-2 border-blue-400 rounded-lg transition-all duration-300  p-3 bg-gray-200 shadow-md cursor-pointer' onClick={handleRedoClick} ><Redo size={16} /></button>
                        <button type="button" title="Clear" variant='outline' className='border-2 border-blue-400 rounded-lg transition-all duration-300  p-3 bg-gray-200 shadow-md cursor-pointer' onClick={handleClearClick} ><Trash size={16} /></button>
                        <button type="button" title="Save" variant='outline' className='border-2 border-blue-400 rounded-lg transition-all duration-300  p-3 bg-gray-200 shadow-md cursor-pointer' onClick={handleSaveClick} ><SaveIcon size={16} /></button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default ScribbleModal;
