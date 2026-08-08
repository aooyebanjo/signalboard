import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Monitor technology trends, locations, weather, and saved intelligence.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Trending Technology
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Technology stories and topics will appear here.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Weather
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Saved location weather will appear here.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Trending Topics
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Topic analytics will appear here.
          </p>
        </article>
      </div>
    </div>
  );
}
