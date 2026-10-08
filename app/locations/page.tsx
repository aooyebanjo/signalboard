import { PageHeader } from "@/components/ui/page-header";

import { LocationSearch } from "@/features/locations/components/location-search";

export default function LocationsPage() {
  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Locations"
        description="Monitor weather and environmental information by location."
      />

      <div className="mt-6">
        <LocationSearch 
        />
      </div>
    </section>
  );
}