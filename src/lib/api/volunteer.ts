export const getVolunteers = async (
  filterField: string,
  searchTerm: string
) => {
  const baseUrl = `http://localhost:5000/api/v1/user/?searchTerm=${searchTerm}`;

  // Append filterField only if it's not empty
  const url = filterField ? `${baseUrl}&${filterField}` : baseUrl;
  const result = await fetch(url);

  return result.json();
};
