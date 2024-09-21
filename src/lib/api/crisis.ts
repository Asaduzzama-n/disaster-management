const baseurl = process.env.NEXT_PUBLIC_BASEURL;

export const getAllCrisis = async () => {
  const result = await fetch(`${baseurl}/crisis/`);

  return result.json();
};
