import { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'
import { docStore } from '../../store/DocStore'
import { FaRegFilePdf } from 'react-icons/fa6'
import { generateBillInvoicePdf } from '../../store/generateCertificatePdf'

const PreviousIssuedInvoice = () => {

    const { billInvoices, getBillInvoices } = docStore();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        getBillInvoices();
    }, [getBillInvoices]);

    console.log(billInvoices);

    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 mb-10 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Invoice History</h1>
                        <div className='flex items-center gap-2 '>
                            <Input icon={SearchIcon} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Enter Patient's Name/Case Paper no./Mobile Number here" />
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">INVOICE DATE</th>
                                        <th className="px-2 py-4 ">CASE PAPER NO.</th>
                                        <th className="px-4 py-4 ">NAME</th>
                                        <th className="px-2 py-4 ">CONTACT NO.</th>
                                        <th className="px-2 py-4 ">INVOICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchTerm.length>0 && billInvoices.filter((invoice)=>invoice?.patient?.casePaperNo.includes(searchTerm)||invoice?.patient?.fullname.includes(searchTerm)||invoice?.patient?.phone.includes(searchTerm)).map((invoice, index) => (
                                            <tr key={index} className='bg-blue-200'>
                                                <td className='px-2 py-4 text-center'>{invoice?.date}</td>
                                               <td className='px-2 py-4 text-center'>{invoice?.patient?.casePaperNo}</td>
                                               <td className='px-2 py-4 text-center'>{invoice?.patient?.fullname}</td>
                                               <td className='px-2 py-4 text-center'>{invoice?.patient?.phone}</td>
                                               <td className='px-2 py-4'><FaRegFilePdf size={35} onClick={()=>generateBillInvoicePdf(invoice?.patient, invoice?.date, invoice)} className='mx-auto bg-green-500 cursor-pointer text-white p-1 rounded-md' /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviousIssuedInvoice