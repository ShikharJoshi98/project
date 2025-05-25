import { Pill, Trash, X } from "lucide-react"
import ReactDOM from "react-dom";
import Input from "../Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { DOC_API_URL, docStore } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const OtherPrescriptionModal = ({ onClose }) => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        medicineName: "",
        price: ""
    })
    const [submit, setSubmit] = useState(false);
    const { otherPrescriptions, getOtherPrescription } = docStore();
    useEffect(() => {
        getOtherPrescription(id);
    }, [getOtherPrescription, submit]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${DOC_API_URL}/add-other-medicine/${id}`,
                formValues
            )
            setSubmit(prev => !prev);
            console.log(submit);
            setFormValues({
                medicineName: '',
                price: ''
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteRow = async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/delete-other-prescription/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }
    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-w-[90vw]  max-h-[90vh] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl  text-center font-semibold">
                    Other Prescriptions
                </h1>
                <form className="flex items-end justify-center mt-10 gap-15" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <p>Any Other Medicine</p>
                        <Input value={formValues.medicineName} onChange={handleChange} required name="medicineName" icon={Pill} placeholder='Medicine Name' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Price</p>
                        <select value={formValues.price} onChange={handleChange} name="price" required className="bg-white p-2 px-5 h-10 w-40 border rounded-md" id="">
                            <option value="" disabled selected className='font-normal ' >Select Price</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">500</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                        </select>
                    </div>
                    <button className="bg-blue-500 p-2 text-white rounded-md h-fit cursor-pointer">Submit</button>
                </form>
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full overflow-y-auto border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
                                <th className="px-2 py-4">Serial No.</th>
                                <th className="px-2 py-4">Any Other Medicine</th>
                                <th className="px-2 py-4">Price</th>
                                <th className="px-2 py-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                otherPrescriptions.map((prescription, index) => (
                                    <tr className={`${prescription?.medicine_issued_flag===false?'bg-green-200':'bg-yellow-200'}`}>
                                        <td className="px-2 py-2 text-center">{index + 1}</td>
                                        <td className="px-2 py-2 text-center">{prescription?.medicineName}</td>
                                        <td className="px-2 py-2 text-center">{prescription?.price}</td>
                                        <td onClick={() => deleteRow(prescription?._id)} className="px-2 py-2 flex justify-center cursor-pointer"><Trash /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex mt-10 flex-col gap-5">
                    <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-green-200"></div><span>Medicine not issued yet</span></div>
                    <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-yellow-200"></div><span>Medicine Issued</span></div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default OtherPrescriptionModal