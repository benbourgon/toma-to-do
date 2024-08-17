import { Link } from "react-router-dom";
export const LandingRoute = () => {
  return (
    <div className="ms-0 me-0">
      <h1 className="text-3xl">Welcome to the Landing Page!</h1>
      <Link to="/app" className="block text-3xl underline">
        Go to the App
      </Link>
    </div>
  );
};
