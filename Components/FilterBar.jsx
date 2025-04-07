'use client';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';

export default function FilterBar() {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most Relevant");

  return (
    <div className="flex items-center justify-between border border-gray-300 px-4 py-2">
      {/* Filters Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center font-semibold"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {showFilters ? <FiChevronUp className="ml-1" size={16} /> : <FiChevronDown className="ml-1" size={16} />}
        </button>
        {showFilters && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 p-4 w-56 shadow-lg z-10">
            <p className="font-semibold border-b mb-2 pb-1">Filters:</p>
            {['Price', 'Type', 'Equipment', 'Material'].map((label) => (
              <div key={label} className="border-b py-2">
                <button className="flex justify-between w-full text-left">
                  {label}: <FiChevronDown size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className=" w-96 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-1.5 rounded-full border border-gray-300 focus:outline-none"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FiSearch/>
          </span>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSortOptions(!showSortOptions)}
          className="flex items-center font-semibold"
        >
          Sort By <FiChevronDown className="ml-1" size={16} />
        </button>
        {showSortOptions && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48 z-10">
            {['Most Relevant', 'Price: Low to High', 'Price: High to Low'].map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option}
                  checked={selectedSort === option}
                  onChange={() => {
                    setSelectedSort(option);
                    setShowSortOptions(false);
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
