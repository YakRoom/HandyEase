"use client";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import {
  useProvidersControllerGetSuggestions,
  useProvidersControllerSearchProviders,
} from "@/apis/generated";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import GreyPaper from "../ui/grey-paper";
import SelectorCard from "../SelectorCard";
import WorkerDescriptionCard from "../WorkerDescriptionCard";
import thumbnail from "@/public/images/thumbnail.png";

const Home: FC = () => {
  const { mutate, data, isPending } = useProvidersControllerSearchProviders();
  const { mutate: mutateSuggestions, isPending: isSuggestionsLoading } =
    useProvidersControllerGetSuggestions();
  const [address, setAddress] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [locationId, setLocationId] = useState("ChIJpSjxAwbXCDkRhHl5x_m4mzU");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (locationId) {
      mutate(
        { data: { locationId } },
        {
          onError: (err) => {
            setError("Unable to find providers. Please try again later.");
            console.error("Provider search failed:", err);
          },
          onSettled: () => setIsSearching(false),
        }
      );
    }
  }, [locationId, mutate]);

  const handleSearch = useCallback(async () => {
    setError("");
    if (!address) {
      setError("Please enter an address");
      return;
    }

    setIsSearching(true);
    try {
      await mutateSuggestions({
        data: { place: address },
      });

      // setLocationId(response.locationId);
      setViewAll(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
      // setIsSearching(false);
    }
  }, [address, mutateSuggestions]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setAddress(e?.target?.value);
  };

  const providers = data?.providers ?? [];
  const providersList = viewAll ? providers : providers.slice(0, 2);
  const totalProviders = providers.length;

  return (
    <GreyPaper>
      <span className="text-4xl font-bold ma">Get it done with Handymate</span>
      <div className="text-xl text-gray-600 mt-4">
        Direct contact, no commission and faster results.
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <div>
          <Input
            placeholder="Start by typing your address"
            type="text"
            className={`bg-stone-200 h-11 ${error ? "border-red-500" : ""}`}
            value={address}
            onChange={handleAddressChange}
            onKeyPress={handleKeyPress}
            aria-label="Address input"
            aria-invalid={!!error}
            aria-describedby={error ? "address-error" : undefined}
            disabled={isSearching || isPending || isSuggestionsLoading}
          />
          {error && (
            <div
              id="address-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {error}
            </div>
          )}
          {(isSearching || isSuggestionsLoading) && (
            <div
              className="text-gray-600 text-sm mt-1"
              role="status"
              aria-live="polite"
            >
              {isSearching
                ? "Finding providers in your area..."
                : "Finding your location..."}
            </div>
          )}
        </div>
        <div>Select the service type</div>
        <SelectorCard />
        <Button
          className="w-full"
          onClick={handleSearch}
          isLoading={isSearching || isPending || isSuggestionsLoading}
          loadingText={
            isSearching
              ? "Finding providers..."
              : isSuggestionsLoading
              ? "Finding location..."
              : "Searching..."
          }
          aria-label="Search for service providers"
        >
          Search
        </Button>
        {!viewAll && (
          <Image
            src={thumbnail}
            alt="Handymate service illustration"
            height={500}
            className="w-full"
          />
        )}
        {isPending ? (
          <div className="text-center p-8 border border-[#D9D9D9] rounded-[10px] bg-white">
            <div className="text-2xl font-bold text-gray-800">
              Loading providers...
            </div>
            <p className="text-gray-600 mt-3">
              Please wait while we find service providers in your area
            </p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          </div>
        ) : viewAll && !providersList.length ? (
          <div
            className="text-center p-8 border border-[#D9D9D9] rounded-[10px] bg-white"
            role="alert"
          >
            <div className="text-2xl font-bold text-gray-800">
              No Service Providers Found
            </div>
            <p className="text-gray-600 mt-3 mb-4">
              Try searching with a different location or service type
            </p>
            <Button
              className="bg-white text-black border border-gray-200"
              onClick={() => setViewAll(false)}
              aria-label="Return to explore view"
              variant="outline"
            >
              Back to Explore
            </Button>
          </div>
        ) : (
          !!providersList.length && (
            <div className="border border-[#D9D9D9] rounded-[10px] p-[20px] gap-6 flex flex-col">
              {viewAll ? (
                <span>
                  Showing {totalProviders}{" "}
                  {totalProviders === 1 ? "result" : "results"}
                </span>
              ) : (
                <div className="text-2xl font-bold">Explore Nearby</div>
              )}
              <div role="list" aria-label="Service providers">
                {providersList.map((user) => {
                  return (
                    <div key={user.id} role="listitem">
                      <WorkerDescriptionCard {...user} />
                    </div>
                  );
                })}
              </div>
              {!viewAll && totalProviders > 2 && (
                <Button
                  className="w-full bg-white text-black"
                  onClick={() => setViewAll(true)}
                  aria-label={`View all ${totalProviders} service providers`}
                  variant="outline"
                >
                  View all
                </Button>
              )}
            </div>
          )
        )}
      </div>
    </GreyPaper>
  );
};

export default Home;
