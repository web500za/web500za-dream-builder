import { cn } from "@/lib/utils";

interface NavigationToggleProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export function NavigationToggle({ onSectionChange, currentSection }: NavigationToggleProps) {
  const sections = [
    { id: "quote", label: "Quote" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="glass-effect rounded-xl md:rounded-2xl p-1.5 md:p-2 backdrop-blur-md shadow-lg">
        <div className="flex space-x-0.5 md:space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-medium transition-all duration-300 relative overflow-hidden min-w-[70px] md:min-w-[80px] lg:min-w-[100px]",
                currentSection === section.id
                  ? "bg-brand-green text-white shadow-md transform scale-102"
                  : "text-brand-text-muted hover:text-brand-text-dark hover:bg-brand-green/5 hover:scale-101"
              )}
            >
              <span className="relative z-10">{section.label}</span>
              {currentSection === section.id && (
                <div className="absolute inset-0 bg-brand-green rounded-lg md:rounded-xl animate-scale-in shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
