import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Header } from "../components/Header/Header";
import { LoadingView } from "../components/LoadingView/LoadingView";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { QueryErrorResetBoundary } from "react-query";

export const Root = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => <ErrorView fullscreen {...props} />}
        >
          <Suspense fallback={<LoadingView text="Loading..." fullscreen />}>
            <Header />
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
