
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationToggle } from "@/components/NavigationToggle";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("quote");

  const renderSection = () => {
    switch (currentSection) {
      case "quote":
        return <HeroSection />;
      case "portfolio":
        return <PortfolioSection />;
      case "about":
        return <AboutSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-purple-dark to-brand-purple" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12">
        <ThemeToggle />
        
        <div className="w-full max-w-7xl mx-auto">
          <NavigationToggle 
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />
          
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl" />
    </div>
  );
};

export default Index;
