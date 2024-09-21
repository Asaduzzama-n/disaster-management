const baseurl = process.env.NEXT_PUBLIC_BASEURL;

export const getInventory = async () => {
  const result = await fetch(`${baseurl}/inventory/`, {
    next: { revalidate: 30 },
    cache: "no-cache",
  });

  return result.json();
};
