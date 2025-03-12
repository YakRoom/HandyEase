import React, { useEffect, useState } from "react";
import "./style.css";
import { useProvidersControllerGetSuggestions } from "@/apis/generated";
import { Input } from "../ui";

const SearchProviders = (props) => {
  const { searchedLocation, onSelect } = props;
  const { mutate: mutateSuggestions, data } =
    useProvidersControllerGetSuggestions();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [search, setSearch] = useState(searchedLocation || "");

  useEffect(() => {
    if (!search) return; // Avoid calling API on empty search

    const delayDebounceFn = setTimeout(() => {
      mutateSuggestions({ data: { place: search } });
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup on re-typing
  }, [search]);

  const handleSelectSuggestion = (option) => {
    onSelect(option);
    setSearch(option.description);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < data?.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleSelectSuggestion(data[selectedIndex]);
    }
  };

  return (
    <div className="search_input w-full">
      <Input
        value={search}
        className="w-full"
        placeholder="Start by typing your postcode"
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            height: "50px",
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            listStyle: "none",
            padding: "0",
            margin: "0",
            zIndex: 10000,
            display: data?.length <= 0 && "none",
          }}
        >
          {data ? (
            data.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(option)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedIndex === index ? "#f0f0f0" : "white",
                }}
              >
                {option.description}
              </li>
            ))
          ) : (
            <li
              style={{
                padding: "10px",
                textAlign: "center",
                color: "#666",
              }}
            >
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchProviders;
