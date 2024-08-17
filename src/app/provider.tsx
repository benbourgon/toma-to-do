import { type ReactNode, Suspense } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
