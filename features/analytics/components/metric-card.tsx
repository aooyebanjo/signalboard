
import { ReactNode } from "react";

/**
 * Interface for the metric card props.
 */
interface MetricCardProps {
  /**
   * The title of the metric card.
   */
  title: string;
  /**
   * The value of the metric card; which could be a number or a string.
   */
  value: number | string;
  /**
   * The description of the metric card; optional.
   */
  description?: string;
  /**
   * The icon of the metric card; optional.
   */
  icon?: ReactNode
};


/**
 * MetricCard is a React Component that displays a metric card.
 * 
 * @param title The title of the metric card.
 * @param value The value of the metric card.
 * @param description The description of the metric card.
 * @param icon The icon of the metric card.
 * @returns A React component that displays a metric card.
 */
export function MetricCard({
  title,
  value,
  description,
  icon,
}: MetricCardProps) {

  /**
   * Format the value of the metric card; 
   * if the value is a number, format it as a localized string, 
   * otherwise return the value as is.
   */
  const formattedValue = typeof value === "number"
    ? value.toLocaleString()
    : value;

  /**
   * Render the metric card.
   */
  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex item-start gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>

        {icon && (
          <span
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
        {formattedValue}
      </p>

      {description && (
        <p className="mt-2 text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </article>
  );
}
