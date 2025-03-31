import {
  FC,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { useProvidersControllerGetSuggestions } from "@/apis/generated";
import { Input } from "@/components/ui";
import { MapPin } from "lucide-react";
import Close from "@/public/images/close.svg";
import Image from "next/image";

interface SearchProvidersProps {
  searchedLocation?: string;
  onSelect: (option: LocationSuggestion) => void;
  className?: string;
}

interface LocationSuggestion {
  description: string;
  place_id: string;
}

const SearchProviders: FC<SearchProvidersProps> = ({
  searchedLocation,
  setViewAll,
  onSelect,
  className = "",
}) => {
  const {
    mutate: mutateSuggestions,
    data,
    isPending,
  } = useProvidersControllerGetSuggestions();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [search, setSearch] = useState(searchedLocation || "");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!search) return;

    const delayDebounceFn = setTimeout(() => {
      mutateSuggestions({ data: { place: search } });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, mutateSuggestions]);

  const handleSelectSuggestion = (option: LocationSuggestion) => {
    onSelect(option);
    setSearch(option.description);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!data?.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      e.preventDefault();
      handleSelectSuggestion(data[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
    setSelectedIndex(-1);
    setViewAll(false)
  };

  return (
    <div
      className={`relative ${className}`}
      ref={searchRef}
      role="combobox"
      aria-expanded={showDropdown}
      aria-haspopup="listbox"
      aria-controls="location-suggestions"
    >
      <div className="relative">
        {search.length === 0 && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-8 text-neutral-500 flex items-center justify-center">
  <MapPin className="h-5" />
          </div>
        
        )}
        <Input
          value={search}
          className={`form-input ${search.length === 0 && "location_form_input"}`}
          placeholder="Enter your postcode"
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          aria-label="Search location"
          aria-autocomplete="list"
          aria-controls="location-suggestions"
          aria-activedescendant={
            selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
          }
        />
        {
            search.length > 0 &&
          (<div
            className="absolute right-0 h-full top-0  w-7 flex items-center justify-center"
            onClick={() => setSearch("")}
            >
    
          
              <Image
              src={Close}
              alt="Close"
              height={26}
              width={26}
              className="w-3"
            />
        
          </div>)
        }

        {/* <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 rounded-full bg-gray-200 p-1"
        onClick={()=>setSearch("")}>
        <Image
          src={Close}
          alt="Close"
          height={26}
          width={26}
          className="bg-gray-200"
        />
        </div> */}
      </div>

      {showDropdown && search && (
        <ul
          id="location-suggestions"
          className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-neutral-200 shadow-lg max-h-[300px] overflow-y-auto"
          role="listbox"
          aria-label="Location suggestions"
        >
          {isPending ? (
            <li
              className="px-4 py-3 text-sm text-neutral-600 text-center"
              role="status"
            >
              Searching locations...
            </li>
          ) : data?.length ? (
            data.map((option, index) => (
              <li
                key={option.place_id}
                id={`option-${index}`}
                role="option"
                aria-selected={selectedIndex === index}
                className={`px-4 py-3 text-sm cursor-pointer flex items-center gap-2 transition-colors
                  ${
                    selectedIndex === index
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                onClick={() => handleSelectSuggestion(option)}
              >
                <MapPin className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                <span className="truncate">{option.description}</span>
              </li>
            ))
          ) : (
            <li
              className="px-4 py-3 text-sm text-neutral-600 text-center"
              role="status"
            >
              No locations found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchProviders;
