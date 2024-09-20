export const getInventory = async () => {
  const result = await fetch("http://localhost:5000/api/v1/inventory/");

  return result.json();
};
