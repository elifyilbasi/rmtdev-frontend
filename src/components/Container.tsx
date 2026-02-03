import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({ jobItems, isLoading, totalNumOfResults }) {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        isLoading={isLoading}
        totalNumOfResults={totalNumOfResults}
      />
      <JobItemContent />
    </div>
  );
}
