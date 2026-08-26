"use client";

import Link from "next/link";
import { MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { usePrefetchStory } from "@/hooks/use-prefetch-story";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Story } from "../types/story .js";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({
  story,
}: StoryCardProps) {
  // Use the usePrefetchStory hook to prefetch the story, this is used to prefetch the story when the user hovers over the story card
  const prefetchStory = usePrefetchStory();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base">
            <Link
              href={`/technology/${story.id}`}
              onMouseEnter={() => prefetchStory(story.id)}
              onFocus={() => prefetchStory(story.id)}
              className="transition-colors hover:text-slate-600"
            >
              {story.title}
            </Link>
          </CardTitle>

          <Badge>
            {story.score} points
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span>
            by {story.author}
          </span>

          <span>
            {formatDistanceToNow(story.publishedAt, {
              addSuffix: true,
            })}
          </span>

          <span className="inline-flex items-center gap-1">
            <MessageSquare size={14} />

            {story.commentCount}
          </span>

          {story.url && (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-950"
            >
              Read article

              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}