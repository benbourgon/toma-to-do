import Timer from "@/features/timer/components/timer";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

export const AppRoot = () => {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Something went wrong!</div>}
      >
        <h1>Timer</h1>
        <Timer />
      </ErrorBoundary>
    </Suspense>
  );
};
