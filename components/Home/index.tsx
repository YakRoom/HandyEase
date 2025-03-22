"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  useProvidersControllerGetServiceTypes,
  useProvidersControllerSearchProviders,
} from "@/apis/generated";
import { Button } from "../ui/button";
import GreyPaper from "../ui/grey-paper";
import WorkerDescriptionCard from "../WorkerDescriptionCard";
import thumbnail from "@/public/images/thumbnail.png";
import SearchProviders from "../SearchProviders";
import Services from "../Services";
import { useAppContext } from "@/context/AppContext";
import SelectorCard from "../SelectorCard";
import HandymenIcon from "@/public/images/handymen-icon";
import CleanerIcon from "@/public/images/cleaner-icon";

const serviceTypes = [
  {
    name: "Cleaner",
    description: "Choose from various Service done",
    img: <CleanerIcon />,
    label: "Cleaning",
    id: "CLEANER",
  },
  {
    name: "Handyman",
    description: "Deep Clean, Move ot cleaning, Win",
    img: <HandymenIcon />,
    label: "Handymen",
    id: "HANDYMEN",
  },
];

const Home: FC = () => {
  const { mutate, data, isPending } = useProvidersControllerSearchProviders();
  const [selectedCategory, setSelectedCategory] = useState(serviceTypes[0]?.id);
  const [serviceType, setSelectedServiceType] = useState("");
  const handleSelect = (value) => {
    setSelectedServiceType(value);
  };
  const { data: serviceData } = useProvidersControllerGetServiceTypes();

  const [viewAll, setViewAll] = useState(false);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state?.searchedLocation?.placeId) {
      mutate(
        { data: { locationId: state?.searchedLocation?.placeId } },
        {
          onError: (err) => {
            console.error("Provider search failed:", err);
          },
        }
      );
    }
  }, [mutate, state?.searchedLocation?.placeId]);

  useEffect(() => {
    if (serviceData) {
      console.log(
        serviceData,
        selectedCategory,
        serviceData?.[selectedCategory]
      );
      setSelectedServiceType(serviceData?.[selectedCategory]?.[0]?.key);
    }
  }, [serviceData, selectedCategory]);

  const providers = data?.providers ?? [];
  const providersList = viewAll ? providers : providers.slice(0, 2);
  const totalProviders = providers.length;

  return (
    <>
      <GreyPaper>
        <span className="text-4xl font-bold ma">
          Get it done with Handymate
        </span>
        <div className="text-xl text-gray-600 mt-4">
          Direct contact, no commission and faster results.
        </div>
        <div className="mt-4 flex flex-col gap-6">
          <div className="rounded-lg border border-gray-300 bg-gray-200/50 flex-col justify-evenly items-center flex gap-6 p-6">
            <SearchProviders
              searchedLocation={state?.searchedLocation?.description}
              onSelect={(option) =>
                dispatch({
                  type: "SET_SEARCHED_LOCATION",
                  payload: {
                    description: option.description,
                    placeId: option.place_id,
                  },
                })
              }
            />
            <div className="w-full text-[16px]  leading-[100%] font-bold">
              <p>Select the service type</p>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              {serviceTypes.map((service) => {
                return (
                  <SelectorCard
                    key={service?.id}
                    handleSelectCategory={(category) =>
                      setSelectedCategory(category)
                    }
                    dropwdownOptions={serviceData?.[service?.id] || []}
                    handleSelect={handleSelect}
                    serviceType={serviceType}
                    setSelectedServiceType={setSelectedServiceType}
                    checked={selectedCategory === service?.id}
                    {...service}
                  />
                );
              })}
            </div>
            <div className="search_button w-full">
              <button
                className="w-full"
                onClick={() => {
                  setViewAll(true);
                  mutate(
                    {
                      data: {
                        locationId: state?.searchedLocation?.placeId,
                        serviceTypes: [serviceType],
                      },
                    },
                    {
                      onError: (err) => {
                        console.error("Provider search failed:", err);
                      },
                    }
                  );
                }}
              >
                Search
              </button>
            </div>
          </div>

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
                    onClick={() => {
                      setViewAll(true);
                    }}
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
      <Services />
    </>
  );
};

export default Home;
