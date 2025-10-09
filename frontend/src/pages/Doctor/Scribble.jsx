import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { DOC_API_URL } from "../../store/DocStore";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const Scribble = () => {
    const { id, scribbleType } = useParams();
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
            try {
                if (scribbleType === 'follow-up') {
                    const response = await axios.post(
                        `${DOC_API_URL}/add-follow-up-patient/${id}`,
                        { savedImage: base64String }
                    );
                }
                else if (scribbleType === 'present-complaints') {
                    const response = await axios.post(
                        `${DOC_API_URL}/add-presentComplaintScribble/${id}`,
                        { savedImage: base64String }
                    );
                }
                toast('Saved. Keep Writing !!')
            } catch (error) {
                console.error("Error saving image:", error);
                alert("Failed to save.");
            }
        };
    };


    return ReactDOM.createPortal(
        <div className="bg-[rgb(248,249,250)] rounded-xl h-screen flex items-center justify-center">
            <div className="h-screen flex flex-col w-[90vw]">
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
        </div>,
        document.getElementById("modal-root")
    );
};

export default Scribble;


