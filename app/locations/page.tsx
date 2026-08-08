import { PageHeader } from "@/components/ui/page-header";

export default function LocationsPage() {
  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Locations"
        description="Monitor weather and environmental information by location."
      />
    </section>
  );
}