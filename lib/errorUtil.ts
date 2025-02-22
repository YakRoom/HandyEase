export interface ErrorWithCode extends Error {
  status: number;
  severity?: string;
}

export const handleError = (error: ErrorWithCode) => {
  switch (error.status) {
    // Authentication Errors (401-403)
    case 401:
      localStorage.clear();
      console.log("Please login to continue");
      // Could trigger auth flow here
      break;

    case 403:
      console.log("You don't have permission to perform this action", {
        duration: 4000,
      });
      break;

    // Client Errors (400, 404, 422)
    case 400:
      console.log("Invalid request. Please check your input.", {
        duration: 4000,
      });
      break;

    case 404:
      console.log("Resource not found", {
        duration: 4000,
      });
      break;

    case 422:
      console.log(error.message, {
        // Validation error
        duration: 4000,
      });
      break;

    // Rate Limiting (429)
    case 429:
      console.log("Too many requests. Please try again later", {
        duration: 4000,
      });
      break;

    // Server Errors (500-504)
    case 500:
      console.log("Internal server error. Please try again later", {
        duration: 5000,
      });
      break;

    case 502:
      console.log("Service temporarily unavailable", {
        duration: 4000,
      });
      break;

    case 503:
      console.log("Service unavailable. Please try again later", {
        duration: 4000,
      });
      break;

    case 504:
      console.log("Request timeout. Please check your connection", {
        duration: 4000,
      });
      break;

    default:
    //   const method =
    //     error.severity === "warning"
    //       ? toast.warning
    //       : error.severity === "info"
    //       ? toast.info
    //       : toast.error;
    //   method(error.message, {
    //     duration: 4000,
    //   });
  }
};
