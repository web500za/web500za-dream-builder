import { cn } from "@/lib/utils";

interface PillNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function PillNav({ currentSection, onSectionChange }: PillNavProps) {
  const sections = [
    { id: "quote", label: "Quote" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Talk" }
  ];

  return (
    <div className="flex justify-center mt-1 mb-1 px-6">
      <div className="flex items-center rounded-mobile-xl md:rounded-full p-0.5 bg-white/20 backdrop-blur-sm">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center">
            <button
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "px-2 py-1.5 md:px-6 md:py-3 text-xs md:text-base font-medium transition-all duration-300 rounded-mobile-xl md:rounded-full whitespace-nowrap",
                currentSection === section.id
                  ? "bg-brand-green text-white"
                  : "text-brand-text-muted hover:text-brand-text-dark"
              )}
            >
              {section.label}
            </button>
            {index < sections.length - 1 && (
              <div className="w-px h-3 md:h-5 bg-brand-green/10 mx-0.5 md:mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}