import { Mail, Phone, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { useStore } from '../../store/UpdateStore'

const VendorModal = ({ onClose }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (idx, vendor) => {
    setEditingRow(idx);
    setEditedData({ ...vendor }); 
  };
  
  const handleChange = (e, col) => {
    setEditedData((prev) => ({
      ...prev,
      [col]: e.target.value,
    }));
  };

  const [vendorname, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
    const { getVendors, vendors, editVendor,addVendor } = useStore();
    const cols = ['vendorname', 'contact', 'email', 'address'];
  async function handleSave(editedData) {
    try {
      await editVendor(editedData._id, editedData.vendorname, editedData.contact, editedData.email, editedData.address);
      setEditingRow(null);
      alert("Vendor details updated successfully!");

    } catch (error) {
      alert("Failed to update vendor details.");
    }
   
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addVendor(vendorname, contact, email, address);
      alert("Added a new Vendor");
    } catch (error) {
      console.log(error.message);
    }
  }
    useEffect(() => {
        getVendors();
    },[getVendors])
  return (
      <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
            <button
            onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
              </button> 
              <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          Vendors
              </h1>
              <div className="flex flex-col  md:justify-around md:flex-row gap-6">
                  <div className="bg-white p-5 rounded-lg max-w-[834px]">
                      <h1 className='text-lg text-center font-semibold text-blue-600 mb-4'>Add Vendor</h1>
            <form onSubmit={handleSubmit} >
               <div className='mb-3'>          
              <h1 className="text-black mb-2 text-lg font-semibold">Vendor Name:</h1>
              <Input
                onChange={(e)=>setname(e.target.value)}
                icon={User}
                type="text"
                placeholder="Enter Vendor Name"
                              />
                          </div> 
               <div className='mb-3'>
              <h1 className="text-black mb-2 text-lg font-semibold">Mobile Number:</h1>
              <Input
                onChange={(e)=>setcontact(e.target.value)}
                icon={Phone}
                type="tel"
                placeholder="Enter Mobile Number"
                              /> 
                          </div>    
              <div className='mb-3'>
              <h1 className="text-black mb-2 text-lg font-semibold">Email :</h1>
              <Input
                onChange={(e)=>setemail(e.target.value)}
                icon={Mail}
                type="email"
                placeholder="Enter Email Address"
                              />   
                </div>
               <div className='mb-3 '>
              <h1 className="text-black mb-2 text-lg font-semibold">Address:</h1>             
 
             <textarea onChange={(e)=>setaddress(e.target.value)} placeholder='Enter Address'  className='w-full  h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
            </div>          
              <button
                type="submit"
                className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white"
              >
                Add
              </button>
            </form>
                  </div>
                  <div className='p-2  overflow-x-auto max-w-[634px] '>
                  <h1 className='text-xl text-center font-semibold text-blue-600 mb-4'>Vendor Details</h1>

                      <table className="border-collapse  border-2 border-gray-500 ">
                      <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border border-gray-500 p-2">Serial No.</th>
                        <th className="border border-gray-500 p-2">Vendor Name</th>
                        <th className="border border-gray-500 p-2">Contact No.</th>
                        <th className="border border-gray-500 p-2">Email</th>
                        <th className="border border-gray-500 p-2">Address</th>
                        <th className="border border-gray-500 p-2">Update</th>
                    </tr>
                          </thead>
                          <tbody>
        {vendors.map((vendor, idx) => (
          <tr key={idx} className="hover:bg-blue-300 bg-blue-200 transition-all">
            <td className="border border-gray-300 px-4 py-2 text-center">{idx + 1}</td>

            {cols.map((col) => (
              <td key={col} className="border border-gray-300 px-4 py-2">
                {editingRow === idx ? (
                  <input
                    type="text"
                    value={editedData[col] || ""}
                    onChange={(e) => handleChange(e, col)}
                    className="border border-gray-400 p-1 w-full"
                  />
                ) : (
                  vendor[col]
                )}
              </td>
            ))}

            <td className="border border-gray-300 px-4 py-2 text-center">
              {editingRow === idx ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
                  onClick={()=>handleSave(editedData)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 cursor-pointer hover:scale-102 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
                  onClick={() => handleEditClick(idx, vendor)}
                >
                  Update
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
                      </table>
                  </div>
              </div>
      
          </div>
      </div>
  )
}

export default VendorModal