import WhitePaper from "@/components/ui/white-paper";
import React from "react";

const ConnectSection = () => {
  return (
    <WhitePaper>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Start by typing a message or describing the job you’d like"
        rows="3"
      />

      {/* Login to Send Message Button */}
      <button className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg mt-4">
        Login to send message
      </button>

      {/* Divider */}
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Login to Call Button */}
      <button className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg">
        Login to call
      </button>
    </WhitePaper>
  );
};

export default ConnectSection;
