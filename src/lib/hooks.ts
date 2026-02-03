import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
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

export function useJobItem(activeId: number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeJobItem, setActiveJobItem] = useState<JobItemExpanded | null>(
    null,
  );

  useEffect(() => {
    if (!activeId) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${activeId}`);
      const data = await response.json();
      setIsLoading(false);
      setActiveJobItem(data.jobItem);
    };

    fetchData();
  }, [activeId]);
  return [activeJobItem, isLoading] as const;
}
