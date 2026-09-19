import { DeveloperSearch } from "@/features/developers/components/developer-search";

/**
 * DevelopersPage component
 * 
 * This component displays a page for exploring developer activity on GitHub.
 * It includes a search component to find developers and their repositories.
 * 
 * @returns {JSX.Element} The DevelopersPage component
 */
export default function DevelpersPage() {
  // Return the DevelopersPage component
  return (
    // Main section with padding and responsive spacing
    <section className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        {/* Page title */}
        <h1 className="text-2xl font-bold">
          Developer Activity
        </h1>

        <p className="text-muted-foreground">
          Explore Github developer profiles and repository activity
        </p>
      </div>

      {/* Developer search component */}
      <DeveloperSearch 
      />
    </section>
  );
};
