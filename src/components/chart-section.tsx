"use client";

import { useEffect, useState } from "react";
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
import { getAllDonations } from "@/lib/api/donation";
import { getInventory } from "@/lib/api/inventory";
import { aggregateData } from "@/utils/data-aggregation-helper";

export const description = "A multiple bar chart";

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
  const [chartData, setChartData] = useState([]);

  // Filter data based on the selected time range
  const filteredData = chartData.slice(-timeRange);

  const handleSelectChange = (value: string) => {
    setTimeRange(Number(value));
  };

  const getAllDonationAndInventory = async () => {
    const result = await getAllDonations();
    const donations = result.data;

    const res = await getInventory();
    const inventories = res.data;

    const fullChartData = aggregateData(donations, inventories);

    setChartData(fullChartData);
  };

  useEffect(() => {
    getAllDonationAndInventory();
  }, []);

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
