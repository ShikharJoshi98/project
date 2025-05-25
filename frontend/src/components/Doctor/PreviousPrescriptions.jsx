import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { docStore } from "../../store/DocStore";
import { useParams } from "react-router-dom";

const PreviousPrescriptions = () => {
  const location = useParams();
  const { getPastPrescription, allPrescriptions,prescriptionSubmit } = docStore();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPrescription = allPrescriptions.filter((medicine) => medicine.medicine.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    getPastPrescription(location.id);
  }, [location.id,prescriptionSubmit]); 

  const groupedPrescriptions = filteredPrescription.reduce((acc, prescription) => {
    if (!acc[prescription.prescription_date]) {
      acc[prescription.prescription_date] = [];
    }
    acc[prescription.prescription_date].push(prescription);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]">
        PREVIOUS PRESCRIPTIONS
      </h1>
      <h1 className="text-2xl mb-3 text-blue-600 font-semibold">
        Medicine (Search Here)
      </h1>
      <Input onChange={(e) => setSearchTerm(e.target.value)} icon={Search} type="text" name="name" placeholder="Enter Medicine Name" />
      <div className="overflow-x-auto  mt-3">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="text-lg bg-blue-500 text-white">
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Diagnose</th>
              <th className="py-2 px-4 border">Medicine</th>
              <th className="py-2 px-4 border">Potency</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">Dose</th>
              <th className="py-2 px-4 border">Duration</th>
              <th className="py-2 px-4 border">Note</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPrescriptions).reverse().map(([date, prescriptions]) =>
              prescriptions.map((prescription, index) => (
                <tr key={prescription._id} className="bg-gray-200 whitespace-nowrap">
                  {index === 0 && (
                    <td rowSpan={prescriptions.length} className="py-2 px-4 border bg-gray-300 font-semibold text-center">
                      {date}
                    </td>
                  )}
                  <td className="py-2 px-4 border">{prescription.diagnosis.join(", ")}</td>
                  <td className="py-2 px-4 border">{prescription.medicine}</td>
                  <td className="py-2 px-4 border">{prescription.potency}</td>
                  <td className="py-2 px-4 border">{prescription.start_date}</td>
                  <td className="py-2 px-4 border">{prescription.dose}</td>
                  <td className="py-2 px-4 border">{prescription.duration}</td>
                  <td className="py-2 px-4 border">{prescription.note || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousPrescriptions;
