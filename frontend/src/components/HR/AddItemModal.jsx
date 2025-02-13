import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useStore } from "../../store/UpdateStore";

const AddItemModal = ({ onClose }) => {
  const { getItems, items, units, getUnits, AddItem, AddUnit } = useStore();
  const [NewItem, setitem] = useState("");
    const [NewUnit, setunit] = useState("");
    const [searchitemTerm, setSearchitemTerm] = useState("");
    const [searchunitTerm, setSearchunitTerm] = useState("");

    const filteredItems = items.filter(item =>
        item.itemName.toLowerCase().includes(searchitemTerm.toLowerCase())
    );
    const filteredUnits = units.filter(unit =>
        unit.unit.toLowerCase().includes(searchunitTerm.toLowerCase())
      );
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    getUnits();
  }, [getUnits]);

  async function additem(e) {
    e.preventDefault();
    try {
      await AddItem(NewItem);
      alert("Item added");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addunit(e) {
    e.preventDefault();
    try {
      await AddUnit(NewUnit);
      alert("Unit added");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] overflow-y-auto   flex flex-col w-full max-w-2xl rounded-xl p-6 md:p-10 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          Add Items/Unit List
        </h1>

        {/* Forms Container */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Item Form */}
          <div className="bg-white p-5 rounded-lg w-full">
            <form onSubmit={additem}>
              <h1 className="text-black mb-3 text-lg font-semibold">Item Name</h1>
              <Input
                onChange={(e) => setitem(e.target.value)}
                icon={Plus}
                type="text"
                placeholder="Mention Item Name"
              />
              <button
                type="submit"
                className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white"
              >
                Add
              </button>
            </form>
          </div>

          {/* Unit Form */}
          <div className="bg-white p-5 rounded-lg w-full">
            <form onSubmit={addunit}>
              <h1 className="text-black mb-3 text-lg font-semibold">Unit Name</h1>
              <Input
                onChange={(e) => setunit(e.target.value)}
                icon={Plus}
                type="text"
                placeholder="Mention Unit Name"
              />
              <button
                type="submit"
                className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white"
              >
                Add
              </button>
            </form>
          </div>
        </div>

        {/* Lists Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Item List */}
          <div className="bg-white p-5 rounded-lg w-full">
            <h1 className="text-black mb-3 text-lg font-semibold">Items List (Search Here)</h1>
                      <select
                          value={searchitemTerm}
                          onChange={(e) => setSearchitemTerm(e.target.value)}
              name="select item"
              id="item-select"
              className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                      >
                          <option value="">Select Items</option>
              {items.map((item, index) => (
                <option key={index}>{item?.itemName}</option>
              ))}
            </select>
          </div>

          {/* Unit List */}
          <div className="bg-white p-5 rounded-lg w-full">
            <h1 className="text-black mb-3 text-lg font-semibold">Unit List (Search Here)</h1>
                      <select
                          value={searchunitTerm}
                          onChange={(e) => setSearchunitTerm(e.target.value)}
              name="select unit"
              id="unit-select"
              className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                      >
                          <option value="">Select Units</option>
              {units.map((el, index) => (
                <option key={index}>{el?.unit}</option>
              ))}
            </select>
          </div>
              </div>
              <div className="flex mt-6 gap-6">
              <div className="overflow-x-auto max-h-60 w-full">
            <table className="min-w-full border  border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        filteredItems.map((item, index) => (
                            <tr key={index} className="border-b bg-gray-300 border-gray-500">
                                <td className="px-4 py-2">{item?.itemName}</td>
                            </tr>
                        ))
                     }
                </tbody>
            </table>
                  </div>
                  <div className="overflow-x-auto  max-h-60 w-full">
            <table className="min-w-full border  border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Unit Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUnits.map((unit, index) => (
                            <tr key={index} className="border-b bg-gray-300 border-gray-500">
                                <td className="px-4 py-2">{unit?.unit}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
              </div>
      </div>
    </div>
  );
};

export default AddItemModal;
