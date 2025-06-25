
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Send, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        <div className="w-24 h-24 mx-auto mb-4">
          <img 
            src="/lovable-uploads/35083073-dd64-4fb1-b2c6-607a1c149bdb.png" 
            alt="web500za logo" 
            className="w-full h-full object-contain"
          />
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

      {/* Hero input - made bigger */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-20 text-xl px-8 pr-20 bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-2xl placeholder:text-gray-500 text-gray-900 focus:ring-2 focus:ring-brand-green"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-3 h-14 w-14 bg-brand-green hover:bg-brand-green/90 rounded-xl"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </form>

      {/* Quote response time */}
      <p className="text-white/80 text-sm mb-8">
        I aim to respond within 24hrs with slight delays over weekends
      </p>

      {/* How w5z works - expandable */}
      <div className="mb-12 max-w-3xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-2xl p-4 text-white hover:bg-white/10 transition-colors">
            <span className="text-lg font-medium mr-2">How w5z works</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-2xl p-8 mt-4">
              <p className="text-white/90 text-lg leading-relaxed">
                Describe what you need in as much detail as you like. I'll email you a quote, 
                build and host your site for free, and you can request up to 3 rounds of tweaks on your initial idea. 
                <span className="text-brand-green font-semibold"> Only pay if you love it.</span>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
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
