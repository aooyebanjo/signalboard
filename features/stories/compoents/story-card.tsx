import { MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Story } from "../types/story .ts";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({
  story,
}: StoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base">
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