export const getAllDonations = async () => {
  const result = await fetch("http://localhost:5000/api/v1/donation/", {
    next: { revalidate: 30 },
  });

  return result.json();
};

export const getSingleDonation = async (id: number) => {
  const result = await fetch(`http://localhost:5000/api/v1/donation/${id}`);
  return result.json();
};
