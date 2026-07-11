import ArticleForm from "./components/ArticleForm";
import ArticleEditor from "./components/ArticleEditor";
import ImagePanel from "./components/ImagePanel";
import PublishPanel from "./components/PublishPanel";
import DashboardStats from "./components/DashboardStats";
import ManageArticles from "./components/ManageArticles";
import { CMSProvider } from "./context/CMSContext";

export default function AdminPage() {
  return (
    <CMSProvider>

      <main className="min-h-screen bg-gray-100">

        {/* Header */}
        <header className="bg-black border-b-4 border-yellow-500 px-8 py-6">

          <h1 className="text-4xl font-extrabold text-yellow-400">
            EGH NEWS CMS
          </h1>

          <p className="mt-2 text-gray-300">
            EverybodyGoHear Professional Newsroom
          </p>

        </header>

        {/* Dashboard Statistics */}
        <section className="mx-auto max-w-7xl px-6 pt-10">
          <DashboardStats />
        </section>

        {/* Main Layout */}
        <section className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">

              <ArticleForm />

              <ArticleEditor />

            </div>

            {/* Right Column */}
            <div className="space-y-8">

              <ImagePanel />

              <PublishPanel />

            </div>

          </div>

        </section>

        {/* Manage Articles */}
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <ManageArticles />
        </section>

      </main>

    </CMSProvider>
  );
}