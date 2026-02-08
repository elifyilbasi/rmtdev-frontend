import { createContext, useContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  return (
    <SearchTextContext
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext>
  );
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useContext(SearchTextContext) must be used within a SearchTextContextProvider",
    );
  }
  return context;
}
