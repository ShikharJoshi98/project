import React, { useState, useRef } from "react";

const AudioTest = () => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks.current, { type: "audio/webm" });
                chunks.current = [];
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (err) {
            console.error("Microphone access denied:", err);
            alert("Please allow microphone access to record audio.");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">🎙️ Audio Recorder</h2>
            {!recording ? (
                <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    Start Recording
                </button>
            ) : (
                <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Stop Recording
                </button>
            )}

            {audioUrl && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Recorded Audio:</h3>
                    <audio controls src={audioUrl} className="mt-2 w-80" />
                    <a
                        href={audioUrl}
                        download="recording.webm"
                        className="block mt-2 text-blue-600 underline"
                    >
                        Download Audio
                    </a>
                </div>
            )}
        </div>
    );
}

export default AudioTest