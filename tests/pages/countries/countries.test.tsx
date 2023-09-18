import { describe, it, expect, afterEach } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { getQueryClient } from "@/utils";
import { countries } from "@tests/fixtures/countries";
import { VirtuosoGridMockWrapper } from "@/utils";
import { appRoutes } from "@/routes";

describe("Countries Page", () => {
  const virtuosoWrapper = {
    wrapper: VirtuosoGridMockWrapper({
      viewportHeight: 5000,
      viewportWidth: 1200,
      itemHeight: 336,
      itemWidth: 264,
    }),
  };

  const waitForItemsToBeOnTheScreen = async (container: Element) => {
    let items = null as unknown as NodeListOf<Element>;

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_country_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    return items;
  };

  let queryClient = getQueryClient();
  let user = userEvent.setup();

  afterEach(() => {
    queryClient = getQueryClient();
    user = userEvent.setup();
  });

  it("should display a loading message when it mounts for the first time", () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display all the countries after the loading screen message disappears", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const items = await waitForItemsToBeOnTheScreen(container);

    expect(items.length).toBeGreaterThan(0);
  });

  it("should display 'No results found. Please check your filters' when the user types an invalid country name", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    const message = "No results found. Please check your filters";

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const searchInput = await screen.findByPlaceholderText(
      /Search for a country.../i
    );

    await user.type(searchInput, "invalid country name!");

    expect(screen.getByText(new RegExp(message, "i"))).toBeInTheDocument();
  });

  it("should filter the countries based on the search input field", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    const countryName = countries[3].name.common;

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const searchInput = await screen.findByPlaceholderText(
      /Search for a country.../i
    );

    await user.type(searchInput, countryName);

    const items = await waitForItemsToBeOnTheScreen(container);

    const arrItems = Array.from(items);

    const existCountry = arrItems.some((item) =>
      item.textContent?.toLowerCase().includes(countryName.toLowerCase())
    );

    expect(existCountry).toBeTruthy();
  });

  it("should filter the countries based on the select input field", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    const selectedRegion = "Asia";

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const selectElement = await screen.findByRole("combobox", {
      name: /country-region/i,
    });

    await user.click(selectElement);

    //Select Asia option
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    const items = await waitForItemsToBeOnTheScreen(container);

    const arrItems = Array.from(items);

    const onlyAsiaCountries = arrItems.every((item) =>
      item.textContent?.toLowerCase().includes(selectedRegion.toLowerCase())
    );

    expect(onlyAsiaCountries).toBeTruthy();
  });

  it("should navigate to the detail page when the user selects a country", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/countries"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      virtuosoWrapper
    );

    const items = await waitForItemsToBeOnTheScreen(container);

    await user.click(items[0]);

    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    expect(screen.getByText(/native name/i)).toBeInTheDocument();
  });
});
