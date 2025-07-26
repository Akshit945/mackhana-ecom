import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMakhana from "@/components/AboutMakhana";
import HealthBenefits from "@/components/HealthBenefits";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutMakhana />
      <HealthBenefits />
      <Features />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Index;
