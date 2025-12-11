import React, { useState } from "react";

export default function NativeCameraRecorder() {
    const [videoURL, setVideoURL] = useState(null);

    const handleVideoCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoURL(url);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Record Using Device Camera App</h2>

            {/* This opens the native camera app */}
            <input
                type="file"
                accept="video/*"
                capture="environment" // use "user" for front camera
                onChange={handleVideoCapture}
                style={{ marginBottom: "20px" }}
            />

            {videoURL && (
                <div>
                    <h3>Preview</h3>
                    <video
                        src={videoURL}
                        controls
                        style={{
                            width: "300px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    />

                    <br /><br />

                    {/* Download the captured video */}
                    <a
                        href={videoURL}
                        download="captured-video.mp4"
                        style={{
                            padding: "10px 20px",
                            background: "#007bff",
                            color: "white",
                            borderRadius: "5px",
                            textDecoration: "none",
                        }}
                    >
                        Download Video
                    </a>
                </div>
            )}
        </div>
    );
}
