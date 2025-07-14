import { useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { HeroSection } from "@/components/HeroSection";
import { PillNav } from "@/components/PillNav";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("quote");
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [showPricingBadge, setShowPricingBadge] = useState(true);
  const [triggerTextareaGlow, setTriggerTextareaGlow] = useState(false);

  // Enhanced navigation with glow effect
  const handleNavigateToQuote = () => {
    setCurrentSection("quote");
    // Trigger the glow effect after a short delay to ensure the component is rendered
    setTimeout(() => {
      setTriggerTextareaGlow(true);
      // Reset the trigger after the glow animation
      setTimeout(() => {
        setTriggerTextareaGlow(false);
      }, 2500);
    }, 100);
  };
  // Optimized smooth scroll function
  const smoothScrollTo = (element: HTMLElement) => {
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 24;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleLaunchSpecialClick = () => {
    setCurrentSection("quote");
    setIsPricingOpen(true);
    setShowPricingBadge(false);
    
    // On mobile, scroll to pricing section after a short delay
    if (window.innerWidth < 768) { // md breakpoint
      setTimeout(() => {
        const pricingSection = document.querySelector('.mobile-pricing-section') as HTMLElement;
        if (pricingSection) {
          smoothScrollTo(pricingSection);
        }
      }, 100);
    }
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (section === 'about' && window.innerWidth < 768) {
      setTimeout(() => {
        const aboutPhoto = document.getElementById('about-photo');
        if (aboutPhoto) {
          smoothScrollTo(aboutPhoto);
        }
      }, 100);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case "quote":
        return <HeroSection 
          isPricingOpen={isPricingOpen} 
          setIsPricingOpen={setIsPricingOpen}
          showPricingBadge={showPricingBadge}
          setShowPricingBadge={setShowPricingBadge}
          triggerTextareaGlow={triggerTextareaGlow}
        />;
      case "work":
        return <PortfolioSection onNavigateToQuote={handleNavigateToQuote} />;
      case "about":
        return <AboutSection onNavigateToQuote={handleNavigateToQuote} />;
      case "contact":
        return <ContactSection />;
      default:
        return <HeroSection 
          isPricingOpen={isPricingOpen} 
          setIsPricingOpen={setIsPricingOpen}
          showPricingBadge={showPricingBadge}
          setShowPricingBadge={setShowPricingBadge}
          triggerTextareaGlow={triggerTextareaGlow}
        />;
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
        <div className="w-full max-w-7xl mx-auto pt-4 md:pt-8 px-4 md:px-6 lg:px-8">
          <BrandHeader onLaunchSpecialClick={handleLaunchSpecialClick} />
          
          {/* Navigation */}
          <PillNav 
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
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
