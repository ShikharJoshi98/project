import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const SampleDrawingCanvas = () => {
    return (
        <div className="h-screen flex flex-col">
            <h1 className="text-center text-xl font-bold p-2">Example</h1>
            <div className="flex-1">
                <Excalidraw />
            </div>
        </div>
    );
};

export default SampleDrawingCanvas;

