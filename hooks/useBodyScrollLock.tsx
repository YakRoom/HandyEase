import { useEffect } from "react";

const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Lock the scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when modal is closed
      document.body.style.overflow = "";
    }

    // Cleanup to remove styles on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};

export default useBodyScrollLock;
