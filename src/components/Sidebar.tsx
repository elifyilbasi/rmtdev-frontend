import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({
  jobItems,
  isLoading,
  totalNumOfResults,
  onPageChange,
  currentPage,
  totalNumOfPages,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumOfResults={totalNumOfResults} />
        <SortingControls />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <PaginationControls
        onChangePage={onPageChange}
        currentPage={currentPage}
        totalNumOfPages={totalNumOfPages}
      />
    </div>
  );
}
