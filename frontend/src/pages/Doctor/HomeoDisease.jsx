import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import Sidebar, { SidebarItem } from '../../components/Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutList, MapPin, Search, SquarePen, Trash, Users } from 'lucide-react'
import { FaRegFilePdf, FaUserDoctor } from 'react-icons/fa6'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { AiFillMedicineBox } from 'react-icons/ai'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore'
import jsPDF from "jspdf";
import "jspdf-autotable";
import DocSidebar from '../../components/Doctor/DocSidebar'

const HomeoDisease = () => {
  const { user } = useAuthStore();
   const [editingRow, setEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const handleEditClick = (idx, disease) => {
    setEditingRow(idx);
    setEditedData({ ...disease }); 
  };
  const handleChange = (e, col) => {
    setEditedData((prev) => ({
      ...prev,
      [col]: e.target.value,  
    }));
  };
  const { homeobhagwat, section, setsection, gethomeobhagwat, Homeo, updatehomeobhagwat, deleteHomeo } = docStore();
  const navigate = useNavigate();
  useEffect(() => {
    const savedSection = localStorage.getItem("selectedSection");
    if (savedSection) {
      setsection(savedSection);
    }
  }, []);

  const handleSectionChange = (newSection, path) => {
    setsection(newSection);
    localStorage.setItem("selectedSection", newSection); // Save to localStorage
    navigate(path);
  };
    let [formValues, setFormValues] = useState({
        name: "",
        description: "",
              
    });
    const HomeoDisease = Homeo.filter((item) => item.section === 'disease');
    const filteredDisease = HomeoDisease.filter((item) =>item.name.toLowerCase().includes(searchTerm)||item.description.toLowerCase().includes(searchTerm));
    const [currentDate, setCurrentDate] = useState("");
        useEffect(() => {
          const updateDate = () => {
            const date = new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            });
            setCurrentDate(date);
          };
      
          updateDate();
        }, []);
         useEffect(() => {
              gethomeobhagwat();
              
                }, [gethomeobhagwat]);
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormValues((prevValues) => ({
              ...prevValues,
              [name]: value,
            }));
  };
   const generateTablePDF = () => {
      const doc = new jsPDF();
    
      doc.setFontSize(34);
      doc.text("Homeo Bhagwat Gita", 50, 20);
    
      doc.setFontSize(18);
      doc.text("Disease Details", 14, 40);
    
      // Define table columns
      const tableColumn = ["Serial No.", "Disease", "Description"];
      const tableRows = HomeoDisease.map((disease, index) => [
        index + 1,
        disease.name,
        disease.description,
      ]);
    
      // Generate table with data
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: {
          fontSize: 14,
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
        headStyles: {
          fontSize: 18,
          fontStyle: "bold",
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
      });
    
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      window.open(pdfUrl, "_blank");
    };
    
  
    const generatePDF = (disease) => {
      const doc = new jsPDF();
  
      doc.setFontSize(34);
      doc.text("Homeo Bhagwat Gita", 50, 20);
    
      doc.setFontSize(18);
      doc.text("Disease Details", 14, 40);
    
      const tableColumn = ["Serial No.", "Disease", "Description"];
      const tableRows = [[1, disease.name, disease.description]];
    
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: {
          fontSize: 14,
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255], 
          lineWidth: 0.5, 
          lineColor: [0, 0, 0]
        },
        headStyles: {
          fontSize: 18, 
          fontStyle: "bold",
          textColor: [0, 0, 0],
          fillColor: [255, 255, 255],
          lineWidth: 0.5, 
          lineColor: [0, 0, 0]
        },
      });
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      window.open(pdfUrl, "_blank");
  
    };
  async function deleteCol(id) {
      try {
        await deleteHomeo(id);
             
        const updatedDiseases = HomeoDisease.filter((disease) => disease._id !== id);
      docStore.setState((prevState) => ({
        ...prevState,
        Homeo: updatedDiseases, 
      }));
      } catch (error) {
        console.log(error.message);
      }
  }
  
  async function handleSave() {
    try {
      await updatehomeobhagwat(editedData._id,editedData);
      setEditingRow(null);
      alert("Details updated successfully!");
    } catch (error) {
      alert("Failed to update details.");
    }
  }
  
    async function handleSubmit(){
      
      formValues = { ...formValues, "section": section };
        await homeobhagwat(formValues);
    }
  return (
      <div>
          <Docnavbar />
          <div className='flex '>
          <DocSidebar/>
              <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
              <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome {user?.fullname }</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10   bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span>    <MapPin />
            </span>{ user?.branch}</h1>
                  </div>
                  <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                  <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Homeo Bhagwat Gita
                  </h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
                      <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                      <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                      <button  onClick={() => handleSectionChange("medicine", "/homeo-book-medicine")} className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>MEDICINE NAME</button>
                          <button oonClick={() => handleSectionChange("disease", "/homeo-book-disease")}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='disease'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>DISEASE NAME</button>
                          <button onClick={() => handleSectionChange("redline", "/homeo-book-redline")}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='redline'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>RED LINE SYMPTOMS</button>
                      </div>
                      <div>
                          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 min-w-full border rounded-xl text-zinc-600 text-sm shadow-lg">
                              <div className="flex flex-col gap-4 m-auto">
                              <div className="flex flex-col gap-2">
                  <h1 className='text-black '>Disease Name</h1>
                  <Input icon={AiFillMedicineBox} type="text"  name="name" value={formValues.name} onChange={handleInputChange} placeholder='Enter Disease Name'   required />
                </div>
                              </div>
                              <div className='mt-3 '>
              <h1 className="text-black mb-2  ">Description:</h1>             
 
             <textarea placeholder='Enter Description' name="description" value={formValues.description} onChange={handleInputChange}  className='w-full  h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
                              </div> 
                              <div className='flex item justify-center '>
                              <button
                type="submit"
                className="bg-blue-500 text-lg w-40   transition-all duration-300 cursor-pointer hover:bg-blue-600 p-2 rounded-lg mt-3 text-white"
              >
                Save
                                  </button>
                                  </div>
                      </form>
            </div>
            <div>
              <h1 className='text-3xl mb-3 text-blue-600 font-semibold'>Search</h1>
              <Input onChange={(e) => setSearchTerm(e.target.value)} icon={Search} type="text" name="name" placeholder='Enter Disease Name or description' />
              <div className='w-full flex justify-center sm:justify-end '>
                                <button onClick={()=>generateTablePDF()} className='bg-blue-500  p-2 text-white rounded-md cursor-pointer sm:text-xl mt-5 flex items-center gap-4'>Generate Pdf<FaRegFilePdf size={25} /></button>
                              </div>
            </div>
            <div className="overflow-x-auto p-4 mt-3">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className=''>
                <tr className=" bg-blue-500 text-white text-lg">
                  <th className="py-2 px-4 border">Serial No.</th>
                  <th className="py-2 px-4 border">Disease</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border">Update</th>
                  <th className="py-2 px-4 border">Delete</th>
                  <th className="py-2 px-4 border">PDF</th>
                </tr>
                      </thead>
                      <tbody>
        {filteredDisease.map((disease, idx) => (
          <tr key={idx} className="bg-blue-100">
            <td className="py-3 px-4 border text-center">{idx + 1}</td>
            <td className="py-3 px-4 border text-center">
              {editingRow === idx ? (
                <input
                  value={editedData.name || ""}
                  onChange={(e) => handleChange(e, "name")}
                  className="bg-white border rounded p-1"
                  type="text"
                />
              ) : (
                disease?.name
              )}
            </td>
            <td className="py-3 px-4 border text-center">
              {editingRow === idx ? (
                <textarea
                  value={editedData.description || ""}
                  onChange={(e) => handleChange(e, "description")}
                  onInput={(e) => {
                    e.target.style.height = "auto"; 
                    e.target.style.height = e.target.scrollHeight + "px"; 
                  }}
                  className="bg-white border rounded p-1 w-full resize-none min-h-20"
                  type="text"
                ></textarea>
              ) : (
                disease?.description
              )}
            </td>
            <td className="py-3 px-4 border text-center">
              {editingRow === idx ? (
                <button onClick={handleSave} className="bg-green-500 text-white p-1 rounded">
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditClick(idx, disease)} className="  p-1 rounded">
                  <SquarePen/>
                </button>
              )}
            </td>
            <td onClick={()=>deleteCol(disease?._id)} className="py-3 px-4 border text-center cursor-pointer border-black text-red-500">{ <Trash />}</td>
            <td onClick={() => generatePDF(disease)} className="py-3 px-4 border text-center cursor-pointer">{ <FaRegFilePdf size={25} />}</td>
          </tr>
        ))}
      </tbody>
      
                    </table>
              </div>
                  </div>
            </div>
          </div>
    </div>
  )
}

export default HomeoDisease