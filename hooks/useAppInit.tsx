import { useState } from "react";

// Custom hook to use the context
export function useAppInit() {
  const hasToken = !!localStorage.getItem("token");
  const [initApisLoading, setInitApisLoading] = useState(hasToken);

  //   useEffect(() => {
  //     if (hasToken) {
  //       setInitApisLoading(true);
  //     }
  //   }, [hasToken]);

  return initApisLoading;
}
