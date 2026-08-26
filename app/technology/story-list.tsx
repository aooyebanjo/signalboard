import { StoryCard } from "@/features/stories/components/story-card";

import type { Story } from "@/features/stories/types/story .ts";

interface StoryListProps {
  stories: Story[];
};

export function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="font-semibold text-slate-950">
          No stories available
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          SignalBoard could not find any technology stories to display.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
        />
      ))}
    </div>
  );
}