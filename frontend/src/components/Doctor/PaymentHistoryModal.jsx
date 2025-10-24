import { RxCross2 } from "react-icons/rx";
import { docStore } from "../../store/DocStore";
import { useEffect, useState, useMemo } from "react";
import BillModal from "./BillModal";
import { CiSearch } from "react-icons/ci";
import Input from "../Input";

const PaymentHistoryModal = ({ location, type, onClose }) => {
    const { getOrderPaymentDetails, orderPaymentDetails } = docStore();
    const [billModal, setBillModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (type === 'item') {
            getOrderPaymentDetails('item');
        }
        else {
            getOrderPaymentDetails('medicine');
        }
    }, []);

    const filteredDetails = useMemo(() => {
        if (!orderPaymentDetails) return [];

        return orderPaymentDetails.filter((detail) => {
            const vendorNames = detail?.order?.flatMap(order =>
                order?.formRows?.map(row => row?.vendor?.[0]?.toLowerCase() || '')
            ) || [];

            const billNumbers = detail?.order?.map(order =>
                order?.billNumber?.toLowerCase() || ''
            ) || [];

            const term = searchTerm.toLowerCase();

            return (
                vendorNames.some(name => name.includes(term)) ||
                billNumbers.some(num => num.includes(term))
            );
        });
    }, [orderPaymentDetails, searchTerm]);

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:py-10 md:p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <RxCross2 size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">
                    Payment History {location}
                </h1>

                <Input
                    icon={CiSearch}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Vendor or Bill Number"
                />

                <table className="min-w-full border border-gray-300 mt-5 bg-white shadow-md">
                    <thead className="bg-[#337ab7] text-white">
                        <tr>
                            <th className="px-2 py-4">Serial No.</th>
                            <th className="px-2 py-4">Vendor</th>
                            <th className="px-2 py-4">Transaction details</th>
                            <th className="px-2 py-4">Cheque No.</th>
                            <th className="px-2 py-4">Date</th>
                            <th className="px-2 py-4">Total Amount</th>
                            <th className="px-2 py-4">Amount Paid</th>
                            <th className="px-2 py-4">Bills</th>
                            <th className="px-2 py-4">Mode of Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDetails.length > 0 ? (
                            filteredDetails.map((detail, index) => (
                                <tr key={index} className="bg-blue-200">
                                    <td className="py-2 px-1 text-center border">{index + 1}</td>
                                    <td className="py-2 px-1 text-center border">
                                        {detail?.order?.map((order, orderIndex) =>
                                            order?.formRows?.map((row, rowIndex) => (
                                                <p key={`${orderIndex}-${rowIndex}`}>{row?.vendor[0]}</p>
                                            ))
                                        )}
                                    </td>
                                    <td className="py-2 px-1 text-center border">{detail?.transactionDetails}</td>
                                    <td className="py-2 px-1 text-center border">{detail?.chequeNo}</td>
                                    <td className="py-2 px-1 text-center border">{detail?.date}</td>
                                    <td className="py-2 px-1 text-center border">{detail?.totalBill}</td>
                                    <td className="py-2 px-1 text-center border">{detail?.amountPaid}</td>
                                    <td className="py-2 px-1 text-center border">
                                        {detail?.order?.map((order, orderIndex) => (
                                            <div key={orderIndex}>
                                                <button
                                                    onClick={() => {
                                                        setBillModal(true);
                                                        setOrderId(order?._id);
                                                        setBillAmount(order?.billAmount);
                                                    }}
                                                    className="bg-blue-500 rounded-md mt-2 cursor-pointer text-white py-1 px-2"
                                                >
                                                    {order?.billNumber}
                                                </button>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-2 px-1 text-center border">{detail?.modeOfPayment}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {billModal && (
                <BillModal
                    onClose={() => setBillModal(false)}
                    orderId={orderId}
                    amount={billAmount}
                />
            )}
        </div>
    );
};

export default PaymentHistoryModal;
