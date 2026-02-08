import { useJobItemsContext } from "../contexts/JobItemsContextProvider";
import JobList from "./JobList";

// wrapper for reusable JobList component
export default function JobListSearch() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
