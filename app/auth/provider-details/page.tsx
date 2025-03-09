"use client";
import {
  useProvidersControllerCreateProvider,
  useProvidersControllerGetMyProviderDetails,
  useProvidersControllerGetSuggestions,
  useProvidersControllerUpdateMyDetails,
} from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { useAppContext } from "@/context/AppContext";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer } from "react";

const initialState = {
  profilePic: "",
  payRate: 20,
  experience: 5,
  postcode: "DIT University",
  radius: 5,
  phone: "8307991528",
  allowCalls: false,
  resume: "",
  about:
    "Hi I am Atef I accelerate cleaning, deep cleaning, moving out cleaning, window cleaning, mattress cleaning etc etc ",
  skills: ["CLEANER"],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_CALLS":
      return { ...state, allowCalls: !state.allowCalls };
    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.skill] };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((s) => s !== action.skill),
      };
    case "SET_RESUME":
      return { ...state, resume: action.file };
    default:
      return state;
  }
}

const ProviderSetup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = useProvidersControllerCreateProvider();
  const { state: appState } = useAppContext();
  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails(
    { userId: "" },
    {
      query: {
        enabled:
          state?.user?.role === CreateUserDtoRole.PROVIDER &&
          state?.user?.policyAccepted,
        refetchOnMount: false,
      },
    }
  );
  const isEditMode = Object.values(providerDetails || {}).length;
  const { mutate: mutateEdit, data: updatedDetails } =
    useProvidersControllerUpdateMyDetails();

  // TODO: use providerDetails in case of edit profile
  const { mutate: mutateSuggestions, data } =
    useProvidersControllerGetSuggestions();
  useAuthBasedRedirection();
  const router = useRouter();
  console.log(state.postcode);
  useEffect(
    () => mutateSuggestions({ data: { place: state.postcode } }),
    [state.postcode]
  );

  useEffect(() => {
    if (
      appState?.user?.role === CreateUserDtoRole.CONSUMER ||
      !appState?.user?.policyAccepted
    ) {
      router.replace("/");
    }
  }, [appState?.user]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Let's get to know you more
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mt-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          📷
        </div>
        <button className="text-sm text-gray-600 mt-2 underline">
          Add a picture
        </button>
      </div>

      {/* About Yourself */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Tell us about yourself
      </label>
      <textarea
        className="w-full mt-2 p-2 border rounded-md text-sm"
        placeholder="Start by typing a message..."
        value={state.about}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "about", value: e.target.value })
        }
      />

      {/* Expertise */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        What are your expertise
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        {[
          "Deep Clean",
          "Move out cleaning",
          "Window Cleaning",
          "Mattress Cleaning",
        ].map((skill) => (
          <span
            key={skill}
            className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full cursor-pointer"
            onClick={() => dispatch({ type: "ADD_SKILL", skill })}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Pay Rate */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Basic Pay Rate
      </label>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="number"
          className="w-16 p-2 border rounded-md text-sm"
          placeholder="£"
          value={state.payRate}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "payRate",
              value: e.target.value,
            })
          }
        />
        <span className="text-gray-700">/ hr</span>
        <span className="text-red-500 text-xs italic">Negotiable (No)</span>
      </div>

      {/* Experience */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Experience
      </label>
      <input
        type="text"
        className="w-full mt-2 p-2 border rounded-md text-sm"
        placeholder="X Years"
        value={state.experience}
        onChange={(e) =>
          dispatch({
            type: "SET_FIELD",
            field: "experience",
            value: e.target.value,
          })
        }
      />

      {/* Location */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Preferred Location
      </label>
      <input
        type="text"
        className="w-full mt-2 p-2 border rounded-md text-sm"
        placeholder="Postcode"
        value={state.postcode}
        onChange={(e) =>
          dispatch({
            type: "SET_FIELD",
            field: "postcode",
            value: e.target.value,
          })
        }
      />

      {/* Radius */}
      <div className="mt-2 flex items-center justify-between">
        <input
          type="range"
          min="1"
          max="50"
          value={state.radius}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "radius",
              value: e.target.value,
            })
          }
          className="w-3/4"
        />
        <span className="text-gray-700">{state.radius} miles</span>
      </div>

      {/* Phone Number */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Phone Number
      </label>
      <input
        type="text"
        className="w-full mt-2 p-2 border rounded-md text-sm"
        placeholder="+44"
        value={state.phone}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
        }
      />

      {/* Allow Direct Calls */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-red-500">Allow direct calls (No)</span>
        <input
          type="checkbox"
          checked={state.allowCalls}
          onChange={() => dispatch({ type: "TOGGLE_CALLS" })}
          className="h-5 w-5"
        />
      </div>

      {/* Resume Upload */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Resume or Certifications
      </label>
      <input
        type="file"
        className="mt-2 text-sm"
        onChange={(e) =>
          dispatch({ type: "SET_RESUME", file: e.target.files[0] })
        }
      />

      {/* Next Button */}
      <button
        className="w-full bg-black text-white py-2 rounded-md mt-6"
        onClick={() => {
          if (isEditMode) {
            mutateEdit({
              data: {
                providerPicture: state.profilePic,
                bio: "ediiteed" + state.about,
                serviceTypes: state.skills,
                hourlyRate: state.payRate,
                experienceYears: state.experience,
                locationId: data?.[0].place_id || "",
                radius: state.radius,
                phoneNumber: state.phone,
                showPhoneNumber: state.allowCalls,
                resume: state.resume,
              },
            });
          } else {
            mutate({
              data: {
                providerPicture: state.profilePic,
                bio: state.about,
                serviceTypes: state.skills,
                hourlyRate: state.payRate,
                experienceYears: state.experience,
                locationId: data?.[0].place_id || "",
                radius: state.radius,
                phoneNumber: state.phone,
                showPhoneNumber: state.allowCalls,
                resume: state.resume,
              },
            });
          }
          router.replace("/");
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default ProviderSetup;
