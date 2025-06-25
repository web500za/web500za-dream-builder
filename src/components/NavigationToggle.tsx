
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
      <div className="glass-effect rounded-2xl p-2 backdrop-blur-md shadow-lg">
        <div className="flex space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden min-w-[90px] md:min-w-[110px]",
                currentSection === section.id
                  ? "bg-brand-green text-white shadow-md transform scale-102"
                  : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-101"
              )}
            >
              <span className="relative z-10">{section.label}</span>
              {currentSection === section.id && (
                <div className="absolute inset-0 bg-brand-green rounded-xl animate-scale-in shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
