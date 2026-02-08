import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function ResultsCount() {
  const { totalNumOfResults } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{totalNumOfResults}</span> results
    </p>
  );
}
