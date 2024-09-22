import { aggregateData } from "./data-aggregation-helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateDailyReport = (
  donations: any,
  inventories: any,
  reportDate: string
) => {
  const fullChartData = aggregateData(donations, inventories);
  const dailyReport = fullChartData.find((data) => data.day === reportDate);

  return {
    day: dailyReport?.day,
    donation: dailyReport?.donation,
    expense: dailyReport?.expense,
    balance: dailyReport?.donation - dailyReport?.expense,
  };
};

export const generatePeriodReport = (
  donations: any,
  inventories: any,
  startDate: string,
  endDate: string
) => {
  const fullChartData = aggregateData(donations, inventories);
  const periodReport = fullChartData.filter(
    (data) => data.day >= startDate && data.day <= endDate
  );
  return periodReport;
};

export const downloadCSV = (filename: string, rows: string[][]) => {
  const csvContent =
    "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
