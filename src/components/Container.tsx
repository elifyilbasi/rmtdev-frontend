import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({ jobItems, isLoading }) {
  return (
    <div className="container">
      <Sidebar jobItems={jobItems} isLoading={isLoading} />
      <JobItemContent />
    </div>
  );
}
