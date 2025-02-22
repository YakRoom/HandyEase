// ... existing code ...

import { errorStore } from "@/lib/errorObserver";
import { handleError, ErrorWithCode } from "@/lib/errorUtil";
import { useEffect } from "react";

export const useErrorObserver = () => {
  useEffect(() => {
    return errorStore.subscribe((error) => {
      if (error) {
        handleError(error as ErrorWithCode);
      }
    });
  }, []);
};
