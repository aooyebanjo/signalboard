import { Card, CardContent, CardHeader} from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

export default function TechnologyLoading() {
  return (
    <section className='p-4 sm:p-6 lg:p-8'>
      <PageHeader 
        title='Technology'
        description='Explore trending technology stories and discussions.'
      />

      <div className='mt-8 grid gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className='h-5 w-3/4 animate-pulse rounded bg-slate-200' />
            </CardHeader>

            <CardContent>
              <div className="flex gap-4">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}