
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
    <div className="flex items-center justify-center mb-10">
      <div className="glass-effect rounded-2xl p-2 backdrop-blur-md shadow-xl">
        <div className="flex space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "px-6 py-3 md:px-7 md:py-3 rounded-xl text-base md:text-lg font-medium transition-all duration-500 relative overflow-hidden min-w-[100px] md:min-w-[120px]",
                currentSection === section.id
                  ? "bg-brand-green text-white shadow-lg transform scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-102"
              )}
            >
              <span className="relative z-10">{section.label}</span>
              {currentSection === section.id && (
                <div className="absolute inset-0 bg-brand-green rounded-xl animate-scale-in shadow-md" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
