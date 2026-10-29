"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  StoryMetrics
} from "@/features/analytics/types/analytics";

import {
  getStoryEngagementData,
} from "@/features/analytics/utils/get-story-engagement-data";

interface StoryEngagementChartProps {
  stories: StoryMetrics;
};

export function StoryEngagementChart({
  stories,
}: StoryEngagementChartProps) {
  const chartData = getStoryEngagementData(stories);

  if (stories.totalStories === 0) {
    return (
      <div
        role="status"
        className="flex min-h-64 items-center justify-center rounded-xl border p-6 text-sm text-muted-foreground"
      >
        No Hacker News engagement data available
      </div>
    );
  }

  return (
    <section
      aria-labelledby="story-engagement-heading"
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      <header className="mb-6 space-y-1">
        <h3
          id="story-engagement-heading"
          className="text-lg font-semibold"
        >
          Hacker News Engagement
        </h3>

        <p className="text-sm text-muted-foreground">
          Average engagement across{" "}
          {stories.totalStories} retrieved stories.
        </p>
      </header>

      <div
        role="img"
        aria-label="Bar chart comparing average story score and average comments per story"
        className="flex min-h-80 w-full min-w-0"
      >
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="metric"
                tickLine={false}
              />

              <YAxis
                domain={[0, "auto"]}
                allowDecimals={false}
              />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Average per story",
                ]}
              />

              <Bar
                dataKey="value"
                name="Average per story"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                maxBarSize={100}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold">
          Engagement Breakdown
        </h4>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th
                scope="col"
                className="py-2"
              >
                Metric
              </th>

              <th
                scope="col"
                className="py-2 text-right"
              >
                Average per Story
              </th>
            </tr>
          </thead>

          <tbody>
            {chartData.map((item) => (
              <tr
                key={item.metric}
                className="border-b last:border-0"
              >
                <th
                  scope="row"
                  className="py-2 text-left font-normal"
                >
                  {item.metric}
                </th>

                <td className="py-2 text-right tabular-nums">
                  {item.value.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};