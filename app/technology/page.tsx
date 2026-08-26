import { PageHeader } from "@/components/ui/page-header";
// import type { Story } from "../../features/stories/types/story .ts";
// import { getTopStories } from "@/features/stories/api/hacker-news";
// import { StoryCard } from "@/features/stories/components/story-card.js";
// import { StoryList } from "./story-list";
import { TechnologyStories } from "@/features/stories/components/technology-strories";

export default /* async */ function TechnologyPage() {
  // const stories: Story[] = await getTopStories();

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Technology"
        description="Explore trending technology stories and discussions."
      />

    {/* <StoryList 
      stories={stories} 
    /> */}
    <TechnologyStories 
    />
    </section>
  );
}