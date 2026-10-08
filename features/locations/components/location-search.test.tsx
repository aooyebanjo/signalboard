import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

/**
 * Testing Library imports.
 */
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

/**
 * User Event imports.
 */
import userEvent from "@testing-library/user-event";

/**
 * React Query imports.
 */
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

/**
 * React imports.
 */
import type { ReactNode } from "react";

/**
 * Component imports.
 */
import { LocationSearch } from "./location-search";

/**
 * Fixtures imports.
 */
import {
  washingtonLocation,
} from "../test/fixtures";

import {
  locationQueryKeys,
} from "../utils/location-query-keys";

import {
  searchLocations,
  getLocationByCoordinates,
} from "../api/locations";

/**
 * Mock imports.
 * What does this do? It mocks the locations API.
 * What does it simulate? It simulates the searchLocations and getLocationByCoordinates functions.
 */
vi.mock("../api/locations", () => ({
  searchLocations: vi.fn(),
  getLocationByCoordinates: vi.fn(),
}));

/**
 * A mock implementation of the navigation object.
 * This is used to mock the next/navigation module.
 * What does it represent and simulate? It represents and simulates the useRouter, usePathname, and useSearchParams hooks.
 */
const navigation = vi.hoisted(() => ({
  pathname: "/locations",
  search: "",
  replace: vi.fn(),
}));

/**
 * Mock the next/navigation module.
 * What does this do? It mocks the next/navigation module.
 * What does it simulate? It simulates the useRouter, usePathname, and useSearchParams hooks.
 */
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: navigation.replace,
  }),

  usePathname: () => navigation.pathname,

  useSearchParams: () =>
    new URLSearchParams(navigation.search),
}));

/**
 * Mock the location-map component.
 * What does this do? It mocks the location-map component.
 * What does it simulate? It simulates the LocationMap component, 
 * The onLocationChange function is used to simulate the click event on the location map.
 * The location map is used to simulate the location change.
 */
vi.mock("./location-map", () => ({
  LocationMap: ({
    location,
    onLocationChange,
  }: {
    location: { name: string };
    onLocationChange?: (
      latitude: number,
      longitude: number
    ) => void;
  }) => (
    <div data-testid="location-map">
      <span>Map: {location.name}</span>

      <button
        type="button"
        onClick={() =>
          onLocationChange?.(
            39.2904,
            -76.6122
          )
        }
      >
        Simulate Baltimore map click
      </button>
    </div>
  ),
}));

let queryClient: QueryClient;

/**
 * Render the component with the query client.
 * What does this do? It renders the component with the query client.
 * What does it simulate? It simulates the render function.
 */
function renderWithQueryClient(
  ui: ReactNode
) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

/**
 * Set up the test environment.
 * What does this do? It sets up the test environment.
 * What does it simulate? It simulates the beforeEach function.
 */
beforeEach(() => {
  /**
   * Set the search string to an empty string.
   * What does this do? It sets the search string to an empty string.
   * What does it simulate? It simulates the navigation object.
   */
  navigation.search = "";
  /**
   * Reset the replace function.
   * What does this do? It resets the replace function.
   * What does it simulate? It simulates the navigation object.
   */
  navigation.replace.mockReset();

  /**
   * Mock the searchLocations function.
   * What does this do? It mocks the searchLocations function.
   * What does it simulate? It simulates the searchLocations function.
   */
  vi.mocked(searchLocations).mockReset();
  vi.mocked(getLocationByCoordinates).mockReset();

  /**
   * Create a new query client.
   * What does this do? It creates a new query client.
   * What does it simulate? It simulates the new QueryClient function.
   */
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });
});

/**
 * Tear down the test environment.
 * What does this do? It tears down the test environment.
 * What does it simulate? It simulates the afterEach function.
 */
afterEach(() => {
  /**
   * Clear the query client.
   * What does this do? It clears the query client.
   * What does it simulate? It simulates the clear function.
   */
  queryClient.clear();
});

/**
 * Test suite for the LocationSearch component.
 * What does this do? It tests the LocationSearch component.
 * What does it simulate? It simulates the LocationSearch component.
 */
describe("LocationSearch", () => {
  /**
   * Test case for selecting an autocomplete result and seeding the coordinate cache.
   * What does this do? It tests the selecting an autocomplete result and seeding the coordinate cache.
   * What does it simulate? It simulates the selecting an autocomplete result and seeding the coordinate cache.
   */
  it("selects an autocomplete result and seeds the coordinate cache", async () => {
    /**
     * Set up the user event.
     * What does this do? It sets up the user event.
     * What does it simulate? It simulates the user event.
     */
    const user = userEvent.setup();

    /**
     * Mock the searchLocations function.
     * What does this do? It mocks the searchLocations function.
     * What does it simulate? It simulates the searchLocations function.
     */
    vi.mocked(searchLocations).mockResolvedValue([
      washingtonLocation,
    ]);

    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);

    /**
     * Get the search input.
     * What does this do? It gets the search input.
     * What does it simulate? It simulates the getByRole function.
     */
    const searchInput = screen.getByRole(
      "combobox",
      { name: /search locations/i }
    );

    /**
     * Type the search input.
     * What does this do? It types the search input.
     * What does it simulate? It simulates the type function.
     */
    await user.type(searchInput, "Washington");

    /**
     * Find the option.
     * What does this do? It finds the option.
     * What does it simulate? It simulates the findByRole function.
     */
    const option = await screen.findByRole(
      "option",
      { name: /washington/i }
    );

    /**
     * Click the option.
     * What does this do? It clicks the option.
     * What does it simulate? It simulates the click function.
     */
    await user.click(option);

    /**
     * Check if the location is in the document.
     * What does this do? It checks if the location is in the document.
     * What does it simulate? It simulates the getByText function.
     */
    expect(
      screen.getByText(
        washingtonLocation.displayName
      )
    ).toBeInTheDocument();

    /**
     * Check if the location map is in the document.
     * What does this do? It checks if the location map is in the document.
     * What does it simulate? It simulates the getByTestId function.
     */
    expect(
      screen.getByTestId("location-map")
    ).toHaveTextContent("Washington");

    /**
     * Check if the navigation replace function has been called.
     * What does this do? It checks if the navigation replace function has been called.
     * What does it simulate? It simulates the toHaveBeenCalledWith function.
     */
    expect(navigation.replace).toHaveBeenCalledWith(
      `/locations?lat=${washingtonLocation.latitude}&lng=${washingtonLocation.longitude}`
    );

    /**
     * Get the cached location.
     * What does this do? It gets the cached location.
     * What does it simulate? It simulates the getQueryData function.
     */
    const cachedLocation =
      queryClient.getQueryData(
        locationQueryKeys.location(
          washingtonLocation.latitude,
          washingtonLocation.longitude
        )
      );

    /**
     * Check if the cached location is equal to the washington location.
     * What does this do? It checks if the cached location is equal to the washington location.
     * What does it simulate? It simulates the toEqual function.
     */
    expect(cachedLocation).toEqual(
      washingtonLocation
    );
  });

  /**
   * Test case for clearing selected coordinates when the user edits the search.
   * What does this do? It tests the clearing selected coordinates when the user edits the search.
   * What does it simulate? It simulates the clearing selected coordinates when the user edits the search.
   */
  it("clears selected coordinates when the user edits the search", async () => {
    /**
     * Set up the user event.
     * What does this do? It sets up the user event.
     * What does it simulate? It simulates the user event.
     */
    const user = userEvent.setup();
  
    /**
     * Set the search string to the washington location coordinates.
     * What does this do? It sets the search string to the washington location coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=38.8950982&lng=-77.0363849";
  
    /**
     * Set the cached location.
     * What does this do? It sets the cached location.
     * What does it simulate? It simulates the setQueryData function.
     */
    queryClient.setQueryData(
      locationQueryKeys.location(
        washingtonLocation.latitude,
        washingtonLocation.longitude
      ),
      washingtonLocation
    );
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);
  
    /**
     * Get the search input.
     * What does this do? It gets the search input.
     * What does it simulate? It simulates the getByRole function.
     */
    const searchInput = screen.getByRole(
      "combobox",
      { name: /search locations/i }
    );
  
    /**
     * Wait for the search input to have the washington location display name.
     * What does this do? It waits for the search input to have the washington location display name.
     * What does it simulate? It simulates the waitFor function.
     */
    await waitFor(() => {
      expect(searchInput).toHaveValue(
        washingtonLocation.displayName
      );
    });
  
    /**
     * Clear the search input.
     * What does this do? It clears the search input.
     * What does it simulate? It simulates the clear function.
     */
    await user.clear(searchInput);
  
    /**
     * Check if the navigation replace function has been called.
     * What does this do? It checks if the navigation replace function has been called.
     * What does it simulate? It simulates the toHaveBeenCalledWith function.
     */
    expect(navigation.replace).toHaveBeenCalledWith(
      "/locations"
    );
  });

  /**
   * Test case for showing a loading status while restoring a URL location.
   * What does this do? It tests the showing a loading status while restoring a URL location.
   * What does it simulate? It simulates the showing a loading status while restoring a URL location.
   */
  it("shows a loading status while restoring a URL location", async () => {
    /**
     * Set the search string to the washington location coordinates.
     * What does this do? It sets the search string to the washington location coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=38.8950982&lng=-77.0363849";
  
    /**
     * Mock the getLocationByCoordinates function.
     * What does this do? It mocks the getLocationByCoordinates function.
     * What does it simulate? It simulates the getLocationByCoordinates function.
     */
    vi.mocked(
      getLocationByCoordinates
    ).mockImplementation(
      () => new Promise(() => {})
    );
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);

    /**
     * Check if the resolving location text is in the document.
     * What does this do? It checks if the resolving location text is in the document.
     * What does it simulate? It simulates the getByRole function.
     */
    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      /resolving location/i
    );

    /**
     * Check if the location map is not in the document.
     * What does this do? It checks if the location map is not in the document.
     * What does it simulate? It simulates the queryByTestId function.
     */
    expect(
      screen.queryByTestId("location-map")
    ).not.toBeInTheDocument();
  });

  /**
   * Test case for updating URL coordinates when the map is clicked.
   * What does this do? It tests the updating URL coordinates when the map is clicked.
   * What does it simulate? It simulates the updating URL coordinates when the map is clicked.
   */
  it("updates URL coordinates when the map is clicked", async () => {
    /**
     * Set up the user event.
     * What does this do? It sets up the user event.
     * What does it simulate? It simulates the user event.
     */
    const user = userEvent.setup();
  
    /**
     * Set the search string to the washington location coordinates.
     * What does this do? It sets the search string to the washington location coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=38.8950982&lng=-77.0363849";
  
    /**
     * Set the cached location.
     * What does this do? It sets the cached location.
     * What does it simulate? It simulates the setQueryData function.
     */
    queryClient.setQueryData(
      locationQueryKeys.location(
        washingtonLocation.latitude,
        washingtonLocation.longitude
      ),
      washingtonLocation
    );
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);
  
    /**
     * Get the location map.
     * What does this do? It gets the location map.
     * What does it simulate? It simulates the findByTestId function.
     */
    const map = await screen.findByTestId(
      "location-map"
    );
  
    /**
     * Check if the location map has the washington location display name.
     * What does this do? It checks if the location map has the washington location display name.
     * What does it simulate? It simulates the toHaveTextContent function.
     */
    expect(map).toHaveTextContent(
      "Washington"
    );
  
    /**
     * Click the location map.
     * What does this do? It clicks the location map.
     * What does it simulate? It simulates the click function.
     */
    await user.click(
      screen.getByRole("button", {
        name: /simulate baltimore map click/i,
      })
    );
  
    /**
     * Check if the navigation replace function has been called.
     * What does this do? It checks if the navigation replace function has been called.
     * What does it simulate? It simulates the toHaveBeenCalledWith function.
     */
    expect(
      navigation.replace
    ).toHaveBeenCalledWith(
      "/locations?lat=39.2904&lng=-76.6122"
    );
  });

  /**
   * Test case for restoring location details and map from URL coordinates.
   * What does this do? It tests the restoring location details and map from URL coordinates.
   * What does it simulate? It simulates the restoring location details and map from URL coordinates.
   */
  it("restores location details and map from URL coordinates", async () => {
    /**
     * Set the search string to the washington location coordinates.
     * What does this do? It sets the search string to the washington location coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=38.8950982&lng=-77.0363849";
  
    /**
     * Mock the getLocationByCoordinates function.
     * What does this do? It mocks the getLocationByCoordinates function.
     * What does it simulate? It simulates the getLocationByCoordinates function.
     */
    vi.mocked(
      getLocationByCoordinates
    ).mockResolvedValue(
      washingtonLocation
    );
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);
  
    /**
     * Wait for the getLocationByCoordinates function to have been called.
     * What does this do? It waits for the getLocationByCoordinates function to have been called.
     * What does it simulate? It simulates the waitFor function.
     */
    await waitFor(() => {
      expect(
        getLocationByCoordinates
      ).toHaveBeenCalledWith(
        washingtonLocation.latitude,
        washingtonLocation.longitude
      );
    });
  
    /**
     * Check if the location map has the washington location display name.
     * What does this do? It checks if the location map has the washington location display name.
     * What does it simulate? It simulates the toHaveTextContent function.
     */
    expect(
      await screen.findByTestId(
        "location-map"
      )
    ).toHaveTextContent(
      "Washington"
    );
  
    /**
     * Check if the search input has the washington location display name.
     * What does this do? It checks if the search input has the washington location display name.
     * What does it simulate? It simulates the toHaveValue function.
     */
    expect(
      screen.getByRole("combobox", {
        name: /search locations/i,
      })
    ).toHaveValue(
      washingtonLocation.displayName
    );
  });

  /**
   * Test case for not reverse-geocoding invalid URL coordinates.
   * What does this do? It tests the not reverse-geocoding invalid URL coordinates.
   * What does it simulate? It simulates the not reverse-geocoding invalid URL coordinates.
   */
  it("does not reverse-geocode invalid URL coordinates", async () => {
    /**
     * Set the search string to the invalid coordinates.
     * What does this do? It sets the search string to the invalid coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=hello&lng=999";
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);
  
    /**
     * Check if the getLocationByCoordinates function has not been called.
     * What does this do? It checks if the getLocationByCoordinates function has not been called.
     * What does it simulate? It simulates the nottoHaveBeenCalled function.
     */
    expect(
      getLocationByCoordinates
    ).not.toHaveBeenCalled();
  
    /**
     * Check if the location map is not in the document.
     * What does this do? It checks if the location map is not in the document.
     * What does it simulate? It simulates the queryByTestId function.
     */
    expect(
      screen.queryByTestId("location-map")
    ).not.toBeInTheDocument();
  });

  /**
   * Test case for allowing the user to retry a failed location restoration.
   * What does this do? It tests the allowing the user to retry a failed location restoration.
   * What does it simulate? It simulates the allowing the user to retry a failed location restoration.
   */
  it("allows the user to retry a failed location restoration", async () => {
    /**
     * Set up the user event.
     * What does this do? It sets up the user event.
     * What does it simulate? It simulates the user event.
     */
    const user = userEvent.setup();
  
    /**
     * Set the search string to the washington location coordinates.
     * What does this do? It sets the search string to the washington location coordinates.
     * What does it simulate? It simulates the navigation object.
     */
    navigation.search =
      "?lat=38.8950982&lng=-77.0363849";
  
    /**
     * Mock the getLocationByCoordinates function.
     * What does this do? It mocks the getLocationByCoordinates function.
     * What does it simulate? It simulates the getLocationByCoordinates function.
     */
    vi.mocked(
      getLocationByCoordinates
    )
      .mockRejectedValueOnce(
        new Error("Reverse geocoding failed")
      )
      .mockResolvedValueOnce(
        washingtonLocation
      );
  
    /**
     * Render the component with the query client.
     * What does this do? It renders the component with the query client.
     * What does it simulate? It simulates the render function.
     */
    renderWithQueryClient(<LocationSearch />);
  
    /**
     * Get the retry button.
     * What does this do? It gets the retry button.
     * What does it simulate? It simulates the findByRole function.
     */
    const retryButton = await screen.findByRole(
      "button",
      { name: /try again/i }
    );
  
    /**
     * Check if the unable to restore location text is in the document.
     * What does this do? It checks if the unable to restore location text is in the document.
     * What does it simulate? It simulates the getByText function.
     */
    expect(
      screen.getByText(
        /unable to restore location/i
      )
    ).toBeInTheDocument();
  
    /**
     * Click the retry button.
     * What does this do? It clicks the retry button.
     * What does it simulate? It simulates the click function.
     */
    await user.click(retryButton);
  
    /**
     * Check if the location map has the washington location display name.
     * What does this do? It checks if the location map has the washington location display name.
     * What does it simulate? It simulates the toHaveTextContent function.
     */
    expect(
      await screen.findByTestId(
        "location-map"
      )
    ).toHaveTextContent("Washington");
  
    /**
     * Check if the getLocationByCoordinates function has been called twice.
     * What does this do? It checks if the getLocationByCoordinates function has been called twice.
     * What does it simulate? It simulates the toHaveBeenCalledTimes function.
     */
    expect(
      getLocationByCoordinates
    ).toHaveBeenCalledTimes(2);
  });
});