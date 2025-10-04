import { useRef, useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const SampleDrawingCanvas = () => {
    const [isImage, setImage] = useState('');
    const excalidrawAPI = useRef(null);

    const handleExport = async () => {
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
        reader.onloadend = () => {
            const base64String = reader.result;
            setImage(base64String);
            console.log("Base64 Export:", base64String);
        };
    };

    return (
        <div className="h-screen flex flex-col">
            <h1 className="text-center text-xl font-bold p-2">Example</h1>
            <div className="flex-1 border">
                <Excalidraw
                    excalidrawAPI={(api) => {
                        excalidrawAPI.current = api;
                    }}
                />
            </div>
            <button
                onClick={handleExport}
                className="m-2 p-2 bg-blue-500 text-white rounded"
            >
                Export as Base64
            </button>
            <img src={isImage} className="w-[90%] mx-auto" />
        </div>
    );
};

export default SampleDrawingCanvas;
