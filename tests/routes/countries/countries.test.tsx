import React, { Suspense } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { VirtuosoGridMockContext } from "react-virtuoso";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createFetchResponse } from "../../utils";
import { countries } from "../../fixtures/countries";
import { LoadingView } from "../../../src/components/LoadingView/LoadingView";
import { queryClient } from "../queryClient";
import { routes } from "../routes";

describe("<Countries />", () => {
  const virtuosoWrapper = {
    wrapper: ({ children }) => (
      <VirtuosoGridMockContext.Provider
        value={{
          viewportHeight: 1440,
          viewportWidth: 1200,
          itemHeight: 336,
          itemWidth: 264,
        }}
      >
        {children}
      </VirtuosoGridMockContext.Provider>
    ),
  };

  const mockedFetch = vi.fn();

  global.fetch = mockedFetch;

  mockedFetch.mockResolvedValue(createFetchResponse(countries));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display a loading message when it mounts for the first time", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(
      screen.getByRole("heading", { name: /loading/i })
    ).toBeInTheDocument();
  });

  it("should display a country after the loading screen message disappears.", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const title = await screen.findByText(/germany/i);

    expect(title).toBeInTheDocument();
  });

  it("should display 'No results found. Please check your filters' when the user types an invalid country name", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    await user.keyboard("invalid country name!");

    expect(
      screen.getByText(/No results found. Please check your filters/i)
    ).toBeInTheDocument();
  });

  it("should filter the countries based on the search input field", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    await user.keyboard("United States");

    expect(screen.getAllByText(/United States/i).length).toBeGreaterThan(0);
  });

  it("should filter the countries based on the select input field", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const selectElement = screen.getByText(/filter by region/i);

    await user.click(selectElement);

    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.queryByText(/United Arab Emirates/i)).toBeInTheDocument();
  });

  it("should navigate to the detail page when the user selects a country", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingView text="Loading..." fullscreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const selectedCountry = screen.getByRole("heading", {
      name: /germany/i,
      level: 2,
    });

    await user.click(selectedCountry);

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
