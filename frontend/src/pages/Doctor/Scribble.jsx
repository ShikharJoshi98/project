import { useRef, useState, useEffect } from "react"; // 👈 ADDED useEffect
import ReactDOM from "react-dom";
import { Eraser, Pen, Redo, Trash, Undo } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { DOC_API_URL } from "../../store/DocStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";

const Scribble = () => {
    const { id, scribbleType } = useParams();
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(4);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const navigate = useNavigate();
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

    const handleSaveClick = async () => {
        try {
            if (scribbleType === 'follow-up') {
                const imageData = await canvasRef.current.exportImage("png");
                const response = await axios.post(
                    `${DOC_API_URL}/add-follow-up-patient/${id}`,
                    { savedImage: imageData }
                );
                window.scrollTo(0, 0);

            }
            else if (scribbleType === 'present-complaints') {
                const imageData = await canvasRef.current.exportImage("png");
                const response = await axios.post(
                    `${DOC_API_URL}/add-presentComplaintScribble/${id}`,
                    { savedImage: imageData }
                );
                window.scrollTo(0, 0);

            }
            canvasRef.current?.clearCanvas();
        } catch (error) {
            console.error("Error saving image:", error);
            alert("Failed to save.");
        }
    };

    return ReactDOM.createPortal(
        <div className="bg-opacity-50 px-5 py-10 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
            <h1 onClick={() => navigate(`/appointment-details/${id}`)} className='text-3xl text-white cursor-pointer mb-5 ml-10'><FaAngleDoubleLeft /></h1>
            <div className="bg-[rgb(248,249,250)] rounded-xl mx-auto shadow-lg p-2 flex gap-2 w-full max-w-[95vw] lg:max-w-[95vw] ">
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
            <button onClick={() => handleCanvasAction("save")} className="bg-green-400 block mx-auto mt-2 text-white text-2xl py-2 px-5 rounded-lg">Save</button>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Scribble;
