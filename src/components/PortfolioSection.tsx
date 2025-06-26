import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function PortfolioSection() {
  const projects = [
    {
      title: "Barber Booking System (Demo)",
      description: "This booking system was designed with a local barber in mind, featuring business-specific customizations tailored to real-world needs. The platform supports instant online bookings, same-day slots, and even accounts for unique requirements—like the 12:15pm–13:15pm Maghrib break observed by Muslim barbers. It's a great example of how w5z can deliver solutions that fit your business, your schedule, and your clients.",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
      category: "Business",
      url: "https://prince-cut-scheduler.vercel.app/",
      features: ["Appointment scheduling", "Calendar integration", "Automated reminders", "Mobile responsive"],
      isLive: true
    },
    {
      title: "Wedding Website",
      description: "Beautiful wedding site with RSVP management and guest information",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      category: "Event",
      url: "#",
      features: ["RSVP management", "Guest information", "Photo gallery", "Event details"],
      isLive: false
    },
    {
      title: "Meal Placement Form",
      description: "Custom ordering system with dietary preferences and delivery tracking",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      category: "E-commerce",
      url: "#",
      features: ["Custom ordering", "Dietary preferences", "Delivery tracking", "Payment integration"],
      isLive: false
    },
    {
      title: "Property Showcase",
      description: "Real estate portfolio with virtual tours and contact forms",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      category: "Real Estate",
      url: "#",
      features: ["Virtual tours", "Contact forms", "Property listings", "Image galleries"],
      isLive: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-brand-text-dark mb-4 text-shadow">
          Recent Projects
        </h2>
        <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
          See what I've built for other clients. Each project is custom-designed 
          and built to meet specific needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="glass-effect border-brand-green/20 overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {project.isLive ? (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-green text-white p-4 rounded-full hover:bg-brand-green-light transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="h-6 w-6" />
                    <span className="text-sm font-medium">Visit Site</span>
                  </a>
                ) : (
                  <div className="bg-brand-text-muted text-white p-4 rounded-full flex items-center gap-2">
                    <span className="text-sm font-medium">Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              {!project.isLive && (
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-text-muted text-white px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-brand-text-dark mb-2">{project.title}</h3>
              <p className="text-brand-text-muted mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex} 
                    className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
