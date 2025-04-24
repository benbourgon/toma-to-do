// src/app/routes/app/index.tsx

// API
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
// Libraries
import { ErrorBoundary } from "react-error-boundary";
// Types

export const AppRoot = () => {
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
        <div className="p-2">
          <h1>App</h1>
          <h2>Timer</h2>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export const Route = createFileRoute("/app/")({ component: AppRoot });
