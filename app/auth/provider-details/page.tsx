"use client";
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui";
import { FormField, Input, TextArea } from "@/components/ui/form-field";
import SearchProviders from "@/components/SearchProviders";
import WhitePaper from "@/components/ui/white-paper";
import {
  Camera,
  MapPin,
  Phone,
  Upload,
  Clock,
  CheckCircle,
  // Pound,
} from "lucide-react";
import Service from "@/public/images/service.svg";
import {
  useProvidersControllerCreateProvider,
  useProvidersControllerGetMyProviderDetails,
  useProvidersControllerUpdateMyDetails,
} from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import {
  AVAILABLE_SKILL,
  ProviderAction,
  ProviderState,
  initialState,
  MIN_RADIUS,
  MAX_RADIUS,
  ValidationErrors,
} from "./constants";
import { useProviderRoute } from "@/hooks/routeHooks";
import React, { useEffect, useReducer, useState } from "react";

function reducer(state: ProviderState, action: ProviderAction): ProviderState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_CALLS":
      return { ...state, allowCalls: !state.allowCalls };
    case "ADD_SKILL":
      return {
        ...state,
        skills: state.skills.includes(action.skill)
          ? state.skills
          : [...state.skills, action.skill],
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((s) => s !== action.skill),
      };
    case "SET_RESUME":
      return { ...state, resume: action.file };
    case "BULK_UPDATE":
      return { ...state, ...action.values };
    case "SET_LOCATION":
      return {
        ...state,
        locationId: action.locationId,
        locationName: action.locationName,
      };
    default:
      return state;
  }
}

const ProviderSetup: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isNegotiable: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { mutate } = useProvidersControllerCreateProvider();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const isNewCreation =
    appState?.user?.role === CreateUserDtoRole.PROVIDER &&
    appState?.user?.policyAccepted;

  const [skills, setSkills] = useState<{ label: string; key: string }[]>([]);

  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails({
    query: {
      enabled: isNewCreation,
      refetchOnMount: true,
    },
  });

  useEffect(() => {
    if (Object.values(providerDetails || {}).length > 0) {
      const availableBuckets = Object.values(AVAILABLE_SKILL).reduce(
        (acc, bucket) => {
          if (
            bucket.some((skill) =>
              providerDetails.serviceTypes.includes(skill.key)
            )
          ) {
            acc.push(...bucket);
          }
          return acc;
        },
        []
      );
      setSkills(availableBuckets);
      dispatch({
        type: "BULK_UPDATE",
        values: {
          profilePic: providerDetails.providerPicture || "",
          about: providerDetails.bio || "",
          payRate: providerDetails.hourlyRate || null,
          experience: providerDetails.experienceYears || null,
          radius: providerDetails.radius || 10,
          phone: providerDetails.phoneNumber || "",
          allowCalls: providerDetails.showPhoneNumber || false,
          skills: providerDetails.serviceTypes || [],
          locationName: providerDetails.locationName || "",
          locationId: providerDetails.locationId || "",
          isNegotiable: providerDetails.isNegotiable || false,
        },
      });
    }
  }, [providerDetails]);

  const isEditMode = Object.values(providerDetails || {}).length > 0;
  const { mutate: mutateEdit } = useProvidersControllerUpdateMyDetails();
  useProviderRoute();
  const router = useRouter();

  useEffect(() => {
    if (appState?.user?.role === CreateUserDtoRole.CONSUMER) {
      router.replace("/");
    }
  }, [appState?.user, router]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!state.about.trim()) {
      newErrors.about = "Please tell us about yourself";
    }

    if (state.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }

    if (state.payRate === null || state.payRate <= 0) {
      newErrors.payRate = "Please enter a valid pay rate";
    }

    if (state.experience === null) {
      newErrors.experience = "Please enter your years of experience";
    }

    if (!state.locationId.trim()) {
      newErrors.postcode = "Please enter your postcode";
    }

    if (!state.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\+?[\d\s-]{10,}$/.test(state.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector("[data-error='true']");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const providerData = {
      providerPicture: state.profilePic,
      bio: state.about,
      serviceTypes: state.skills,
      hourlyRate: state.payRate,
      experienceYears: state.experience,
      locationId: state.locationId,
      locationName: state.locationName,
      radius: state.radius,
      phoneNumber: state.phone,
      showPhoneNumber: state.allowCalls,
      resume: state.resume,
      isNegotiable: state.isNegotiable,
    };

    try {
      if (isEditMode) {
        mutateEdit({ data: providerData });
        router.push("/view-profile");
      } else {
        mutate({ data: providerData });
      }
      appDispatch({
        type: "SET_ONBOARDED",
        payload: true,
      });
    } catch (error) {
      console.error("Error saving provider details:", error);
      setErrors({
        ...errors,
        submit: "Failed to save your details. Please try again.",
      });
    }
  };

  // Helper function to clear specific error
  const clearError = (field: keyof ProviderState) => {
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [field]: removedError, ...rest } = prev;
      return rest;
    });
  };

  const handleFieldChange = (
    field: keyof ProviderState,
    value: string | number | File | null | boolean
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
    clearError(field);
  };

  const handleSkillToggle = (skill: string) => {
    dispatch({ type: "ADD_SKILL", skill });
    clearError("skills");
  };

  const handlePhoneChange = (value: string) => {
    dispatch({ type: "SET_FIELD", field: "phone", value });
    // Only clear error if the new value is valid
    if (/^\+?[\d\s-]{10,}$/.test(value.trim())) {
      clearError("phone");
    }
  };

  const renderServiceCards = isNewCreation && !skills.length;

  const handleSelectSkill = (skill: string) => {
    if (skill === "OTHERS") {
      setSkills([
        ...AVAILABLE_SKILL["OTHERS"],
        ...AVAILABLE_SKILL["HANDYMEN"],
        ...AVAILABLE_SKILL["CLEANER"],
      ]);
    } else {
      setSkills(AVAILABLE_SKILL?.[skill] || []);
    }
  };

  return (
    <>
      {renderServiceCards ? (
        <div className="max-w-2xl mx-auto">
          <WhitePaper>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">
                  What service do you provide?
                </h2>
                <p className="text-neutral-600 mt-1">
                  Choose your primary service category to get started
                </p>
              </div>

              <div className="grid gap-4">
                {Object.keys(AVAILABLE_SKILL).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSelectSkill(skill)}
                    className="group p-6 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-1 text-left space-y-3">
                        <h3 className="text-lg font-medium text-neutral-900 group-hover:text-primary transition-colors">
                          {skill}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          Deep Clean, Move out cleaning, Window Cleaning
                        </p>
                        <Button variant="secondary" size="sm" className="mt-2">
                          Select <span className="ml-2">→</span>
                        </Button>
                      </div>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={Service}
                          alt={`${skill} service`}
                          className="object-cover"
                          fill
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </WhitePaper>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <WhitePaper>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Complete Your Profile
                </h2>
                <p className="text-neutral-600 mt-1">
                  Help customers get to know you better
                </p>
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 ring-4 ring-neutral-50">
                    {state.profilePic ? (
                      <Image
                        src={state.profilePic}
                        alt="Profile picture"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* About */}
                <FormField label="Tell us about yourself" error={errors.about}>
                  <TextArea
                    placeholder="Share your experience, expertise, and what makes you unique..."
                    value={state.about}
                    onChange={(e) => handleFieldChange("about", e.target.value)}
                    error={errors.about}
                    className="min-h-[120px]"
                  />
                </FormField>

                {/* Skills */}
                <FormField label="Your expertise" error={errors.skills}>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill.key}
                        onClick={() => handleSkillToggle(skill.key)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                          state.skills.includes(skill.key)
                            ? "bg-primary text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {state.skills.includes(skill.key) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {skill.label}
                      </button>
                    ))}
                  </div>
                </FormField>

                {/* Rate and Experience */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField label="Hourly Rate" error={errors.payRate}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        £
                      </span>
                      <Input
                        type="number"
                        className="pl-9"
                        value={state.payRate || ""}
                        onChange={(e) =>
                          handleFieldChange("payRate", Number(e.target.value))
                        }
                        placeholder="Enter your hourly rate"
                        aria-label="Hourly rate input"
                      />
                    </div>
                  </FormField>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {/* <Pound className="w-5 h-5 text-neutral-500" /> */}
                      <span className="text-sm font-medium text-neutral-700">
                        Rate is negotiable
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={state.isNegotiable}
                        onChange={(e) =>
                          handleFieldChange("isNegotiable", e.target.checked)
                        }
                        aria-label="Toggle rate negotiability"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <FormField
                    label="Years of Experience"
                    error={errors.experience}
                  >
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <Input
                        type="number"
                        className="pl-9"
                        placeholder="0"
                        min={0}
                        value={state.experience || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "experience",
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        error={errors.experience}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                        years
                      </span>
                    </div>
                  </FormField>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <FormField label="Service Area" error={errors.postcode}>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <SearchProviders
                        onSelect={(option) =>
                          dispatch({
                            type: "SET_LOCATION",
                            locationId: option.place_id,
                            locationName: option.description,
                          })
                        }
                      />
                    </div>
                  </FormField>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">
                        Service radius
                      </span>
                      <span className="text-sm text-neutral-600">
                        {state.radius} miles
                      </span>
                    </div>
                    <input
                      type="range"
                      min={MIN_RADIUS}
                      max={MAX_RADIUS}
                      value={state.radius}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_FIELD",
                          field: "radius",
                          value: Number(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-neutral-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                </div>

                {/* Contact */}
                <FormField label="Phone Number" error={errors.phone}>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <Input
                      type="tel"
                      className="pl-9"
                      placeholder="+44"
                      value={state.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      error={errors.phone}
                    />
                  </div>
                </FormField>

                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm font-medium text-neutral-700">
                      Allow direct calls
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.allowCalls}
                      onChange={() => dispatch({ type: "TOGGLE_CALLS" })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Documents */}
                <FormField label="Resume or Certifications">
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFieldChange("resume", e.target.files[0])
                      }
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm text-neutral-600">
                        {state.resume ? state.resume.name : "Upload documents"}
                      </span>
                    </label>
                  </div>
                </FormField>

                {errors.submit && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                    <p className="text-sm text-rose-600">{errors.submit}</p>
                  </div>
                )}

                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  {isEditMode ? "Save Changes" : "Complete Profile"}
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </WhitePaper>
        </div>
      )}
    </>
  );
};

export default ProviderSetup;
