import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { DOC_API_URL } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { LuEraser, LuPen, LuRedo, LuTrash, LuUndo } from 'react-icons/lu';
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const Scribble = ({ complaint }) => {
    const { id } = useParams();
    const excalidrawAPI = useRef(null);

    const handleSave = async () => {
        if (!excalidrawAPI.current) return;

        const elements = excalidrawAPI.current.getSceneElements();
        const appState = excalidrawAPI.current.getAppState();

        const blob = await exportToBlob({
            elements,
            appState,
            mimeType: "image/png",
        });

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64String = reader.result;
            switch (complaint) {
                case 'Mental Causative Factor':
                    // const mentalCausativeData = await canvasRef.current.exportImage("png");
                    await axios.post(`${DOC_API_URL}/add-mentalCausative-scribble/${id}`, { savedImage: base64String });
                    // canvasRef.current?.clearCanvas();
                    // window.scrollTo(0, 0);
                    toast("Saved");
                    break;
                case 'Chief Complaints':
                    // const chiefComplaintData = await canvasRef.current.exportImage("png");
                    await axios.post(
                        `${DOC_API_URL}/add-chiefComplaint-scribble/${id}`, { savedImage: base64String });
                    // canvasRef.current?.clearCanvas();
                    // window.scrollTo(0, 0);
                    toast("Saved");
                    break;
                case 'Personal History':
                    // const personalHistoryData = await canvasRef.current.exportImage("png");
                    await axios.post(`${DOC_API_URL}/add-personalHistory-scribble/${id}`, { savedImage: base64String });
                    // canvasRef.current?.clearCanvas();
                    // window.scrollTo(0, 0);
                    toast("Saved");
                    break;
                case 'Mental Personality Character':
                    // const mentalPersonalityData = await canvasRef.current.exportImage("png");
                    await axios.post(`${DOC_API_URL}/add-mentalPersonality-scribble/${id}`, { savedImage: base64String });
                    // canvasRef.current?.clearCanvas();
                    // window.scrollTo(0, 0);
                    toast("Saved");
                    break;
                case 'Brief Mind Symptoms':
                    // const briefMindSymptomData = await canvasRef.current.exportImage("png");
                    await axios.post(`${DOC_API_URL}/add-briefMindSymptom-scribble/${id}`, { savedImage: base64String });
                    // canvasRef.current?.clearCanvas();
                    // window.scrollTo(0, 0);
                    toast("Saved");
                    break;
            }
        }
    }

    return (
        <div className="bg-[rgb(248,249,250)] rounded-xl">
            <ToastContainer toastClassName="my_toast" position='bottom-right' />
            <div className="h-screen flex flex-col">
                <ToastContainer toastClassName="my_toast" position='bottom-right' />
                <div className="flex-1 border">
                    <Excalidraw
                        excalidrawAPI={(api) => {
                            excalidrawAPI.current = api;
                        }}
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="m-2 p-2 bg-blue-500 text-white rounded"
                >
                    Save
                </button>
            </div>
            {/* <div className='mx-auto shadow-lg p-2 flex gap-2 w-full max-w-[95vw] lg:max-w-[85vw]'>
                <div id="canvas-wrapper" style={{ touchAction: "none", pointerEvents: "auto" }} className="flex-1">
                    <ReactSketchCanvas ref={canvasRef} width="100%" height="1073px" strokeColor="black" canvasColor="white" strokeWidth={strokeWidth} eraserWidth={20} className="!rounded-md !border-2 !border-blue-400" />
                </div>
                <div className="flex flex-col items-center justify-start gap-4 p-2">
                    <button title="Pen" onClick={() => handleToolChange("pen")} disabled={!eraseMode} className={`p-3 rounded-lg border-2 bg-gray-200 shadow-md transition ${eraseMode ? "text-black border-blue-400" : "text-gray-400 border-gray-300"}`}>
                        <LuPen size={16} />
                    </button>
                    <div className="flex flex-col items-center gap-1">
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(Number(e.target.value))}
                            className="w-20"
                            title="Adjust Stroke Width"
                        />
                        <span className="text-xs">{strokeWidth}px</span>
                    </div>

                    <button
                        title="Eraser"
                        onClick={() => handleToolChange("erase")}
                        disabled={eraseMode}
                        className={`p-3 rounded-lg border-2 bg-gray-200 shadow-md transition ${!eraseMode
                            ? "text-black border-blue-400"
                            : "text-gray-400 border-gray-300"
                            }`}
                    >
                        <LuEraser size={16} />
                    </button>

                    <hr className="w-8 border-blue-400 border-t-2 my-4" />

                    <button
                        title="Undo"
                        onClick={() => handleCanvasAction("undo")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <LuUndo size={16} />
                    </button>

                    <button
                        title="Redo"
                        onClick={() => handleCanvasAction("redo")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <LuRedo size={16} />
                    </button>

                    <button
                        title="Clear"
                        onClick={() => handleCanvasAction("clear")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <LuTrash size={16} />
                    </button>

                </div >
            </div >
    <button onClick={() => handleSave()} className='bg-green-500 block mx-auto my-4 p-2 text-xl rounded-md text-white'>Save</button> */}
        </div >
    )
}

export default Scribble