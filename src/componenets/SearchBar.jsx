import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useSearch } from "../context/SearchContext";

export default function SearchBar() {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    closeSearch();
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeSearch]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`bg-brand-200 fixed top-0 right-0 left-0 z-50 w-full shadow-md transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto grid grid-cols-[1fr_auto] justify-items-center gap-3 p-4">
        <div className="relative w-full max-w-3xl flex-1 rounded-full bg-white">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Our Store..."
            className="w-full flex-1 border-none px-4 py-2 pr-12 outline-none"
            autoFocus
          />
          <button
            onClick={handleSearch}
            className="border-brand-500 text-brand-600 absolute top-1/2 right-1 -translate-y-1/2 rounded-full border p-2"
          >
            <HiMagnifyingGlass className="h-4 w-4 text-inherit" />
          </button>
        </div>
        <button
          onClick={closeSearch}
          className="ml-auto rounded p-2 hover:bg-gray-100"
        >
          <HiXMark className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
