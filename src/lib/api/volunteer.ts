export const getVolunteers = async (
  filterField: string,
  searchTerm: string
) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASEURL}/user/?searchTerm=${searchTerm}`;

  // Append filterField only if it's not empty
  const url = filterField ? `${baseUrl}&${filterField}` : baseUrl;
  const result = await fetch(url, { next: { revalidate: 60 } });

  return result.json();
};
