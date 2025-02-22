"use client";
import React, { Component, ErrorInfo, PropsWithChildren } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to your error reporting service
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            margin: "20px",
            textAlign: "center",
            backgroundColor: "#fff5f5",
            border: "1px solid #ff0000",
            borderRadius: "4px",
          }}
        >
          <h2>Something went wrong.</h2>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff0000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
