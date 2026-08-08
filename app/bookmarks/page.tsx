import { Plus } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Bookmarks"
        description="View and organize saved stories and locations."
        actions={
          <Button type="button">
            <Plus size={16} />
            Create Collection
          </Button>
        }
      />
    </section>
  );
};