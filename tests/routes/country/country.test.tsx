import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { createFetchResponse } from "../../utils";
import { countries } from "../../fixtures/countries";
import { routes } from "../routes";

describe("<Country />", () => {
  const mockedFetch = vi.fn();

  global.fetch = mockedFetch;

  mockedFetch.mockResolvedValue(createFetchResponse(countries[0]));

  const firstElementCCA3 = countries[0].cca3;
  const firstElementName = countries[0].name.common;

  it("should display a loading message when the component mounts the first time", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries/MKD"],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display details about the country specified in the URL", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/countries/${firstElementCCA3}`],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(
      screen.getAllByText(new RegExp(firstElementName, "i")).length
    ).toBeGreaterThan(0);
  });

  it("should navigate back to the main page when the user clicks on the 'back' button", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries", `/countries/${firstElementCCA3}`],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const backButton = screen.getByRole("button");

    await user.click(backButton);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
