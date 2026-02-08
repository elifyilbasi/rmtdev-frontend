import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleToggleBookmark(id);
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`
        ${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
