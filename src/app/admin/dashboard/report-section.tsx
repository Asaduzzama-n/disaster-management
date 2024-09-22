/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReportModal from "@/components/report-modal";
import { generatePeriodReport } from "@/utils/generate-report-helper";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
export default function ReportSection({
  donations,
  inventories,
}: {
  donations: any;
  inventories: any;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportData, setReportData] = useState<any[]>([]);
  const handleSelect = (range: any) => {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handlePeriodicReport = () => {
    console.log("Generating report...");
    const std = new Date(startDate).toISOString().split("T")[0];
    const end = new Date(endDate).toISOString().split("T")[0];
    const report = generatePeriodReport(donations, inventories, std, end);
    console.log("Generated report:", report); // Check the structure and content
    setReportData(report);
  };

  return (
    <div>
      <div className="py-2 flex justify-center items-center mt-4">
        <DateRangePicker
          className="w-5/6 custom-datePicker"
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePeriodicReport}>
          <ReportModal
            data={reportData}
            handlePeriodicReport={handlePeriodicReport}
          ></ReportModal>
        </button>
      </div>
    </div>
  );
}
