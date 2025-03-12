import { TOKEN_KEY } from "@/app/auth/login/page";
import WhitePaper from "@/components/ui/white-paper";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ProviderData {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  phoneNumber: string;
  showPhoneNumber: boolean;
}

interface ConnectSectionProps {
  providerData: ProviderData;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({ providerData }) => {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem(TOKEN_KEY);

  const redirectToLogin = () => {
    // Store current path for post-login redirect
    sessionStorage.setItem("redirectPath", window.location.pathname);
    router.push("/auth/login");
  };

  return (
    <WhitePaper>
      {/* Heading */}

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect</h3>
      {/* <textarea
        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Start by typing a message or describing the job you’d like"
        rows="3"
      />


      <button className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg mt-4">
        Login to send message
      </button>


      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div> */}
      {/* Login to Call Button */}
      {isAuthenticated ? (
        <a
          href="tel:+15551234567"
          className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg flex text-center justify-center"
          aria-label={`Call ${providerData.user.firstName}`}
          role="button"
        >
          Call {providerData.user.firstName}
        </a>
      ) : (
        <button
          className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
          onClick={redirectToLogin}
          aria-label="Login to call provider"
        >
          Login to call
        </button>
      )}
      {/* </div> */}
    </WhitePaper>
  );
};

export default ConnectSection;
