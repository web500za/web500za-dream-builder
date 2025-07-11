import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { PortfolioModal } from "./PortfolioModal";

interface PortfolioSectionProps {
  onNavigateToQuote: () => void;
}

export function PortfolioSection({ onNavigateToQuote }: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "Bloom & Branch",
      tagline: "Arrangements as Art",
      description: "Elegant floral studio showcasing artistic arrangements with sophisticated design and seamless booking experience.",
      category: "Florist",
      color: "#E4756B",
      url: "/portfolio examples/bloom-branch-site.html",
      image: "/portfolio thumbnails/{558AA998-057A-4FEF-B9BB-14BFEAE67654}.png"
    },
    {
      title: "FLOW Studio",
      tagline: "Move with Intention", 
      description: "Modern pilates studio combining wellness philosophy with clean, intentional design and class scheduling.",
      category: "Wellness",
      color: "#C99A8F",
      url: "/portfolio examples/flow-studio-pilates.html",
      image: "/portfolio thumbnails/{C249475B-BDD2-4C9B-8A43-19A322C2B222}.png"
    },
    {
      title: "Meridian Legal",
      tagline: "Justice Shouldn't Feel Intimidating",
      description: "Approachable law firm breaking down barriers with warm design and clear communication of legal services.",
      category: "Professional Services", 
      color: "#1A2332",
      url: "/portfolio examples/meridian-legal.html",
      image: "/portfolio thumbnails/{90CDA8D2-BCBB-4101-AF1C-52D79C330D6E}.png"
    },
    {
      title: "SAGE Therapy",
      tagline: "Space to Grow",
      description: "Compassionate therapy practice creating safe digital spaces with calming design and easy appointment booking.",
      category: "Healthcare",
      color: "#7C9885", 
      url: "/portfolio examples/sage-therapy-site.html",
      image: "/portfolio thumbnails/{16367EBD-A8E0-4D91-974A-21D9CA1CD49C}.png"
    }
  ];

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 md:pt-6">
      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
        {projects.map((project, index) => (
          <div key={index} className="group">
            <button 
              onClick={() => handleProjectClick(project)}
              className="block w-full text-left"
            >
              <Card className="overflow-hidden border border-gray-200 rounded-3xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Hero Thumbnail */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-text-dark mb-3 group-hover:text-[#2d5a3d] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-gray-500 italic font-light mb-4">
                    {project.tagline}
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* View Project CTA */}
                  <div className="flex items-center space-x-3 text-[#2d5a3d] group-hover:translate-x-2 transition-transform">
                    <span className="font-semibold">View Live Site</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </button>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center space-y-8">
        <p className="text-xl text-gray-600 mb-8">
          Ready to see your business transformed?
        </p>
        <Button 
          onClick={onNavigateToQuote}
          className="h-16 bg-[#2d5a3d] hover:bg-[#1e3d28] text-white px-12 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:ring-offset-2 border-0"
          style={{ backgroundColor: '#2d5a3d' }}
        >
          Get Your Quote
        </Button>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}
