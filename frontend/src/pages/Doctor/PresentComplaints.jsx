import { useState } from "react";
import AppointmentSidebar from "../../components/Doctor/AppointmentSidebar"
import Docnavbar from "../../components/Doctor/DocNavbar"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { list: "-1" },
            { list: "+1" },
        ],
        ["image", "link", "video"]
    ]
}


const PresentComplaints = () => {
    const [pad, setpad] = useState('scribble');
    const [value, setvalue] = useState('');
    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                    <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                        <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
                           ADD - PRESENT COMPLAINTS
                        </h1>
                        <div className="flex mt-10 items-center justify-center gap-5">
                            <button onClick={() => setpad('scribble')} className={`p-2 cursor-pointer ${pad === 'scribble' ? "bg-blue-500" : "bg-blue-400"}  text-white font-semibold hover:bg-blue-600 hover:scale-102 rounded-md text-sm sm:text-xl `}>Scribbling Pad</button>
                            <button onClick={() => setpad('writer')} className={`p-2 cursor-pointer ${pad === 'writer' ? "bg-blue-500" : "bg-blue-400"}  text-white font-semibold hover:bg-blue-600 hover:scale-102 rounded-md text-sm sm:text-xl `}>Writing Pad</button>
                        </div>
                        {pad === 'scribble' &&
                            <div className="border-1 border-stone-700 rounded-lg   mx-auto mt-10 bg-white">
                                <SignatureCanvas penColor='black'
                                    canvasProps={{ className: 'sigCanvas w-[80vw]  h-[40vh] md:h-[85vh]' }} />
                            </div>
                        }
                        {pad === 'writer' &&
                            <div className="bg-white border-none sm:w-[60vw] md:w-[80vw] h-[40vh] md:h-[85vh] rounded-lg mx-auto mt-5">
                                <ReactQuill
                                    className=" h-[30vh]  sm:h-[35vh] sm:w-[60vw] md:w-[80vw] md:h-[79vh] border-none"
                                    theme="snow"
                                    value={value}
                                    onChange={setvalue}
                                    modules={modules}
                                />
                            </div>
                        }
                        <div className="flex mt-7 items-center justify-center gap-5 ">
                            <button className={`p-2 cursor-pointer bg-green-500  text-white font-semibold hover:bg-green-600 hover:scale-102 rounded-md text-sm sm:text-xl `}>Save</button>
                            <button className={`p-2 cursor-pointer bg-red-500  text-white font-semibold hover:bg-red-600 hover:scale-102 rounded-md text-sm sm:text-xl `}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PresentComplaints