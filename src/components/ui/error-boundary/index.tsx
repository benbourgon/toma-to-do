// components/error-boundary/index.tsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary
	key={location.pathname}
	fallback={<div>Something went wrong!</div>}
/>;
