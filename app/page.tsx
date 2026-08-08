import Image from "next/image";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from "@/components/ui/card";

import { PageHeader } from "@/components/ui/page-header";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <PageHeader
        title="Dashboard"
        description="Monitor technology trends, locations, weather, and saved intelligence."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Trending Technology
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Technology stories and topics will appear here.
          </p>
        </article> */}

        <Card>
          <CardHeader>
            <CardTitle>
              Trending Technology
            </CardTitle>
            <CardDescription>
              Technology stories and topics will appear here.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Weather
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Saved location weather will appear here.
          </p>
        </article> */}

        <Card>
          <CardHeader>
            <CardTitle>
              Weather
            </CardTitle>
            <CardDescription>
              Saved location weather will appear here.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Trending Topics
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Topic analytics will appear here.
          </p>
        </article> */}

        <Card>
          <CardHeader>
            <CardTitle>
              Trending Topics
            </CardTitle>
            <CardDescription>
              Topic analytics will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
