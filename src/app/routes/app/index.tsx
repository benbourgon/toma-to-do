// src/app/routes/app/index.tsx

// Components
import { Timer } from "@/features/timer/components/timer";

// API
import { getTimerData } from "@/features/timer/api/get-timer-data";
import { createFileRoute } from "@tanstack/react-router";

// Libraries
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Types
import type { TimerTable } from "@/types/database.types";

export const AppRoot = () => {
  const [timerData, setTimerData] = useState<TimerTable | null>(null);
  const [userId] = useState<string | null>(
    "606bf5b8-b8d8-4492-b6d1-200b5912b410"
  );
  useEffect(() => {
    if (userId) {
      getTimerData(userId).then((data) => {
        if (!data) throw new Error("No data found");
        const newTimerData = data;
        if (!Array.isArray(newTimerData)) throw new Error("Invalid data type");
        if (data.length === 0) throw new Error("No data found");
        setTimerData(data);
      });
    }
  }, [userId]);
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
          <Timer props={timerData} />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export const Route = createFileRoute("/app/")({
  component: AppRoot,
});
