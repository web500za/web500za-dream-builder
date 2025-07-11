import { useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { HeroSection } from "@/components/HeroSection";
import { PillNav } from "@/components/PillNav";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("quote");

  const renderSection = () => {
    switch (currentSection) {
      case "quote":
        return <HeroSection />;
      case "work":
        return <PortfolioSection onNavigateToQuote={() => setCurrentSection("quote")} />;
      case "about":
        return <AboutSection onNavigateToQuote={() => setCurrentSection("quote")} />;
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
      
      {/* Mobile texture overlay */}
      <div className="md:hidden mobile-texture" />
      
      {/* Header Area */}
      <div className="relative z-30 w-full">
        <div className="w-full max-w-7xl mx-auto pt-4 md:pt-8 px-4 sm:px-6 lg:px-8">
          <BrandHeader />
          
          {/* Navigation */}
          <PillNav 
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="relative z-20 w-full">
        <div className="w-full max-w-7xl mx-auto pb-12 md:pb-12">
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
