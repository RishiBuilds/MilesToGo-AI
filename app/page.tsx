import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
      <Footer />
    </div>
  );
}