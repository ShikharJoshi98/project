import ReactDOM from "react-dom";
import Input from "../Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { DOC_API_URL, docStore } from "../../store/DocStore";
import { useParams } from "react-router-dom";
import { updateDate } from "../../store/todayDate";
import OtherPrescriptionPriceModal from "./OtherPrescriptionPriceModal";
import { LuPill, LuPlus } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const OtherPrescriptionModal = ({ onClose }) => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        medicineName: "",
        price: ""
    })
    const [submit, setSubmit] = useState(false);
    const { otherPrescriptions, getOtherPrescription } = docStore();
    const [priceModal, setPriceModal] = useState(false);
    const date = updateDate();
    const [prescriptionPrices, setPrescriptionPrices] = useState([]);
    const [priceSubmit, setPriceSubmit] = useState(false);

    const getOtherPrescriptionPrices = async () => {
        const response = await axios.get(`${DOC_API_URL}/getOtherPrescriptionPrice`);
        setPrescriptionPrices(response.data.prices)
    }

    useEffect(() => {
        getOtherPrescription(id);
        getOtherPrescriptionPrices();
    }, [getOtherPrescription, submit, priceSubmit]);

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
    const prescription = otherPrescriptions.filter((pres) => pres?.date === date);

    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-w-[90vw]  max-h-[90vh] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <RxCross2 size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl  text-center font-semibold">
                    Other Prescriptions
                </h1>
                <form className="flex items-end justify-center mt-10 gap-15" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <p>Any Other Medicine</p>
                        <Input value={formValues.medicineName} onChange={handleChange} required name="medicineName" icon={LuPill} placeholder='Medicine Name' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Price</p>
                        <select value={formValues.price} onChange={handleChange} name="price" required className="bg-white p-2 px-5 h-10 w-40 border rounded-md" id="">
                            <option value="" disabled selected className='font-normal ' >Select Price</option>
                            {
                                prescriptionPrices.map((price, index) =>
                                    <option key={index} value={price?.price}>{price?.price}</option>
                                )
                            }
                        </select>
                    </div>
                    <button type="button" onClick={() => setPriceModal(true)} className="p-2 bg-blue-500 text-white rounded-md cursor-pointer"><LuPlus /></button>
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
                                prescription.map((prescription, index) => (
                                    <tr className={`${prescription?.medicine_issued_flag === false ? 'bg-green-200' : 'bg-yellow-200'}`}>
                                        <td className="px-2 py-2 text-center">{index + 1}</td>
                                        <td className="px-2 py-2 text-center">{prescription?.medicineName}</td>
                                        <td className="px-2 py-2 text-center">{prescription?.price}</td>
                                        <td onClick={() => deleteRow(prescription?._id)} className="px-2 py-2 flex justify-center cursor-pointer"><FaTrash /></td>
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
            {priceModal && <OtherPrescriptionPriceModal setSubmit={setPriceSubmit} onClose={() => setPriceModal(false)} />}
        </div>,
        document.getElementById("modal-root")
    );
}

export default OtherPrescriptionModal