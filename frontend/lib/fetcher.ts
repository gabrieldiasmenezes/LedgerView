import { API_CONFIG } from "@/services/api";

export async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_CONFIG.apiKey!
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}

type buildQueryParamsProps={
  filters:FiltersProps,
  endpoint:string
}
export async function buildQueryParams({filters,endpoint}:buildQueryParamsProps) {
  const params = new URLSearchParams()

  if (filters.year) params.append("year", filters.year.toString())
  if (filters.region && filters.region !== "All Regions") params.append("region", filters.region)

  return fetchAPI(`${endpoint}?${params.toString()}`)
}