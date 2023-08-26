import React, { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createFetchResponse } from "../../utils";
import { countries } from "../../fixtures/countries";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { queryClient } from "../queryClient";

describe("<Country />", () => {
  const mockedFetch = vi.fn();

  global.fetch = mockedFetch;

  mockedFetch.mockResolvedValue(createFetchResponse(countries));

  it("should display a loading message when the component mounts the first time", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries/germany"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display details about the country specified in the URL", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries/germany"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.getAllByText(/germany/i).length).toBeGreaterThan(0);
  });

  it("should navigate back to the main page when the user clicks on the 'back' button", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries", "/countries/germany"],
    });

    render(
      <QueryClientProvider client={queryClient}>
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
