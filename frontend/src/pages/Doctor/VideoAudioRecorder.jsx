import React, { useState, useRef, useEffect } from "react";
import Docnavbar from "../../components/Doctor/DocNavbar";
import AppointmentSidebar from "../../components/Doctor/AppointmentSidebar";
import { ReactMediaRecorder } from "react-media-recorder";

const VideoAudioRecorder = () => {
  const [media, setMedia] = useState("video");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => stopCamera(); // Stop camera when component unmounts
  }, [media]);

  const startLivePreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: media === "video",
        audio: media === "audio",
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 className="text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]">
              RECORD MEDIA
            </h1>
            <div className="flex mt-10 items-center justify-center gap-5">
              <button
                onClick={() => setMedia("video")}
                className={`p-2 cursor-pointer ${
                  media === "video" ? "bg-blue-500" : "bg-blue-400"
                } text-white font-semibold hover:bg-blue-600 rounded-md text-sm sm:text-xl`}
              >
                Video
              </button>
              <button
                onClick={() => setMedia("audio")}
                className={`p-2 cursor-pointer ${
                  media === "audio" ? "bg-blue-500" : "bg-blue-400"
                } text-white font-semibold hover:bg-blue-600 rounded-md text-sm sm:text-xl`}
              >
                Audio
              </button>
            </div>

            {/* Live Preview */}
            {media === "video" && (
              <div className="mt-5 flex justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full sm:w-96 mx-auto border border-gray-400 rounded-lg"
                />
              </div>
            )}

            <ReactMediaRecorder
              video={media === "video"}
              audio={media === "audio"}
              onStart={startLivePreview}
              onStop={stopCamera} // Stop camera when recording stops
              render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                <div className="mt-5 text-center">
                  <p className="text-lg font-semibold">{status}</p>
                  <div className="flex justify-center gap-5 my-3">
                    <button
                      onClick={startRecording}
                      className="bg-green-500 text-white p-2 rounded-md"
                    >
                      Start Recording
                    </button>
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Stop Recording
                    </button>
                    
                  </div>

                  {mediaBlobUrl && (
                    <div className="mt-3">
                      <h3 className="font-semibold">
                        Recorded {media === "video" ? "Video" : "Audio"}:
                      </h3>
                      {media === "video" ? (
                        <video src={mediaBlobUrl} controls className="w-full sm:w-96 mx-auto" />
                      ) : (
                        <audio src={mediaBlobUrl} controls className="mx-auto" />
                      )}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAudioRecorder;
