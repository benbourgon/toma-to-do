// app/routes/about.lazy.tsx
import { createLazyFileRoute } from "@tanstack/react-router";

export const About = () => {
  return (
    <div className="p-2">
      <h2>About</h2>
    </div>
  );
};

export const Route = createLazyFileRoute("/about")({
  component: About,
});
