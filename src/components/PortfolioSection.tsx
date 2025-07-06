import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function PortfolioSection() {
  const projects = [
    {
      title: "Silethokuhle Elevate Digital",
      description: "A professional virtual assistant website showcasing services, testimonials, and contact information. This clean, modern design emphasizes professionalism and trust, with smooth animations and mobile-responsive layout. Perfect for establishing credibility and attracting new clients in the VA industry.",
      image: "/lovable-uploads/va-thumbnail.png",
      category: "Virtual Assistant",
      url: "https://silethokuhle-elevate-digital.vercel.app/",
      features: ["Service showcase", "Testimonials", "Contact forms", "Mobile responsive", "Professional design"],
      isLive: true
    },
    {
      title: "Photography Portfolio",
      description: "A stunning photography portfolio showcasing beautiful moments captured through the lens. This elegant website features a clean design that puts the focus on the visual storytelling, with smooth navigation and responsive galleries that work perfectly on all devices.",
      image: "/lovable-uploads/photograph-thumbnail.png",
      category: "Photography",
      url: "https://zinhle-nkosi-visions.vercel.app/",
      features: ["Portfolio galleries", "Responsive design", "Image optimization", "Contact forms"],
      isLive: true
    },
    {
      title: "Barber Booking System",
      description: "This booking system was designed with a local barber in mind, featuring business-specific customizations tailored to real-world needs. The platform supports instant online bookings, same-day slots, and even accounts for unique requirements, such as the 12:15pm to 1:15pm Maghrib break observed by Muslim barbers. It's a great example of how w5z can deliver solutions that fit your business, your schedule, and your clients.",
      image: "/lovable-uploads/barebr-thumbnail.png",
      category: "Business",
      url: "https://prince-cut-scheduler.vercel.app/",
      features: ["Appointment scheduling", "Calendar integration", "Automated reminders", "Mobile responsive"],
      isLive: true
    },
    {
      title: "Wedding Website",
      description: "A beautiful, personalized wedding website that tells your love story and helps guests stay informed. Features include RSVP management, event details, photo galleries, and travel information. Perfect for couples who want to share their special day with family and friends in a modern, elegant way.",
      image: "/lovable-uploads/wedding-thumbnail.png",
      category: "Wedding",
      url: "https://coral-kiss-digital.vercel.app/",
      features: ["RSVP management", "Event details", "Photo galleries", "Travel info", "Mobile responsive"],
      isLive: true
    },
    {
      title: "Meal Placement Form",
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
          Below are examples of websites and solutions I've built for real clients. Each project is tailored to unique business needs, demonstrating a range of skills and industries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="border border-brand-green/10 rounded-2xl bg-white/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] p-6">
            {project.isLive ? (
              <>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block w-full mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl border border-brand-green/10"
                  />
                </a>
                <h3 className="text-xl font-semibold text-brand-text-dark mb-2 text-center">{project.title}</h3>
                <p className="text-brand-text-muted mb-4 text-center text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {project.features && project.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex} 
                      className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brand-green font-semibold underline underline-offset-4 text-sm hover:text-brand-green-light transition-colors">Visit Site</a>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full min-h-[180px]">
                <span className="text-brand-text-muted text-lg font-medium mb-2">{project.title}</span>
                <span className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm">Coming soon</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
