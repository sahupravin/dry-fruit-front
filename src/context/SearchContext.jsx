import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen((prev) => !prev);

  return (
    <SearchContext.Provider
      value={{ isOpen, openSearch, closeSearch, toggleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

//eslint-disable-next-line
export function useSearch() {
  return useContext(SearchContext);
}
