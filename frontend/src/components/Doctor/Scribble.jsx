import axios from 'axios';
import { Eraser, Pen, Redo, Trash, Undo } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { DOC_API_URL } from '../../store/DocStore';
import { useParams } from 'react-router-dom';

const Scribble = ({ complaint }) => {
    const canvasRef = useRef(null);
    const { id } = useParams();
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(4);
    useEffect(() => {
        const wrapper = document.getElementById("canvas-wrapper");
        const handlePointerDown = (e) => {
            if (e.pointerType === "touch") {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        wrapper?.addEventListener("pointerdown", handlePointerDown, { passive: false });

        return () => {
            wrapper?.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    const handleToolChange = (mode) => {
        setEraseMode(mode === "erase");
        canvasRef.current?.eraseMode(mode === "erase");
    };

    const handleCanvasAction = (action) => {
        switch (action) {
            case "undo":
                canvasRef.current?.undo();
                break;
            case "redo":
                canvasRef.current?.redo();
                break;
            case "clear":
                canvasRef.current?.clearCanvas();
                break;
            case "save":
                handleSaveClick();
                break;
            default:
                break;
        }
    };
    const handleSave = async () => {
        switch (complaint) {
            case 'Mental Causative Factor':
                const mentalCausativeData = await canvasRef.current.exportImage("png");
                await axios.post(`${DOC_API_URL}/add-mentalCausative-scribble/${id}`, { savedImage: mentalCausativeData });
                canvasRef.current?.clearCanvas();
                window.scrollTo(0, 0);

                break;
            case 'Chief Complaints':
                const chiefComplaintData = await canvasRef.current.exportImage("png");
                await axios.post(
                    `${DOC_API_URL}/add-chiefComplaint-scribble/${id}`, { savedImage: chiefComplaintData });
                canvasRef.current?.clearCanvas();
                window.scrollTo(0, 0);

                break;
            case 'Personal History':
                const personalHistoryData = await canvasRef.current.exportImage("png");
                await axios.post(`${DOC_API_URL}/add-personalHistory-scribble/${id}`, { savedImage: personalHistoryData });
                canvasRef.current?.clearCanvas();
                window.scrollTo(0, 0);

                break;
            case 'Mental Personality Character':
                const mentalPersonalityData = await canvasRef.current.exportImage("png");
                await axios.post(`${DOC_API_URL}/add-mentalPersonality-scribble/${id}`, { savedImage: mentalPersonalityData });
                canvasRef.current?.clearCanvas();
                window.scrollTo(0, 0);

                break;
            case 'Brief Mind Symptoms':
                const briefMindSymptomData = await canvasRef.current.exportImage("png");
                await axios.post(`${DOC_API_URL}/add-briefMindSymptom-scribble/${id}`, { savedImage: briefMindSymptomData });
                canvasRef.current?.clearCanvas();
                window.scrollTo(0, 0);

                break;
        }
    }
    return (

        <div className="bg-[rgb(248,249,250)] rounded-xl  ">
            <div className='mx-auto shadow-lg p-2 flex gap-2 w-full max-w-[95vw] lg:max-w-[85vw]'>
                <div id="canvas-wrapper" style={{ touchAction: "none", pointerEvents: "auto" }} className="flex-1">
                    <ReactSketchCanvas
                        ref={canvasRef}
                        width="100%"
                        height="1073px"
                        strokeColor="black"
                        canvasColor="white"
                        strokeWidth={strokeWidth}
                        eraserWidth={20}
                        className="!rounded-md !border-2 !border-blue-400"
                    />
                </div>

                <div className="flex flex-col items-center justify-start gap-4 p-2">
                    <button
                        title="Pen"
                        onClick={() => handleToolChange("pen")}
                        disabled={!eraseMode}
                        className={`p-3 rounded-lg border-2 bg-gray-200 shadow-md transition ${eraseMode
                            ? "text-black border-blue-400"
                            : "text-gray-400 border-gray-300"
                            }`}
                    >
                        <Pen size={16} />
                    </button>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-center">Stroke</span>
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
                        <Eraser size={16} />
                    </button>

                    <hr className="w-8 border-blue-400 border-t-2 my-4" />

                    <button
                        title="Undo"
                        onClick={() => handleCanvasAction("undo")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <Undo size={16} />
                    </button>

                    <button
                        title="Redo"
                        onClick={() => handleCanvasAction("redo")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <Redo size={16} />
                    </button>

                    <button
                        title="Clear"
                        onClick={() => handleCanvasAction("clear")}
                        className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
                    >
                        <Trash size={16} />
                    </button>

                </div>
            </div>
            <button onClick={() => handleSave()} className='bg-green-500 block mx-auto my-4 p-2 text-xl rounded-md text-white'>Save</button>
        </div>
    )
}

export default Scribble