import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface StoryListSkeletonProps {
  count?: number;
}

export function StoryListSkeleton({
  count = 6,
}: StoryListSkeletonProps) {
  return (
    <div className="mt-8 grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}