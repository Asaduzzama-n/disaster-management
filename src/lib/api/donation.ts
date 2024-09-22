export const getAllDonations = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/donation/`, {
    cache: "no-cache",
  });

  return result.json();
};

export const getSingleDonation = async (id: number) => {
  const result = await fetch(`/donation/${id}`);
  return result.json();
};
