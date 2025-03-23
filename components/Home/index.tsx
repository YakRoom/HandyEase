"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  useProvidersControllerGetServiceTypes,
  useProvidersControllerSearchProviders,
} from "@/apis/generated";
import { Button } from "@/components/ui";
import GreyPaper from "@/components/ui/grey-paper";
import WorkerDescriptionCard from "@/components/WorkerDescriptionCard";
import SearchProviders from "@/components/SearchProviders";
import Services from "@/components/Services";
import { useAppContext } from "@/context/AppContext";
import SelectorCard from "@/components/SelectorCard";
import HandymenIcon from "@/public/images/handymen-icon";
import CleanerIcon from "@/public/images/cleaner-icon";
import thumbnail from "@/public/images/thumbnail.png";
import { Search, Loader2 } from "lucide-react";

interface ServiceType {
  name: string;
  description: string;
  img: JSX.Element;
  label: string;
  id: "CLEANER" | "HANDYMEN";
}

const SERVICE_TYPES: ServiceType[] = [
  {
    name: "Cleaner",
    description: "Professional cleaning services for your home",
    img: <CleanerIcon />,
    label: "Cleaning",
    id: "CLEANER",
  },
  {
    name: "Handyman",
    description: "Expert repairs and maintenance services",
    img: <HandymenIcon />,
    label: "Handymen",
    id: "HANDYMEN",
  },
];

const Home: FC = () => {
  const { mutate, data, isPending } = useProvidersControllerSearchProviders();
  const [selectedCategory, setSelectedCategory] = useState<ServiceType["id"]>(SERVICE_TYPES[0].id);
  const [serviceType, setSelectedServiceType] = useState("");
  const { data: serviceData } = useProvidersControllerGetServiceTypes();
  const [viewAll, setViewAll] = useState(false);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state?.searchedLocation?.placeId) {
      mutate(
        { data: { locationId: state.searchedLocation.placeId } },
        {
          onError: (err) => {
            console.error("Provider search failed:", err);
          },
        }
      );
    }
  }, [mutate, state?.searchedLocation?.placeId]);

  useEffect(() => {
    if (serviceData?.[selectedCategory]?.[0]?.key) {
      setSelectedServiceType(serviceData[selectedCategory][0].key);
    }
  }, [serviceData, selectedCategory]);

  const handleSearch = () => {
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
  };

  const providers = data?.providers ?? [];
  const providersList = viewAll ? providers : providers.slice(0, 2);
  const totalProviders = providers.length;

  return (
    <div className="space-y-8">
      <GreyPaper className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Get it done with Handymate
          </h1>
          <p className="text-xl text-neutral-600">
            Direct contact, no commission and faster results.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white/50 p-6 space-y-6">
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

            <div>
              <h2 className="text-base font-semibold mb-4">Select the service type</h2>
              <div className="grid grid-cols-2 gap-4">
                {SERVICE_TYPES.map((service) => (
                  <SelectorCard
                    key={service.id}
                    handleSelectCategory={setSelectedCategory}
                    dropwdownOptions={serviceData?.[service.id] || []}
                    handleSelect={setSelectedServiceType}
                    serviceType={serviceType}
                    setSelectedServiceType={setSelectedServiceType}
                    checked={selectedCategory === service.id}
                    {...service}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full h-12 font-medium"
              disabled={!state?.searchedLocation?.placeId || !serviceType}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Providers
            </Button>
          </div>

          {!viewAll && (
            <Image
              src={thumbnail}
              alt="Handymate service illustration"
              height={500}
              className="w-full rounded-xl"
              priority
            />
          )}

          {isPending ? (
            <div className="text-center p-8 rounded-xl border border-neutral-200 bg-white space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Finding providers...
              </h2>
              <p className="text-neutral-600">
                Please wait while we search for service providers in your area
              </p>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </div>
          ) : viewAll && !providersList.length ? (
            <div className="text-center p-8 rounded-xl border border-neutral-200 bg-white space-y-4" role="alert">
              <h2 className="text-2xl font-semibold text-neutral-900">
                No Service Providers Found
              </h2>
              <p className="text-neutral-600">
                Try searching with a different location or service type
              </p>
              <Button
                variant="outline"
                onClick={() => setViewAll(false)}
                aria-label="Return to explore view"
              >
                Back to Explore
              </Button>
            </div>
          ) : !!providersList.length && (
            <div className="rounded-xl border border-neutral-200 p-6 space-y-6">
              {viewAll ? (
                <p className="text-sm text-neutral-600">
                  Showing {totalProviders} {totalProviders === 1 ? "result" : "results"}
                </p>
              ) : (
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Explore Nearby
                </h2>
              )}

              <div 
                className="space-y-4"
                role="list" 
                aria-label="Service providers"
              >
                {providersList.map((provider) => (
                  <div key={provider.id} role="listitem">
                    <WorkerDescriptionCard {...provider} />
                  </div>
                ))}
              </div>

              {!viewAll && totalProviders > 2 && (
                <Button
                  variant="outline"
                  onClick={() => setViewAll(true)}
                  aria-label={`View all ${totalProviders} service providers`}
                  className="w-full"
                >
                  View all providers ({totalProviders})
                </Button>
              )}
            </div>
          )}
        </div>
      </GreyPaper>

      <Services />
    </div>
  );
};

export default Home;
