import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useProvidersControllerGetSuggestions } from "@/apis/generated";
import { useAppContext } from "@/context/AppContext";

const SearchProviders = () => {
  const { mutate: mutateSuggestions, data, isPending: isSuggestionsLoading } =
    useProvidersControllerGetSuggestions();

  const [response, setResponse] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [userSelectedOption, setUserSelectedOption] = useState(false);

  const { state, dispatch } = useAppContext();
  const [servicesArray, setServicesArray] = useState([
    {
      checked: "",
      name: "Cleaner",
      description: "Choose from various ser Service done",
      img: "",
      type: "cleaning",
    },
    {
      checked: "",
      name: "Handyman",
      description: "Deep Clean, Move ot cleaning, Win",
      img: "",
      type: "Service",
    },
  ]);
  const handleSelect = (index) => {
    setServicesArray((prevServices) =>
      prevServices.map((service, i) => ({
        ...service,
        checked: i === index, // Only the clicked item will be checked, others will be unchecked
      }))
    );
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setResponse(data); // Ensure it's an array
      if (search && !userSelectedOption) {
        setShowDropdown(true);
      }
     
    } else {
      setResponse([]); // Reset if no valid data
      setShowDropdown(false);
    }
  }, [data,search]);
console.log(state.searchedLocation);

  useEffect(() => {
    if (!search) return setResponse([]); // Avoid calling API on empty search

    const delayDebounceFn = setTimeout(() => {
      mutateSuggestions({ data: { place: search } });
    }, 300); 

    return () => clearTimeout(delayDebounceFn); // Cleanup on re-typing
  }, [search]); 

  const handleInputChange = (e) => {
    dispatch({ type: "SET_SEARCHED_LOCATION", payload: e.target.value});
    setSearch(e.target.value);
    setUserSelectedOption(false);
  };

  const handleSelectSuggestion = (option) => {
    dispatch({ type: "SET_SEARCHED_LOCATION", payload: option.description });
    setSearch(option.description);
    setShowDropdown(false);
    setUserSelectedOption(true); // Mark that user manually selected an option

  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < response.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleSelectSuggestion(response[selectedIndex]);
    }
  };

console.log(showDropdown);

  return (
    <div className="search_container">
      <div className="search_input">
        <input
          type="text"
          value={search}
          placeholder="Start by typing your postcode"
          onChange={(e) => { handleInputChange(e) }}
          onKeyDown={handleKeyDown}
        />
        {showDropdown && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              left: 0,
              height:"50px",
              width: "100%",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              listStyle: "none",
              padding: "0",
              margin: "0",
              zIndex: 10000,
              display: response.length <= 0 && "none",
             
            }}
          >
            {response && response.map((option, index) => (
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
            ))}
          </ul>
        )}
      </div>
      <div className="select_service">
        <p>Select the service type</p>
        <div className="choose_service">
          {servicesArray.map((service, index) => (
            <div
              key={index}
              className="service_box"
              style={{
                backgroundColor: service.checked ? "#FFFFFF" : "#D9D9D9",
              }}
            >
              <span
                className="checkbox"
                style={{
                  border: service.checked
                    ? "5px solid #00a699"
                    : "5px solid #ffffff",
                }}
                onClick={() => handleSelect(index)}
              />
              <p className="description">{service.description} </p>
              <div className="serviceAndImg">
                <p
                  className="service_name"
                  style={{ color: service.checked ? "#00A699" : "#151515CC" }}
                >
                  {service.name}
                </p>
                <img src="a" alt="img" />
              </div>
              <button className="select_type_btn">
                {service.type} type{" "}
                <span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="search_button">
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchProviders;
