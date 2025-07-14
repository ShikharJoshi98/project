import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore'
import RegenerateCertificateModal from '../../components/Doctor/RegenerateCertificateModal'
import { CiSearch } from 'react-icons/ci'

const PreviousIssuedCertificates = () => {
    const { getCertificates, certificates } = docStore();
    const [regenerateModal, setRegenerateModal] = useState(false);
    const [certificateDetail, setCertificateDetail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        getCertificates();
    }, [getCertificates, submit]);

    return (
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 mb-10 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Previous Issued Certificates</h1>
                <div className='flex items-center gap-2 '>
                    <Input onChange={(e) => setSearchTerm(e.target.value)} icon={CiSearch} placeholder="Enter Patient's Name/Case Paper no./Mobile Number here" />
                </div>
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
                                <th className="px-2 py-4 ">ISSUED DATE</th>
                                <th className="px-2 py-4 ">CASE PAPER NO.</th>
                                <th className="px-4 py-4 ">NAME</th>
                                <th className="px-2 py-4 ">CONTACT NO.</th>
                                <th className="px-2 py-4 ">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerm.length > 0 && certificates.filter((certificate) => certificate?.patient?.casePaperNo.toLowerCase().includes(searchTerm.toLowerCase()) || certificate?.patient?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || certificate?.patient?.phone.toLowerCase().includes(searchTerm.toLowerCase())).map((certificate, index) => (
                                <tr key={index} className='bg-blue-200'>
                                    <td className="px-2 py-4 text-center">{certificate?.date}</td>
                                    <td className="px-2 py-4 text-center">{certificate?.patient?.casePaperNo}</td>
                                    <td className="px-2 py-4 text-center">{certificate?.patient?.fullname}</td>
                                    <td className="px-2 py-4 text-center">{certificate?.patient?.phone}</td>
                                    <td className="px-2 py-4 text-center"><button onClick={() => { setRegenerateModal(true); setCertificateDetail(certificate) }} className='p-1 cursor-pointer bg-green-500 text-white rounded-md'>Regenerate Certificate</button></td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
            {regenerateModal && <RegenerateCertificateModal setSubmit={setSubmit} certificate={certificateDetail} onClose={() => setRegenerateModal(false)} />}
        </div>
    )
}

export default PreviousIssuedCertificates