
import { ReactNode } from "react";

import { MetricCard } from "@/features/analytics/components/metric-card";

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
 * Interface for the metric card collection props.
 */
interface MetricCardCollectionProps {
  /**
   * The collection of metric cards to display.
   */
  cardsCollectionData: ReadonlyArray<MetricCardProps>;  // Or readonly MetricCardProps[]
};

/**
 * MetricCardCollection is a React Component that displays a collection of metric cards.
 * 
 * @param cardsCollectionData The collection of metric cards to display.
 * @returns A React component that displays a collection of metric cards.
 */
export function MetricCardCollection({
  cardsCollectionData
}: Readonly<MetricCardCollectionProps>) {
  return (
    <>
      {cardsCollectionData.map((card, index) => (
        <MetricCard
          key={`metric-card-${card.title}-${index}`}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
        />
      ))}
    </>
  );
};
