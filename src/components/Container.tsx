import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
  jobItems,
  isLoading,
  totalNumOfResults,
  onPageChange,
  currentPage,
  totalNumOfPages,
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
      />
      <JobItemContent />
    </div>
  );
}
