import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

export default function DiscoverPage() {
  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div>
        <PageHeader
          title="Discover"
          description="Search and explore stories from multiple data sources."
        />
      </div>

      <div className="mt-8 max-w-xl">
        <label
           htmlFor="story-search"
           className="mb-2 block text-sm font-medium text-slate-700"
         >
          Search Stories
        </label>

        <Input
          id="story-search"
          type="search"
          placeholder="Search stories..."
        />
      </div>
    </section>
  );
}