
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

export function HeroSection() {
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project description:", projectDescription);
    // Handle form submission
  };

  const priceCards = [
    {
      title: "Simple one-pager",
      price: "From R500",
      description: "Perfect for landing pages, portfolios, or basic business sites"
    },
    {
      title: "With bookings or logins",
      price: "From R1000",
      description: "Interactive features, user accounts, booking systems"
    },
    {
      title: "Something bigger?",
      price: "Custom quote",
      description: "Complex web apps, e-commerce, custom functionality"
    }
  ];

  return (
    <div className="text-center max-w-4xl mx-auto px-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto bg-brand-green rounded-2xl flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-white">W5</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow">
          web500za
        </h1>
      </div>

      {/* Main headline */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">
        Websites and Web-Apps from R500…
      </h2>

      {/* Subheading */}
      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        I build and host your idea for free—and you'll only pay if you're happy with the result.
      </p>

      {/* Hero input */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Tell me what you want me to build you"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full h-16 text-lg px-6 pr-16 bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-2xl placeholder:text-gray-500 text-gray-900 focus:ring-2 focus:ring-brand-green"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-2 h-12 w-12 bg-brand-green hover:bg-brand-green/90 rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {/* Quote workflow explanation */}
      <div className="glass-effect rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
        <p className="text-white/90 text-lg leading-relaxed">
          Describe what you need in as much detail as you like. I'll email you a quote, 
          build and host your site for free, and you can request up to 3 rounds of tweaks. 
          <span className="text-brand-green font-semibold"> Only pay if you love it.</span>
        </p>
      </div>

      {/* Price cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {priceCards.map((card, index) => (
          <Card key={index} className="glass-effect border-white/20 p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-brand-green mb-4">{card.price}</p>
            <p className="text-white/80 text-sm">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
