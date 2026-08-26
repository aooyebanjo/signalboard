"use client";

import { ExternalLink, MessageSquare, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/error";
import { useStory } from "@/hooks/useStory";
import { StoryListSkeleton } from "./story-list-skeleton";

interface StoryDetailsProps {
  id: number;
};

export function StoryDetails({ id }: StoryDetailsProps) {
  const {
    data: story,
    error,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useStory(id);

  if(isPending) {
    return (
      <StoryListSkeleton 
      />
    );
  }

  if(isError) {
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">

        <h2 className="font-semibold text-red-900">
          Unable to load story
        </h2>

        <p className="mt-2 text-sm text-red-700">
          {error instanceof ApiError 
            ? error.message 
            : "SignalBoard could not retrieve this story."
          }
        </p>

        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => refetch()}
        >
          <RefreshCw size={16} />
          Try again
        </Button>

      </div>
    );
  }

  return (
    <Card className="mt-8">

      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <CardTitle className="text-xl">
            {story.title}
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
            {formatDistanceToNow(
              story.publishedAt,
              {
                addSuffix: true,
              }
            )}
          </span>

          <span className="inline-flex items-center gap-1">
            <MessageSquare size={14} />
            {story.commentCount} comments
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {story.url && (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Read original article
              <ExternalLink size={16} />
            </a>
          )}

          <Button
            type="button"
            variant="secondary"
            disabled={isRefetching}
            onClick={() => refetch()}
          >
            <RefreshCw
              size={16}
              className={
                isRefetching
                  ? "animate-spin"
                  : undefined
              }
            />

            {isRefetching
              ? "Refreshing..."
              : "Refresh"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


