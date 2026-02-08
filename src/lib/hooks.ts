import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import toast from "react-hot-toast";

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
    let message = `Request failed ${res.status}`;
    try {
      const data = await res.json();
      message = data?.description || data?.message || message;
    } catch {}
    throw new Error(message);
  }
  const data = await res.json();
  return data;
};

const fetchJobItems = async (
  searchText: string,
): Promise<JobItemsApiResponse> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!res.ok) {
    let message = `Request failed ${res.status}`;
    try {
      const data = await res.json();
      message = data?.description || data?.message || message;
    } catch {}
    throw new Error(message);
  }
  const data = await res.json();
  return data;
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
      toast.error(error.message);
    }
  }, [isError, error]);

  return { activeJobItem: data?.jobItem, isLoading } as const;
}

export function useSearchQuery(searchText: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    enabled: Boolean(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return { jobItems: data?.jobItems, isLoading } as const;
}

export function useJobItems(ids: number[]) {
  const result = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    })),
  });
  const jobItems = result
    .map((item) => item.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  const isLoading = result.some((item) => item.isLoading);
  return { jobItems, isLoading };
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

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)),
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
