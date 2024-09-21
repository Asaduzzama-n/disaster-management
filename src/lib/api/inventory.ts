export const getInventory = async () => {
  const result = await fetch("/inventory/");

  return result.json();
};
