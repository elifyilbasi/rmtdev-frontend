import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Background from "./Background";
import Container from "./Container";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import { useDebounce, useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  const totalNumOfResults = jobItems?.length || 0;
  const totalNumOfPages = totalNumOfResults / 7;
  const jobItemsSliced =
    jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || [];

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container
        jobItems={jobItemsSliced}
        isLoading={isLoading}
        totalNumOfResults={totalNumOfResults}
        onPageChange={handleChangePage}
        currentPage={currentPage}
        totalNumOfPages={totalNumOfPages}
      />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
