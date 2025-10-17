import React, { useState, useRef } from "react";

const AudioTest = () => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const processorRef = useRef(null);
    const streamRef = useRef(null);
    const chunks = useRef([]);
    const wavData = useRef([]);

    const startRecording = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // ✅ Try native MediaRecorder first
            if (window.MediaRecorder && MediaRecorder.isTypeSupported("audio/webm")) {
                const mimeType = "audio/webm";
                const mediaRecorder = new MediaRecorder(stream, { mimeType });
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) chunks.current.push(e.data);
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks.current, { type: mimeType });
                    chunks.current = [];
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                };

                mediaRecorder.start();
                setRecording(true);
                return;
            }

            // ❌ Fallback for Safari — use Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;
            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            wavData.current = [];

            processor.onaudioprocess = (e) => {
                const input = e.inputBuffer.getChannelData(0);
                wavData.current.push(new Float32Array(input));
            };

            source.connect(processor);
            processor.connect(audioContext.destination);
            setRecording(true);
        } catch (err) {
            console.error("Microphone error:", err);
            setError("Microphone access denied or unavailable.");
        }
    };

    const stopRecording = () => {
        setRecording(false);

        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
            return;
        }

        // Safari fallback stop
        if (audioContextRef.current && processorRef.current) {
            processorRef.current.disconnect();
            audioContextRef.current.close();
            streamRef.current?.getTracks().forEach((t) => t.stop());

            const blob = exportWAV(wavData.current, 44100);
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        }
    };

    const exportWAV = (buffers, sampleRate) => {
        const flat = flattenArray(buffers);
        const wav = encodeWAV(flat, sampleRate);
        return new Blob([wav], { type: "audio/wav" });
    };

    const flattenArray = (channelBuffers) => {
        const length = channelBuffers.reduce((acc, b) => acc + b.length, 0);
        const result = new Float32Array(length);
        let offset = 0;
        for (const buffer of channelBuffers) {
            result.set(buffer, offset);
            offset += buffer.length;
        }
        return result;
    };

    const encodeWAV = (samples, sampleRate) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        const writeString = (offset, str) => {
            for (let i = 0; i < str.length; i++) {
                view.setUint8(offset + i, str.charCodeAt(i));
            }
        };

        let offset = 0;

        writeString(0, "RIFF");
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(8, "WAVE");
        writeString(12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, "data");
        view.setUint32(40, samples.length * 2, true);

        floatTo16BitPCM(view, 44, samples);

        return view;
    };

    const floatTo16BitPCM = (output, offset, input) => {
        for (let i = 0; i < input.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
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

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {audioUrl && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Recorded Audio:</h3>
                    <audio controls src={audioUrl} className="mt-2 w-80" />
                    <a
                        href={audioUrl}
                        download="recording.wav"
                        className="block mt-2 text-blue-600 underline"
                    >
                        Download Audio
                    </a>
                </div>
            )}
        </div>
    );
};

export default AudioTest;
