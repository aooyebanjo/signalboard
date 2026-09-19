
export function DeveloperProfileSkeleton() {
  return (
    <section 
      className="animate-pulse rounded-lg border p-6"
      aria-label="Loading developer profile"
    >
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 rounded-full bg-gray-200">
        </div>

        <div className="flex-1 space-y-3">
          <div className="h-6 w-24 rounded bg-gray-200">
          </div>

          <div className="h-4 w-32 rounded bg-gray-200">
          </div>

          <div className="h-4 max-w-md rounded bg-gray-200">
          </div>

          <div className="h-4 max-w-sm rounded bg-gray-200">
          </div>
        </div>
      </div>
    </section>
  );
}
