import React, { useEffect, useRef, useState } from "react";

export default function SmartCameraRecorder() {
    const [isMobile, setIsMobile] = useState(false);
    const [videoURL, setVideoURL] = useState(null);

    // Desktop mode states
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [chunks, setChunks] = useState([]);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () =>
            /android|iphone|ipad|mobile/i.test(navigator.userAgent);

        setIsMobile(checkMobile());
    }, []);

    /** -------------------------------
     *  MOBILE: Native Camera App
     *  --------------------------------
     */
    const handleMobileCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoURL(url);
        }
    };

    /** -------------------------------
     *  DESKTOP: Webcam Recording
     *  --------------------------------
     */
    const openCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setStream(mediaStream);
            videoRef.current.srcObject = mediaStream;
        } catch (err) {
            console.error("Error opening webcam:", err);
        }
    };

    const startRecording = () => {
        if (!stream) return;

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
        };

        recorder.start();
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setVideoURL(url);
            setChunks([]);
        };
    };

    /** -------------------------------
     *  RENDER
     *  --------------------------------
     */
    return (
        <div style={{ padding: "20px" }}>
            <h2>
                {isMobile
                    ? "Record Using Phone Camera App"
                    : "Record Using Laptop Webcam"}
            </h2>

            {/* MOBILE MODE ----------------------------------------- */}
            {isMobile && (
                <>
                    <input
                        type="file"
                        accept="video/*"
                        capture="environment"
                        onChange={handleMobileCapture}
                        style={{ marginBottom: "20px" }}
                    />

                    {videoURL && (
                        <div>
                            <h3>Preview</h3>
                            <video
                                src={videoURL}
                                controls
                                style={{ width: "300px", border: "1px solid #ccc" }}
                            />
                        </div>
                    )}
                </>
            )}

            {/* DESKTOP MODE ----------------------------------------- */}
            {!isMobile && (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{ width: "300px", border: "1px solid black" }}
                    />

                    <br />
                    <button onClick={openCamera}>Open Webcam</button>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop</button>

                    {videoURL && (
                        <div>
                            <h3>Preview</h3>
                            <video
                                src={videoURL}
                                controls
                                style={{ width: "300px", border: "1px solid #ccc" }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
