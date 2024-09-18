"use client";

import { useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A multiple bar chart";

// Simulate daily data for the last 30 days
const fullChartData = [
  { day: "2024-08-01", donation: 186, expense: 80 },
  { day: "2024-08-02", donation: 305, expense: 200 },
  { day: "2024-08-03", donation: 237, expense: 120 },
  { day: "2024-08-04", donation: 73, expense: 190 },
  { day: "2024-08-05", donation: 209, expense: 130 },
  { day: "2024-08-06", donation: 214, expense: 140 },
  { day: "2024-08-07", donation: 170, expense: 100 },
  { day: "2024-08-08", donation: 145, expense: 80 },
  { day: "2024-08-09", donation: 200, expense: 120 },
  { day: "2024-08-10", donation: 175, expense: 90 },
  { day: "2024-08-11", donation: 230, expense: 150 },
  { day: "2024-08-12", donation: 250, expense: 180 },
  { day: "2024-08-13", donation: 220, expense: 170 },
  { day: "2024-08-14", donation: 215, expense: 150 },
  { day: "2024-08-15", donation: 198, expense: 120 },
  { day: "2024-08-16", donation: 170, expense: 130 },
  { day: "2024-08-17", donation: 210, expense: 100 },
  { day: "2024-08-18", donation: 195, expense: 140 },
  { day: "2024-08-19", donation: 175, expense: 110 },
  { day: "2024-08-20", donation: 200, expense: 130 },
  { day: "2024-08-21", donation: 240, expense: 140 },
  { day: "2024-08-22", donation: 220, expense: 150 },
  { day: "2024-08-23", donation: 195, expense: 120 },
  { day: "2024-08-24", donation: 180, expense: 130 },
  { day: "2024-08-25", donation: 190, expense: 110 },
  { day: "2024-08-26", donation: 230, expense: 140 },
  { day: "2024-08-27", donation: 210, expense: 150 },
  { day: "2024-08-28", donation: 205, expense: 160 },
  { day: "2024-08-29", donation: 215, expense: 170 },
  { day: "2024-08-30", donation: 225, expense: 180 },
];

const chartConfig = {
  donation: {
    label: "Donations",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartSection() {
  const [timeRange, setTimeRange] = useState(7); // Default to 30 days

  // Filter data based on the selected time range
  const filteredData = fullChartData.slice(-timeRange);

  const handleSelectChange = (value: string) => {
    setTimeRange(Number(value));
  };

  return (
    <div className="p-4 ">
      <div className="">
        <div className="flex justify-between items-center mb-10">
          <p className="font-bold text-2xl mr-2 sm:mr-0">
            Daily donation and expenses.
          </p>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="15">Last 15 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <ChartContainer className=" min-h-40" config={chartConfig}>
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="donation" fill="var(--color-donation)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
