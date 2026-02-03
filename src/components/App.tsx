import { useState } from "react";
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
  const { jobItems, isLoading, totalNumOfResults } =
    useJobItems(debouncedSearchText);

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
        jobItems={jobItems}
        isLoading={isLoading}
        totalNumOfResults={totalNumOfResults}
      />
    </>
  );
}

export default App;
