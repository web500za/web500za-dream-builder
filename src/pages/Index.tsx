import { useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { NavigationToggle } from "@/components/NavigationToggle";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";

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
        return <PortfolioSection onNavigateToQuote={handleNavigateToQuote} />;
      case "about":
        return <AboutSection onNavigateToQuote={handleNavigateToQuote} />;
      case "testimonials":
        return <TestimonialsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-eggshell via-brand-eggshell-light to-brand-eggshell-dark" />
      
      {/* Fixed Header Area */}
      <div className="relative z-30 w-full">
        <div className="w-full max-w-7xl mx-auto pt-2 md:pt-6 px-2 md:px-4">
          <BrandHeader />
          <NavigationToggle 
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
        </div>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="relative z-20 w-full">
        <div className="w-full max-w-7xl mx-auto px-2 md:px-4 pb-8 md:pb-12">
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
