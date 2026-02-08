import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
  jobItems,
  isLoading,
  totalNumOfResults,
  onPageChange,
  currentPage,
  totalNumOfPages,
  handleChangeSortBy,
  sortBy,
}) {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        isLoading={isLoading}
        totalNumOfResults={totalNumOfResults}
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalNumOfPages={totalNumOfPages}
        handleChangeSortBy={handleChangeSortBy}
        sortBy={sortBy}
      />
      <JobItemContent />
    </div>
  );
}
