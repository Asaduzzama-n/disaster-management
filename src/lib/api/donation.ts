export const getAllDonations = async () => {
  const result = await fetch("/donation/", {
    next: { revalidate: 30 },
  });

  return result.json();
};

export const getSingleDonation = async (id: number) => {
  const result = await fetch(`/donation/${id}`);
  return result.json();
};
