import React, { Suspense } from "react";
import { describe, it, expect, vi } from "vitest";
import {
  createMemoryRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { VirtuosoGridMockContext } from "react-virtuoso";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createFetchResponse } from "../../utils";
import { countries } from "../../fixtures/countries";
import { routes } from "../routes";
import { ViFn } from "./types";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual!,
    useNavigate: vi.fn(),
  };
});

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

  it("should display a loading message when it mounts for the first time", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(
      screen.getByRole("heading", { name: /loading/i })
    ).toBeInTheDocument();
  });

  it("should display a country after the loading screen message disappears", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const title = await screen.findByText(
      new RegExp(countries[0].name.common, "i")
    );

    expect(title).toBeInTheDocument();
  });

  it("should display 'No results found. Please check your filters' when the user types an invalid country name", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

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
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    await user.keyboard(countries[0].name.common);

    expect(
      screen.getAllByText(new RegExp(countries[0].name.common, "i")).length
    ).toBeGreaterThan(0);
  });

  it("should filter the countries based on the select input field", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const selectElement = screen.getByText(/filter by region/i);

    await user.click(selectElement);

    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    expect(
      screen.getByText(new RegExp(countries[0].name.common, "i"))
    ).toBeInTheDocument();
  });

  it("should navigate to the detail page when the user selects a country", async () => {
    const mockedUseNavigate = vi.fn();

    (useNavigate as ViFn).mockReturnValue(mockedUseNavigate);

    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/countries"],
    });

    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>,
      virtuosoWrapper
    );

    await waitFor(() => {
      expect(
        container.querySelector("[data-test-id='virtuoso-item-list']")
          ?.childElementCount
      ).toBeGreaterThan(0);
    });

    const countryComponent = container.querySelector(
      "[data-test-id='virtuoso-item-list']"
    )?.firstElementChild?.firstElementChild;

    await user.click(countryComponent!);

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/countries/ZAF");
  });
});
