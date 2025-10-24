import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { MdMedicalInformation } from 'react-icons/md'
import { FaFilePdf } from 'react-icons/fa'
import { docStore } from '../../store/DocStore'
import { generateDiagnoseHistory, generateDiagnoseRow } from '../../store/generateDiagnoseHistory'
import { LuLoaderCircle } from 'react-icons/lu'

const DiagnoseHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);
    const [patientId, setPatientId] = useState('');
    const { prescriptionsArray, getPrescriptions, getPresentComplaintData, getChiefComplaints, getPastHistoryData, getPersonalHistory, getFamilyMedicalData, getMentalCausative, getMentalCausativeScribble, getMentalPersonality, getMentalPersonalityScribble, getBriefMindSymptomScribble, getThermalReaction, getMiasm } = docStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getPrescriptions();
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [getPrescriptions]);

    const filteredPrescriptions = prescriptionsArray.filter((prescription) => {
        const diagnosisMatch = prescription?.diagnosis?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
        const medicineMatch = prescription?.medicine?.toLowerCase().includes(searchTerm.toLowerCase());
        return diagnosisMatch || medicineMatch;
    });

    const generatePdf = async (pres, id) => {
        setGenerateLoading(true);
        setPatientId(id);
        await Promise.all([
            getPresentComplaintData(id),
            getChiefComplaints(id),
            getPastHistoryData(id),
            getPersonalHistory(id),
            getFamilyMedicalData(id),
            getMentalCausative(id),
            getMentalCausativeScribble(id),
            getMentalPersonality(id),
            getMentalPersonalityScribble(id),
            getBriefMindSymptomScribble(id),
            getThermalReaction(id),
            getMiasm(id),
        ]);
        const {
            PresentComplaintData,
            chiefComplaints,
            PastHistoryData,
            personalHistory,
            FamilyMedicalData,
            MentalCausativeData,
            mentalCausativeScribble,
            MentalPersonalityData,
            mentalPersonalityScribble,
            briefMindSymptomScribble,
            ThermalReactionData,
            MiasmData,
        } = docStore.getState();
        generateDiagnoseRow(pres, PresentComplaintData, chiefComplaints, PastHistoryData, personalHistory, FamilyMedicalData, MentalCausativeData[0]?.diseases, mentalCausativeScribble, MentalPersonalityData[0]?.diseases, mentalPersonalityScribble, briefMindSymptomScribble, ThermalReactionData[0]?.diseases, MiasmData[0]?.diseases);
        setGenerateLoading(false);
        setPatientId('');
    }

    return (

        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen w-full p-8'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl mb-10 sm:text-4xl'>Diagnose History</h1>
                <Input onChange={(e) => setSearchTerm(e.target.value)} icon={MdMedicalInformation} placeholder='Search for Disease or Medicine here ..' />
                <button onClick={() => generateDiagnoseHistory(filteredPrescriptions)} className='py-2 px-4 bg-green-500 cursor-pointer flex items-center gap-5 my-10 place-self-end font-semibold rounded-lg text-white'>Generate Pdf <FaFilePdf /></button>
                {loading ?
                    <LuLoaderCircle className='animate-spin size-10 mx-auto mt-10 text-gray-500' />
                    :
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                <tr >
                                    <th className="px-2 py-4 ">S.No</th>
                                    <th className="px-2 py-4 ">Diagnosis</th>
                                    <th className="px-4 py-4 ">Medicine</th>
                                    <th className="px-2 py-4 ">Date</th>
                                    <th className="px-2 py-4 ">Start Date</th>
                                    <th className="px-2 py-4 ">Duration</th>
                                    <th className="px-2 py-4 ">Case Paper No.</th>
                                    <th className="px-2 py-4 ">Patient Name</th>
                                    <th className="px-2 py-4 ">Pdf</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchTerm.length > 0 &&
                                    filteredPrescriptions.map((pres, index) => (
                                        <tr key={index} className='bg-blue-200'>
                                            <td className="px-2 py-4 text-center">{index + 1}</td>
                                            <td className="px-2 py-4 ">{pres?.diagnosis.join(',')}</td>
                                            <td className="px-2 py-4 text-center">{pres?.medicine} {pres?.potency}</td>
                                            <td className="px-2 py-4 text-center">{pres?.prescription_date}</td>
                                            <td className="px-2 py-4 text-center">{pres?.start_date}</td>
                                            <td className="px-2 py-4 text-center">{pres?.duration === '60' ? '2 Months' : pres?.duration === '90' ? '3 Months' : `${pres?.duration} days`}</td>
                                            <td className="px-2 py-4 text-center">{pres?.patient?.casePaperNo}</td>
                                            <td className="px-2 py-4 text-center">{pres?.patient?.fullname}</td>
                                            <td className="px-2 py-4 text-center"><button onClick={() => generatePdf(pres, pres?.patient?._id)} className='text-white bg-green-500 p-2 cursor-pointer rounded-md'>{(generateLoading && patientId === pres?.patient?._id) ? <LuLoaderCircle className='mx-auto animate-spin' size={24} /> : <FaFilePdf className='size-6' />}</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>}
                {filteredPrescriptions.length === 0 && loading === false ? <p className='text-center mt-10 text-lg'>No Data</p> : ''}
            </div>
        </div>
    )
}

export default DiagnoseHistory