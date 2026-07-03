import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Select = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options = [],
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedOption = options.find((option) => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) {
        if (
          event.key === "Enter" ||
          event.key === " " ||
          event.key === "ArrowDown"
        ) {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % options.length);
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(
            (prev) => (prev - 1 + options.length) % options.length,
          );
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          }
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusedIndex, options]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  const handleSelect = (optionValue) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
        className={`border-brand-200 hover:border-brand-300 hover:bg-brand-50 focus:border-brand-500 focus:ring-brand-500 disabled:hover:border-brand-200 flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white ${isOpen ? "border-brand-500 ring-brand-500 ring-2 ring-offset-2" : ""} `}
      >
        <span
          className={`${selectedOption ? "text-brand-600" : "text-brand-400"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`text-brand-400 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="border-brand-200 absolute top-full z-50 mt-1 w-full rounded-md border bg-white shadow-lg"
          role="listbox"
          aria-label="Select options"
        >
          <div className="max-h-60 overflow-auto py-1">
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(el) => (optionRefs.current[index] = el)}
                type="button"
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
                className={`hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 flex w-full items-center px-3 py-2 text-sm transition-colors duration-150 focus:outline-none ${value === option.value ? "bg-brand-50 text-brand-600 font-medium" : "text-brand-600"} ${focusedIndex === index ? "bg-brand-50 text-brand-600" : ""} `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
