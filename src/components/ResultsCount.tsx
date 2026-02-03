type ResultCountsProp = {
  totalNumOfResults: number;
};
export default function ResultsCount({ totalNumOfResults }: ResultCountsProp) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumOfResults}</span> results
    </p>
  );
}
