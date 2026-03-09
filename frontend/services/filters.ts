import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetcher";

export default function useFilters({setLoading}:LoadingProps) {
  const [filters, setFilters] = useState<Filters | null>(null);

  useEffect(() => {
    async function loadFilters() {
      const data = await fetchAPI("filters");
      setFilters(data);
      setLoading(false);
    }

    loadFilters();
  }, []);

  return filters ;
}