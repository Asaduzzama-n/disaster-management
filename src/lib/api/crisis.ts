export const getAllCrisis = async () => {
  const result = await fetch("http://localhost:5000/api/v1/crisis/");

  return result.json();
};
