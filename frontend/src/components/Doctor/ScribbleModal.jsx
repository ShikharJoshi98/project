import React, { useRef, useState, useEffect } from "react"; // 👈 ADDED useEffect
import ReactDOM from "react-dom";
import {
  Eraser,
  Pen,
  Redo,
  SaveIcon,
  Trash,
  Undo,
  X,
} from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { DOC_API_URL } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const ScribbleModal = ({ onClose }) => {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);

  // 👇 BLOCK TOUCH INPUT (finger)
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
      const imageData = await canvasRef.current.exportImage("png");
      const response = await axios.post(
        `${DOC_API_URL}/add-follow-up-patient/${id}`,
        { savedImage: imageData }
      );
      console.log("Saved:", response.data);
      alert("Saved Successfully. Continue writing...");
      canvasRef.current?.clearCanvas();
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save.");
    }
  };

  return ReactDOM.createPortal(
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="bg-[#f8f9fa] rounded-xl shadow-lg p-2 flex gap-2 w-full max-w-[90vw] max-h-[90vh] overflow-hidden">

        {/* Canvas */}
        <div
          id="canvas-wrapper" // 👈 ADDED ID
          style={{ touchAction: "none", pointerEvents: "auto" }}
          className="flex-1"
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

        {/* Tools */}
        <div className="flex flex-col items-center justify-start gap-4 p-2">
          <button
            onClick={onClose}
            className="hover:bg-red-500 text-red-600 hover:text-white rounded-md p-2 mb-6 transition"
            title="Close"
          >
            <X size={20} />
          </button>

          <button
            title="Pen"
            onClick={() => handleToolChange("pen")}
            disabled={!eraseMode}
            className={`p-3 rounded-lg border-2 bg-gray-200 shadow-md transition ${
              eraseMode
                ? "text-black border-blue-400"
                : "text-gray-400 border-gray-300"
            }`}
          >
            <Pen size={16} />
          </button>

          <button
            title="Eraser"
            onClick={() => handleToolChange("erase")}
            disabled={eraseMode}
            className={`p-3 rounded-lg border-2 bg-gray-200 shadow-md transition ${
              !eraseMode
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

          <button
            title="Save"
            onClick={() => handleCanvasAction("save")}
            className="p-3 rounded-lg border-2 border-blue-400 bg-gray-200 shadow-md"
          >
            <SaveIcon size={16} />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ScribbleModal;
