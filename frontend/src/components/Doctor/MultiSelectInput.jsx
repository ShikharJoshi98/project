import { useState, useEffect, useRef } from "react";

const MultiSelectDropdown = ({Diagnosis }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle selection
  const toggleSelection = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  // Remove from selected items
  const removeOption = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };

  // Filter options based on search term
  const filteredOptions = Diagnosis.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative " ref={dropdownRef}>
      {/* Selected Items */}
      <div
        className="w-full bg-white border p-2 rounded-md flex flex-wrap gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded-md"
            >
              {option}
              <button
                className="ml-2 text-sm font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400">Select options</span>
        )}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border-b focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Options List */}
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`flex items-center px-4 py-2 cursor-pointer ${
                    selectedOptions.includes(option) ? "bg-red-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSelection(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleSelection(option)}
                    className="mr-2 cursor-pointer"
                  />
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown