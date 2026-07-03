import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BreakingTicker from "../components/BreakingTicker";
import Hero from "../components/Hero";
import NewsGrid from "../components/NewsGrid";
import Sidebar from "../components/Sidebar";
import MarketWatch from "../components/MarketWatch";
import GhanaToday from "../components/GhanaToday";
import WorldToday from "../components/WorldToday";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <Header />

      <Navbar />

      <BreakingTicker />

      <Hero />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <NewsGrid />
        </div>

        <div>
          <Sidebar />
        </div>

      </section>

      <MarketWatch />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-2">

        <GhanaToday />

        <WorldToday />

      </section>

      <Footer />

    </main>
  );
}
