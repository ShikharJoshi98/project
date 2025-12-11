import React, { useRef, useState } from "react";

export default function CameraRecorder() {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const [stream, setStream] = useState(null);
    const [chunks, setChunks] = useState([]);

    // Open device camera
    const openCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setStream(mediaStream);
            videoRef.current.srcObject = mediaStream;
        } catch (err) {
            console.error("Error opening camera:", err);
        }
    };

    // Start recording
    const startRecording = () => {
        if (!stream) return;

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
        };

        recorder.start();
        console.log("Recording...");
    };

    // Stop recording
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        console.log("Stopped");
    };

    // Download video file
    const downloadVideo = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded-video.webm";
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>Device Camera Recorder</h2>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "300px", border: "1px solid black" }}
            />

            <br /><br />

            <button onClick={openCamera}>Open Camera</button>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={downloadVideo}>Download</button>
        </div>
    );
}
