const baseurl = process.env.NEXT_PUBLIC_BASEURL;

interface CrisisQueryParams {
  searchTerm?: string;
  severity?: string;
  status?: string;
  limit?: number;
  sortBy?: string;
}

export const getAllCrisis = async (params?: CrisisQueryParams) => {
  const url = new URL(`${baseurl}/crisis/`);

  if (params?.searchTerm)
    url.searchParams.append("searchTerm", params.searchTerm);
  if (params?.severity) url.searchParams.append("severity", params.severity);
  if (params?.status) url.searchParams.append("status", params.status);
  if (params?.limit) url.searchParams.append("limit", params.limit?.toString());
  if (params?.sortBy) url.searchParams.append("sortBy", params.sortBy);

  const result = await fetch(url.toString(), {
    cache: "no-cache",
  });
  return result.json();
};

export const getSingleCrisis = async (id: number) => {
  const result = await fetch(`${baseurl}/crisis/${id}`).then((res) =>
    res.json()
  );
  return result;
};
