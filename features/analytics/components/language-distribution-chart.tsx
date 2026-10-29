"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Type for the language distribution data.
 */
import {
  LanguageDistribution
} from "@/features/analytics/types/analytics";

/**
 * Interface for the language distribution chart props.
 */
interface LanguageDistributionChartProps {
  data: readonly LanguageDistribution[];
};

/**
 * React component for displaying language distribution chart.
 * 
 * @param data The language distribution data.
 * @returns A React component that displays the language distribution chart.
 */
export function LanguageDistributionChart({
  data,
}: LanguageDistributionChartProps) {
  if (data.length === 0) {
    return (
      <div
        role="status"
        className="flex min-h-64 items-center justify-center rounded-xl border p-6 text-sm text-muted-foreground"
      >
        No programming language data available
      </div>
    );
  }

  return (
    <section
      aria-labelledby="language-chart-heading"
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      {/* Header section for the language distribution chart. */}
      <div className="mb-6 space-y-1">
        <h3
          id="language-chart-heading"
          className="text-lg font-semibold"
        >
          Programming Language Distribution
        </h3>

        <p className="text-sm text-muted-foreground">
          Number of repositories by primary language
        </p>
      </div>

      {/* Chart section for the language distribution chart. */}
      <div
        role="img"
        aria-label="Bar chart showing the number of repositories for each programming language"
        className="flex min-h-80 w-full min-w-0"
      >
        <div className="flex-1">
          {/* Responsive container for the bar chart. */}
          <ResponsiveContainer width="100%" height="100%">

            {/* Bar chart for displaying the number of repositories by primary language. */}
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                allowDecimals={false}
              />

              <YAxis
                type="category"
                dataKey="language"
                width={100}
              />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Repositories",
                ]}
              />

              <Bar
                dataKey="count"
                name="Repositories"
                fill="#6366f1"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold">
          Language Breakdown
        </h4>

        {/* Table for displaying the number of repositories by primary language. */}
        <table className="w-full text-sm">

          {/* Table header for displaying the number of repositories by primary language. */}
          <thead>
            <tr className="border-b text-left">

              {/* Table header for the programming language. */}
              <th scope="col" className="py-2">
                Language
              </th>

              {/* Table header for the number of repositories. */}
              <th scope="col" className="py-2 text-right">
                Repositories
              </th>
            </tr>
          </thead>

          {/* Table body for displaying the number of repositories by primary language. */}
          <tbody>
            {data.map((item) => (
              <tr
                key={item.language}
                className="border-b last:border-0"
              >
                <th
                  scope="row"
                  className="py-2 text-left font-normal"
                >
                  {item.language}
                </th>

                <td
                  className="py-2 text-right tabular-nums"
                >
                  {item.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
