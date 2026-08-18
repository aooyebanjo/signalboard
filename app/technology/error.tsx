"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

interface TechnologyErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function TechnologyError({
  error,
  reset,
}: TechnologyErrorProps) {
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Technology"
        description="Explore trending technology stories and discussions."
      />

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle
            size={24}
            className="shrink-0 text-red-600"
          />

          <div>
            <h2 className="font-semibold text-red-900">
              Unable to load stories
            </h2>

            <p className="mt-2 text-sm text-red-700">
              SignalBoard could not retrieve the latest technology
              stories. Please try again.
            </p>

            <Button
              type="button"
              variant="secondary"
              className="mt-4"
              onClick={reset}
            >
              <RotateCcw size={16} />
              Try again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}