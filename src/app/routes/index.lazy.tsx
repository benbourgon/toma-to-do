// app/routes/index.lazy.tsx
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <div className="p-2">
      <h2>The Quest for the Golden Apple</h2>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
