import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItem = async (activeId: number): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${activeId}`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

const fetchJobItems = async (
  searchText: string,
): Promise<JobItemsApiResponse> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data.jobItems;
};

export function useJobItem(activeId: number | null) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["job-item", activeId],
    enabled: activeId != null,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,

    queryFn: () => (activeId ? fetchJobItem(activeId) : null),
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  return { activeJobItem: data?.jobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    enabled: Boolean(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { jobItems: data, isLoading } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashchange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashchange();
    window.addEventListener("hashchange", handleHashchange);
    return () => {
      window.removeEventListener("hashchange", handleHashchange);
    };
  }, []);

  return activeId;
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
