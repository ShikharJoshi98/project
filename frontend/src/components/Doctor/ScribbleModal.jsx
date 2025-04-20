import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Eraser, Pen, Redo, SaveIcon, Trash, Undo, X } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { DOC_API_URL } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const ScribbleModal = ({ onClose }) => {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);

  // Ignore finger touches
  useEffect(() => {
    const canvasWrapper = document.getElementById("input-filter-wrapper");

    const handlePointerDown = (e) => {
      if (e.pointerType === "touch") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (canvasWrapper) {
      canvasWrapper.addEventListener("pointerdown", handlePointerDown, {
        passive: false,
      });
    }

    return () => {
      if (canvasWrapper) {
        canvasWrapper.removeEventListener("pointerdown", handlePointerDown);
      }
    };
  }, []);

  const handleToolChange = (mode) => {
    const isEraser = mode === "erase";
    setEraseMode(isEraser);
    canvasRef.current?.eraseMode(isEraser);
  };

  const handleSaveClick = async () => {
    try {
      const imageData = await canvasRef.current.exportImage("png");
      const response = await axios.post(
        `${DOC_API_URL}/add-follow-up-patient/${id}`,
        { savedImage: imageData }
      );
      alert("Saved Successfully. Continue writing...");
      canvasRef.current?.clearCanvas();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return ReactDOM.createPortal(
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2 w-full max-w-[90vw] max-h-[90vh] overflow-hidden">
        
        <div
          id="input-filter-wrapper"
          className="flex-1"
          style={{ touchAction: "none" }}
        >
          <ReactSketchCanvas
            ref={canvasRef}
            width="100%"
            height="573px"
            strokeColor="black"
            canvasColor="white"
            eraserWidth={20}
            className="!rounded-md !border-2 !border-blue-400"
          />
        </div>

        <div className="flex flex-col items-center justify-start gap-4 p-2">
          <button onClick={onClose} title="Close"><X /></button>
          <button onClick={() => handleToolChange("pen")} disabled={!eraseMode}><Pen /></button>
          <button onClick={() => handleToolChange("erase")} disabled={eraseMode}><Eraser /></button>
          <button onClick={() => canvasRef.current?.undo()}><Undo /></button>
          <button onClick={() => canvasRef.current?.redo()}><Redo /></button>
          <button onClick={() => canvasRef.current?.clearCanvas()}><Trash /></button>
          <button onClick={handleSaveClick}><SaveIcon /></button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ScribbleModal;
