
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationToggleProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export function NavigationToggle({ onSectionChange, currentSection }: NavigationToggleProps) {
  const sections = [
    { id: "quote", label: "Quote" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About Me" }
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      <div className="glass-effect rounded-3xl p-3 backdrop-blur-md shadow-2xl">
        <div className="flex space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "px-8 py-4 md:px-10 md:py-5 rounded-2xl text-lg md:text-xl font-medium transition-all duration-500 relative overflow-hidden min-w-[140px] md:min-w-[160px]",
                currentSection === section.id
                  ? "bg-brand-green text-white shadow-xl transform scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-102"
              )}
            >
              <span className="relative z-10">{section.label}</span>
              {currentSection === section.id && (
                <div className="absolute inset-0 bg-brand-green rounded-2xl animate-scale-in shadow-lg" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
