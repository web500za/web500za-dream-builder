
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export function PortfolioSection() {
  const projects = [
    {
      title: "Booking System",
      description: "Appointment scheduling with calendar integration and automated reminders",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Business"
    },
    {
      title: "Wedding Website",
      description: "Beautiful wedding site with RSVP management and guest information",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      category: "Event"
    },
    {
      title: "Meal Placement Form",
      description: "Custom ordering system with dietary preferences and delivery tracking",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      category: "E-commerce"
    },
    {
      title: "Property Showcase",
      description: "Real estate portfolio with virtual tours and contact forms",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      category: "Real Estate"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 text-shadow">
          Recent Projects
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          See what I've built for other clients. Each project is custom-designed 
          and built to meet specific needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="glass-effect border-white/20 overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-brand-green text-white p-4 rounded-full hover:bg-brand-green/90 transition-colors">
                  <Play className="h-8 w-8" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/80">{project.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
