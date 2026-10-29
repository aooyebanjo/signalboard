
import {
  Activity,
  GitFork,
  MessageCircle,
  Newspaper,
  Star,
  FolderGit2,
} from "lucide-react";

/**
 * Interface for the analytics overview props.
 */
import {
  AnalyticsOverview as AnalyticsOverviewType,
} from "@/features/analytics/types/analytics";

/**
 * Component for displaying analytics overview header.
 */
import {
  AnalyticsOverviewHeader
} from '@/features/analytics/components/analytics-overview-header';

/**
 * Metric card collection component for displaying a collection of metric cards.
 */
import {
  MetricCardCollection,
} from '@/features/analytics/components/metric-card-collection';

/**
 * Component for displaying language distribution chart.
 */
import {
  LanguageDistributionChart
} from '@/features/analytics/components/language-distribution-chart';

/**
 * Component for displaying story engagement chart.
 */
import {
  StoryEngagementChart
} from "@/features/analytics/components/story-engagement-chart";

/**
 * Interface for the analytics overview props.
 */
interface AnalyticsOverviewProps {
  /**
   * The analytics data for the given username.
   */
  analytics: AnalyticsOverviewType;
};

/**
 * AnalyticsOverview is a React Component that displays the analytics overview for a given username.
 * 
 * @param analytics The analytics data for the given username.
 * @returns A React component that displays the analytics overview for a given username.
 */
export function AnalyticsOverview({
  analytics
}: AnalyticsOverviewProps) {
  const { stories, developers, scope } = analytics;

  const hackerNewsMetricCardsData = [
    {
      title: "Stories Analyzed",
      value: stories.totalStories,
      icon: <Newspaper className="size-4" />,
    },
    {
      title: "Total Story Score",
      value: stories.totalScore,
      icon: <Star className="size-4" />,
    },
    {
      title: "Total Comments",
      value: stories.totalComments,
      icon: <MessageCircle className="size-4" />,
    },
    {
      title: "Average Story Score",
      value: stories.averageScore,
      icon: <Activity className="size-4" />,
    },
  ];

  /**
   * Collection of metric cards for Github repositories.
   */
  const developerRepositoryetricCardsData = [
    {
      title: "Repositories Analyzed",
      value: developers.totalRepositories,
      description: `${scope.repositorySampleSize} repositories retrieved`,
      icon: <FolderGit2 className="size-4" />,
    },
    {
      title: "Total Stars",
      value: developers.totalStars,
      icon: <Star className="size-4" />,
    },
    {
      title: "Total Forks",
      value: developers.totalForks,
      icon: <GitFork className="size-4" />,
    },
  ];

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="story-metrics-heading"
        className="space-y-4"
      >
        {/**
         * Header section for the analytics overview, for Hacker News Stories
         */}
        <AnalyticsOverviewHeader
          analyticsOverviewId="story-metrics-heading"
          headerTitle="Technology Engagement"
          headerContent={`Metrics from ${scope.storySampleSize} retrieved Hacker News stories.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/**
           * Collection of metric cards for Hacker News stories.
           */}
          <MetricCardCollection
            cardsCollectionData={hackerNewsMetricCardsData}
          />
        </div>
      </section>

      <section
        aria-labelledby="developer-metrics-heading"
        className="space-y-4"
      >
        {/**
         * Header section for the analytics overview, for Developer Repositories
         */}
        <AnalyticsOverviewHeader
          analyticsOverviewId="developer-metrics-heading"
          headerTitle="Developer Repositories"
          headerContent={`Repository statistics for ${scope.username}`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/**
           * Collection of metric cards for Github repositories.
           */}
          <MetricCardCollection
            cardsCollectionData={developerRepositoryetricCardsData}
          />
        </div>
      </section>

      <section
        aria-label="Analytic Visualization"
        className="grid min-w-0 gap-6 xl:grid-cols-2"
      >
        {/**
         * Hacker News Story engagement chart.
         */}
        <div className="min-w-0">
          <StoryEngagementChart
            stories={stories}
          />
        </div>

        {/**
         * Developer language distribution chart.
         */}
        <div className="min-w-0">
          <LanguageDistributionChart
            data={analytics.languages}
          />
        </div>
      </section>
    </div>
  );
}
