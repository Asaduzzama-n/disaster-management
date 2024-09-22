/* eslint-disable @typescript-eslint/no-explicit-any */
const formatDate = (dateStr: string | number | Date): string =>
  new Date(dateStr).toISOString().split("T")[0];

export const aggregateData = (donations: any, inventories: any) => {
  const donationTotals = donations.reduce(
    (
      acc: { [key: string]: number },
      donation: { createdAt: string | number | Date; amount: number }
    ) => {
      const day = formatDate(donation.createdAt);
      if (!acc[day]) acc[day] = 0;
      acc[day] += donation.amount;
      return acc;
    },
    {}
  );

  const expenseTotals = inventories.reduce(
    (
      acc: { [key: string]: number },
      expense: { createdAt: string | number | Date; price: number }
    ) => {
      const day = formatDate(expense.createdAt);
      if (!acc[day]) acc[day] = 0;
      acc[day] += expense.price;
      return acc;
    },
    {}
  );

  const fullChartData = Object.keys({ ...donationTotals, ...expenseTotals })
    .sort()
    .map((day) => ({
      day,
      donation: donationTotals[day] || 0,
      expense: expenseTotals[day] || 0,
    }));

  return fullChartData;
};
