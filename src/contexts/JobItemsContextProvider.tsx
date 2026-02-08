import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useSearchQuery } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, JobItem } from "../lib/types";
import { useSearchTextContext } from "./SearchTextContextProvider";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumOfResults: number;
  totalNumOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumOfResults = jobItems?.length || 0;
  const totalNumOfPages = totalNumOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems],
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE,
      ),
    [currentPage, jobItemsSorted],
  );

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumOfResults,
      totalNumOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumOfResults,
      totalNumOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ],
  );

  return <JobItemsContext value={contextValue}>{children}</JobItemsContext>;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useContext(JobItemsContext) must be used within a JobItemsContextProvider",
    );
  }
  return context;
}
