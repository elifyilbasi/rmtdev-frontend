import { SortBy } from "../lib/types";

type SortingControlsProps = {
  handleChangeSortBy: (newSortBy: SortBy) => void;
  sortBy: SortBy;
};

export default function SortingControls({
  handleChangeSortBy,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => handleChangeSortBy("relevant")}
        className={`sorting__button sorting__button--relevant ${sortBy === "relevant" ? "sorting__button--active" : ""}`}
      >
        Relevant
      </button>

      <button
        onClick={() => handleChangeSortBy("recent")}
        className={`sorting__button sorting__button--recent ${sortBy === "recent" ? "sorting__button--active" : ""}`}
      >
        Recent
      </button>
    </section>
  );
}
