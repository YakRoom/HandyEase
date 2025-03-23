import { FC } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import WhitePaper from "@/components/ui/white-paper";
import { Button } from "@/components/ui";
import { Phone, MessageCircle, Lock } from "lucide-react";

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

const ConnectSection: FC<ConnectSectionProps> = ({ providerData }) => {
  const router = useRouter();
  const { state } = useAppContext();
  const isAuthenticated = state?.isOnboarded;

  const redirectToLogin = () => {
    sessionStorage.setItem("redirectPath", window.location.pathname);
    router.push("/auth/login");
  };

  return (
    <WhitePaper>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Connect with {providerData.user.firstName}
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            Send a message or make a call to discuss your project
          </p>
        </div>

        {/* Message Section */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              className="w-full min-h-[120px] px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Describe your project requirements or ask questions..."
              disabled={!isAuthenticated}
            />
            {!isAuthenticated && (
              <div className="absolute inset-0 bg-neutral-50/80 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-2 p-4">
                  <Lock className="w-5 h-5 text-neutral-400" />
                  <p className="text-sm text-neutral-600 text-center">
                    Login to send messages
                  </p>
                </div>
              </div>
            )}
          </div>
          <Button
            variant={isAuthenticated ? "default" : "secondary"}
            className="w-full gap-2"
            onClick={!isAuthenticated ? redirectToLogin : undefined}
            disabled={isAuthenticated && !providerData.showPhoneNumber}
          >
            <MessageCircle className="w-4 h-4" />
            {isAuthenticated ? "Send Message" : "Login to Message"}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-neutral-200" />
          <span className="text-xs font-medium text-neutral-500">OR</span>
          <div className="flex-1 border-t border-neutral-200" />
        </div>

        {/* Call Section */}
        <div>
          {isAuthenticated && providerData.showPhoneNumber ? (
            <a
              href={`tel:${providerData.phoneNumber}`}
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              aria-label={`Call ${providerData.user.firstName}`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          ) : (
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={!isAuthenticated ? redirectToLogin : undefined}
            >
              <Phone className="w-4 h-4" />
              {isAuthenticated ? "Phone number hidden" : "Login to Call"}
            </Button>
          )}
        </div>
      </div>
    </WhitePaper>
  );
};

export default ConnectSection;
