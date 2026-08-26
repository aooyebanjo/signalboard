import { z } from "zod";
import { PageHeader } from "@/components/ui/page-header";
import { StoryDetails } from "@/features/stories/components/story-details";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

interface StoryDetailsPageProps {
  params: Promise<{
    id: number
  }>;
};

export default async function StoryDetailsPage({ params }: StoryDetailsPageProps) {
  const routeParams = await params; 

  const result = paramsSchema.safeParse(routeParams);

  if(!result.success) {
    return (
      <section className="p-4 sm:p-6 md:p-8">
        <PageHeader
          title="Invalid Story"
          description="The story ID must be a positive number."
        />
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Story Details"
        description="View story information and discussion activity."
      />

      <StoryDetails 
        id={result.data.id} 
      />
    </section>
  );
};
