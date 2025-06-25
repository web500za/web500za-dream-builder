import { useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { NavigationToggle } from "@/components/NavigationToggle";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("quote");

  const handleNavigateToQuote = () => {
    setCurrentSection("quote");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "quote":
        return <HeroSection />;
      case "portfolio":
        return <PortfolioSection />;
      case "about":
        return <AboutSection onNavigateToQuote={handleNavigateToQuote} />;
      case "testimonials":
        return <TestimonialsSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-eggshell via-brand-eggshell-light to-brand-eggshell-dark" />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-6 md:py-12">
        <div className="w-full max-w-7xl mx-auto">
          <BrandHeader />
          
          <NavigationToggle 
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
          
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
