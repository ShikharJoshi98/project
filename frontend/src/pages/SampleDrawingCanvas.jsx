import { useEffect, useRef, useState } from "react"
import * as fabric from "fabric";

const SampleDrawingCanvas = () => {
    const canvasRef = useRef();
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            height: 500,
            width: 500,
            isDrawingMode: true
        });

        fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
        fabricCanvas.freeDrawingBrush.color = "#000000";
        fabricCanvas.freeDrawingBrush.width = 5;
        setCanvas(fabricCanvas);
        return () => {
            fabricCanvas.dispose();
        }
    }, []);

    return (
        <div className="flex flex-col items-center gap-10">
            <button onClick={() => canvas.clear()}>Clear Canvas</button>
            <canvas ref={canvasRef} className="border-2"></canvas>
        </div>
    )
}

export default SampleDrawingCanvas