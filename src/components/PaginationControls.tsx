import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onChangePage: (direction: "next" | "previous") => void;
  currentPage: number;
  totalNumOfPages: number;
};

export default function PaginationControls({
  onChangePage,
  currentPage,
  totalNumOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onChangePage={() => onChangePage("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage < totalNumOfPages && (
        <PaginationButton
          onChangePage={() => onChangePage("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onChangePage: () => void;
};
function PaginationButton({
  direction,
  currentPage,
  onChangePage,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onChangePage();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          <ArrowRightIcon /> Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
