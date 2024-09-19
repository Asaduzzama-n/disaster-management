"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react"; // Lucide Search Icon

interface FilterOption {
  label: string;
  options: string[];
}

interface SearchBarProps {
  placeholder: string;
  filters: FilterOption[];
  onSearch: (
    searchTerm: string,
    selectedFilters: Record<string, string>
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  filters,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  // Debouncing the search input to avoid too many API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm, selectedFilters);
      console.log("Search Term:", searchTerm);
      console.log("Selected Filters:", selectedFilters);
    }, 500); // Adjust debounce time as needed (500ms delay)

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedFilters, onSearch]);

  const handleFilterChange = (filterLabel: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterLabel]: value,
    }));
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-primary/15 rounded-md p-2 pr-10 focus:outline-none"
        />

        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
          onClick={() => onSearch(searchTerm, selectedFilters)}
        />
      </div>

      {/* Filters */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {filters.map((filter) => (
          <div key={filter.label} className="w-full">
            <label className="block text-sm font-medium ">{filter.label}</label>

            <select
              onChange={(e) => handleFilterChange(filter.label, e.target.value)}
              className="w-full   rounded-md p-2 focus:outline-none"
            >
              <option value="">Select {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
