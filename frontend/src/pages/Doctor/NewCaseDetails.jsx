import React, { useEffect, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom'
import { recStore } from '../../store/RecStore';
import PresentComplaints from '../../components/Doctor/NewCase/PresentComplaints';
import HealthAssessmentModal from '../../components/Doctor/NewCase/HealthAssessmentModal';
import ChiefComplaints from '../../components/Doctor/NewCase/ChiefComplaints';
import PastHistory from '../../components/Doctor/NewCase/PastHistory';
import PersonalHistory from '../../components/Doctor/NewCase/PersonalHistory';
import FamilyMedical from '../../components/Doctor/NewCase/FamilyMedical';
import MentalCausative from '../../components/Doctor/NewCase/MentalCausative';
import MentalPersonality from '../../components/Doctor/NewCase/MentalPersonality';
import BriefMindSymptom from '../../components/Doctor/NewCase/BriefMindSymptom';
import ThermalReaction from '../../components/Doctor/NewCase/ThermalReaction';
import Miasm from '../../components/Doctor/NewCase/Miasm';

const NewCaseDetails = () => {
    const { patients, getPatientDetails } = recStore();
    const navigate = useNavigate();
    const location = useParams();
    const [complaint, setComplaint] = useState('Present Complaints');
    const [isHealthAssessmentModalOpen, setHealthAssessmentModalIsOpen] = useState(false);

    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails])

    const patient = patients.filter((cand => (cand._id) === location.id));
    const testArray = [{ title: 'Present Complaints', color: 'green' }, { title: 'Chief Complaints', color: 'blue' }, { title: 'Past History', color: 'brown' }, { title: 'Personal History', color: 'orange' }, { title: 'Family Medical HO', color: 'blue' }, { title: 'Mental Causative Factor', color: 'black' }, { title: 'Mental Personality Character', color: 'purple' }, { title: 'Brief Mind Symptoms', color: 'green' }, { title: 'Thermal Reaction', color: 'brown' }, { title: 'Miasm', color: 'indigo' }];
    

    return (
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
            <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>
                <h1>{patient[0]?.fullname} </h1>
                <p className='text-blue-400'>|</p>
                <div className='flex items-center gap-2'>
                    <h1>Contact No. -</h1>
                    <h1>{patient[0]?.phone}</h1>
                </div>
                <p className='text-blue-400'>|</p>
                <div className='flex items-center gap-2'>
                    <h1>Case Paper No. -</h1>
                    <h1>{patient[0]?.casePaperNo}</h1>
                </div>
            </div>
            <div className="bg-[#e9ecef] w-auto  p-5 mx-10 my-6 rounded-lg">
                <div className='flex items-center justify-between'>
                    <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer'><FaAngleDoubleLeft /></h1>
                    <button onClick={() => setHealthAssessmentModalIsOpen(true)} className='p-2 bg-green-500 text-lg text-white rounded-lg cursor-pointer'>Health Assessment</button>
                </div>
                <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>{complaint}</h1>
                <ul className='flex items-center justify-center flex-wrap gap-1 w-full my-15 font-semibold'>
                    {
                        testArray.map((test, index) => (
                            <>
                                <li key={index} onClick={() => { setComplaint(test.title); }} style={{ color: `${test.color}` }} className='cursor-pointer'>{test.title}</li>
                                <li>|</li>
                            </>
                        ))
                    }
                </ul>
                {complaint === 'Present Complaints' && <PresentComplaints complaint={complaint} />}
                {complaint === 'Chief Complaints' && <ChiefComplaints/>}
                {complaint === 'Past History' && <PastHistory complaint={complaint} />}
                {complaint === 'Personal History' && <PersonalHistory/>}
                {complaint === 'Family Medical HO' && <FamilyMedical complaint={complaint}/>}
                {complaint === 'Mental Causative Factor' && <MentalCausative complaint={complaint}/>}
                {complaint === 'Mental Personality Character' && <MentalPersonality complaint={complaint}/>}
                {complaint === 'Brief Mind Symptoms' && <BriefMindSymptom complaint={complaint}/>}
                {complaint === 'Thermal Reaction' && <ThermalReaction complaint={complaint}/>}
                {complaint === 'Miasm' && <Miasm complaint={complaint}/>}
            </div>
            {isHealthAssessmentModalOpen && <HealthAssessmentModal onClose={() => setHealthAssessmentModalIsOpen(false)} />}

        </div>
    )
}

export default NewCaseDetails