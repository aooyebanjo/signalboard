

/**
 * Interface for the analytics overview header props.
 */
interface AnalyticsOverviewHeaderProps {
  /**
   * The ID of the analytics overview.
   */
  analyticsOverviewId: string;
  /**
   * The title of the analytics overview.
   */
  headerTitle: string;
  /**
   * The content of the analytics overview.
   */
  headerContent: string;
};

/**
 * AnalyticsOverviewHeader is a React Component that displays a header for the analytics overview.
 * 
 * @param analyticsOverviewId The ID of the analytics overview.
 * @param headerTitle The title of the analytics overview.
 * @param headerContent The content of the analytics overview.
 * @returns A React component that displays a header for the analytics overview.
 */
export function AnalyticsOverviewHeader({
  analyticsOverviewId,
  headerTitle,
  headerContent,
}: AnalyticsOverviewHeaderProps) {
  return (
    <div>
      <h3
        id={analyticsOverviewId}
        className="text-lg font-semibold"
      >
        {headerTitle}
      </h3>

      <p className="text-sm text-muted-foreground">
        {headerContent}
      </p>
    </div>
  );
};
