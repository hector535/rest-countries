import { QueryClient, QueryClientProvider } from "react-query";
import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { createFetchResponse } from "@/utils";
import { countries } from "@tests/fixtures/countries";
import { appRoutes } from "@/routes";

describe("<Country />", () => {
  const mockedFetch = vi.fn();

  global.fetch = mockedFetch;

  mockedFetch.mockResolvedValue(createFetchResponse(countries[0]));

  const firstElementCCA3 = countries[0].cca3;
  const firstElementName = countries[0].name.common;

  it("should display a loading message when the component mounts the first time", () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/countries/${firstElementCCA3}`],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display details about the country specified in the URL", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/countries/${firstElementCCA3}`],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(
      screen.getAllByText(new RegExp(firstElementName, "i")).length
    ).toBeGreaterThan(0);
  });

  it("should navigate back to the main page when the user clicks on the 'back' button", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries", `/countries/${firstElementCCA3}`],
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    const backButton = screen.getByRole("button", { name: /back/i });

    await user.click(backButton);

    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    expect(
      screen.getByPlaceholderText(/Search for a country/i)
    ).toBeInTheDocument();
  });
});
