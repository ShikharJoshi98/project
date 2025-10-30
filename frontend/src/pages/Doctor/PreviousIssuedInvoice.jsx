import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore'
import { FaRegFilePdf } from 'react-icons/fa6'
import { generateBillInvoicePdf, generatePreviousIssuedInvoice } from '../../store/generateCertificatePdf'
import { CiSearch } from 'react-icons/ci'
import { LuLoaderCircle } from 'react-icons/lu'
import { useAuthStore } from '../../store/authStore'

const PreviousIssuedInvoice = () => {
    const { billInvoices, getBillInvoices, getLetterHead, letterHead } = docStore();
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLetterHead(user?._id)
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(true), 200);
        getBillInvoices().finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        });
    }, [getBillInvoices]);
    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-8 overflow-hidden min-h-screen w-full'>
            <div className='bg-[#e9ecef] w-auto p-5 rounded-lg'>
                <h1 className='p-4 mb-10 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Invoice History</h1>
                <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Enter Patient's Name/Case Paper no./Mobile Number here" />
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7] text-white">
                            <tr >
                                <th className="px-2 py-4">INVOICE DATE</th>
                                <th className="px-2 py-4">CASE PAPER NO.</th>
                                <th className="px-4 py-4">NAME</th>
                                <th className="px-2 py-4">CONTACT NO.</th>
                                <th className="px-2 py-4">INVOICE</th>
                            </tr>
                        </thead>
                        {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' /> : <tbody>
                            {searchTerm.length > 0 && billInvoices?.filter((invoice) => String(invoice?.patient?.casePaperNo).toLowerCase().includes(searchTerm.toLowerCase()) || invoice?.patient?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || invoice?.patient?.phone.toLowerCase().includes(searchTerm.toLowerCase()))?.map((invoice, index) => (
                                <tr key={index} className='bg-blue-200'>
                                    <td className='px-2 py-4 text-center'>{invoice?.date}</td>
                                    <td className='px-2 py-4 text-center'>{invoice?.patient?.casePaperNo}</td>
                                    <td className='px-2 py-4 text-center'>{invoice?.patient?.fullname}</td>
                                    <td className='px-2 py-4 text-center'>{invoice?.patient?.phone}</td>
                                    <td className='px-2 py-4'><FaRegFilePdf size={35} onClick={() => generatePreviousIssuedInvoice(invoice?.patient, letterHead?.billInvoiceImage, invoice?.title, invoice?.date, invoice)} className='mx-auto bg-green-500 cursor-pointer text-white p-1 rounded-md' /></td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PreviousIssuedInvoice