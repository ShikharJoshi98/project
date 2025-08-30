import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'

const CourierMail = () => {
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>E-mail Courier Medicine Details</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">Case Paper No.</th>
                                        <th className="px-2 py-4 ">Name</th>
                                        <th className="px-4 py-4 ">Contact No.</th>
                                        <th className="px-2 py-4 ">Email</th>
                                        <th className="px-2 py-4 ">Address</th>
                                        <th className="px-2 py-4 ">Date</th>
                                        <th className="px-2 py-4 ">Courier Amount</th>
                                        <th className="px-2 py-4 ">Mail Status</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourierMail