import { useEffect } from "react";
import { docStore } from "../../store/DocStore";
import { updateDate } from "../../store/todayDate";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleLeft, FaFilePdf } from "react-icons/fa";
import { investigationPdf } from '../../store/generateInvestigationPDF';
import { recStore } from "../../store/RecStore";
import { useAuthStore } from "../../store/authStore";

const GenerateInvestigationPdf = () => {
    const { getSelectedTest, selectedTest } = docStore();
    const { user } = useAuthStore();
    const { patient, getPatient } = recStore();
    const { id } = useParams();
    const currentDate = updateDate();
    const navigate = useNavigate();

    useEffect(() => {
        getPatient(id);
    }, [getPatient, id])

    useEffect(() => {
        getSelectedTest(id);
    }, [getSelectedTest]);

    const handleGeneratePdf = () => {
        investigationPdf(patient, selectedTest, user);
    }

    return (
        <div className="bg-gradient-to-br from-blue-300 via-blue-400 p-8 to-sky-700 min-h-screen w-full overflow-hidden">
            <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${id}/investigation`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-5 text-[#337ab7]'>List of Investigations</h1>
                <h1 className="text-blue-500 font-semibold mb-3 text-lg mt-4">{currentDate}</h1>
                <hr className="h-[0.5px] px-5 border-none bg-blue-500" />
                {selectedTest?.investigationAdvised?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm ">Investigation Advised</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.investigationAdvised.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.ultra_sonography?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm ">Ultra-Sonography</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.ultra_sonography.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.dopplerStudies?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm ">Doppler studies</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.dopplerStudies.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.obsetrics?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm ">Obsetrics(Pregnancy)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.obsetrics.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.sonography?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm ">Sonography</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.sonography.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.ctScan?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm">16 Slice C.T Scan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.ctScan.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                {selectedTest?.mriScan?.length > 0 && <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm ">
                                <th className="py-2 px-4 border">S No.</th>
                                <th className="bg-blue-500 text-white text-sm">1.5 MRI Scan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-200">
                            {selectedTest?.mriScan.map((investigation, index) =>
                                <tr key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{investigation}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
                <button onClick={() => handleGeneratePdf()} className="bg-blue-500 flex items-center justify-center gap-5 mx-auto  transition duration-300 text-xl cursor-pointer hover:bg-blue-600 px-7 py-4 rounded-lg mt-8 text-white">Generate Pdf <FaFilePdf /></button>
            </div>
        </div>
    )
}

export default GenerateInvestigationPdf