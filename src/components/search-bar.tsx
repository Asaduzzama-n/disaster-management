"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react"; // Lucide Search Icon

interface FilterOption {
  label: string;
  options: string[];
}

interface SearchBarProps {
  placeholder: string;
  filtersField: FilterOption[];
  onSearch: (
    searchTerm: string,
    selectedFilters: Record<string, string>
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  filtersField,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  const apiFilterKeys: Record<string, string> = {
    Severity: "severity",
    Status: "status",
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm, selectedFilters);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedFilters, onSearch]);

  const handleFilterChange = (filterLabel: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [apiFilterKeys[filterLabel]]: value,
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
      <div className="mt-4 grid grid-cols-1 gap-4 ">
        {filtersField.map((filtersField) => (
          <div key={filtersField.label} className="w-full">
            <label className="block text-sm font-medium">
              {filtersField.label}
            </label>

            <select
              onChange={(e) =>
                handleFilterChange(filtersField.label, e.target.value)
              }
              className="w-full rounded-md p-2 focus:outline-none"
            >
              <option className="text-center font-medium" value="">
                Select {filtersField.label}
              </option>
              {filtersField.options.map((option) => (
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
