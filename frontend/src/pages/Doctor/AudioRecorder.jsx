import { useRef, useState } from "react";
import AppointmentSidebar from "../../components/Doctor/AppointmentSidebar"
import Docnavbar from "../../components/Doctor/DocNavbar"

const AudioRecorder = () => {
    const audioChunk = useRef([]);
    const [recordings, setRecordings] = useState([]);
    const mediaRecorderRef = useRef(null);

    const startRec = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            audioChunk.current = []; // clear previous recording

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunk.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunk.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecordings(prev => [...prev, audioUrl]);

                // 🔒 Release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRec = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop(); // triggers 'onstop'
        }
    };

    return (
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
            <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>RECORD AUDIO</h1>
                <button onClick={startRec}>Start Recording</button>
                <button onClick={stopRec}>Stop Recording</button>
                {
                    recordings.map((recUrl, index) => (
                        <div key={index}>
                            <audio controls src={recUrl} />
                            <a href={recUrl} download={`recording-${index}.wav`}>
                                Download
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AudioRecorder