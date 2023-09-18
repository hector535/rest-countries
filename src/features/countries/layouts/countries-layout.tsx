import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorView, LoadingView } from "@/components";
import { Header } from "@/features/countries";

export const CountriesLayout = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => <ErrorView fullscreen {...props} />}
        >
          <Header />
          <Suspense fallback={<LoadingView text="Loading..." fullscreen />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
