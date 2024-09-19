"use client";

import SearchBar from "./search-bar";

export default function SearchSection() {
  const handleSearch = (
    searchTerm: string,
    selectedFilters: Record<string, string>
  ) => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Filters:", selectedFilters);
  };

  const filters = [
    { label: "Severity", options: ["Low", "Medium", "High", "Critical"] },
    { label: "Status", options: ["Approved", "Resolved"] },
  ];
  return (
    <div className="">
      <SearchBar
        placeholder="Search..."
        filters={filters}
        onSearch={handleSearch}
      ></SearchBar>
    </div>
  );
}
