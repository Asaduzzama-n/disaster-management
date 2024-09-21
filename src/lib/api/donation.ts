export const getAllDonations = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/donation/`, {
    next: { revalidate: 30 },
    cache: "no-cache",
  });

  return result.json();
};

export const getSingleDonation = async (id: number) => {
  const result = await fetch(`/donation/${id}`);
  return result.json();
};
