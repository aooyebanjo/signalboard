
import {
  describe,
  it,
  expect,
} from "vitest";

import {
  screen,
  render,
  within,
} from "@testing-library/react"

import {
  LanguageDistributionChart,
} from "./language-distribution-chart";

describe("LanguageDistributionChart", () => {
  const languages = [
    { language: "TypeScript", count: 3 },
    { language: "JavaScript", count: 2 },
    { language: "Python", count: 1 },
  ];

  it("renders the chart heading", () => {
    render(
      <LanguageDistributionChart
        data={languages}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: /programming language distribution/i
      })
    );
  });

  it("renders the language breakdown table", () => {
    render(
      <LanguageDistributionChart
        data={languages}
      />
    );

    const table = screen.getByRole("table");

    expect(
      within(table).getByRole("rowheader", {
        name: "TypeScript"
      })
    ).toBeInTheDocument();

    expect(
      within(table).getByRole("cell", {
        name: "3"
      })
    ).toBeInTheDocument();
  });

  it("shows an empty state when no data exists", () => {
    render(
      <LanguageDistributionChart
        data={[]}
      />
    );

    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      /no programming language data available/i
    );
  });
});

