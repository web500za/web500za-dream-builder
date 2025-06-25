
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
    <div className="text-center max-w-5xl mx-auto px-6">
      {/* Brand Section with Favicon Icon */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/lovable-uploads/04e922e6-ff0a-49bb-b4aa-5c70a79c8f03.png" 
            alt="web500za icon" 
            className="h-12 w-12 md:h-16 md:w-16 object-contain mr-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow">
            web500za
          </h1>
        </div>
      </div>

      {/* Main headline with smaller size */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-shadow leading-tight">
        Websites and Web-Apps from R500…
      </h2>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
        I build and host your idea for free—and you'll only pay if you're happy with the result.
      </p>

      {/* Hero input - prominently large */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative max-w-5xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-28 md:h-32 text-2xl md:text-3xl px-10 md:px-14 pr-28 md:pr-36 bg-white/95 backdrop-blur-md border-0 rounded-3xl shadow-2xl placeholder:text-gray-500 text-gray-900 focus:ring-4 focus:ring-brand-green/30 focus:shadow-[0_0_30px_rgba(65,151,107,0.3)] transition-all duration-300"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-20 md:h-24 w-20 md:w-24 bg-brand-green hover:bg-brand-green/90 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Send className="h-10 md:h-12 w-10 md:w-12 text-white" />
          </Button>
        </div>
      </form>

      {/* Quote response time */}
      <p className="text-white/80 text-base mb-12">
        I aim to respond within 24hrs with slight delays over weekends
      </p>

      {/* How w5z works - expandable */}
      <div className="mb-16 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-2xl p-4 text-white hover:bg-white/10 transition-all duration-300">
            <span className="text-lg font-medium mr-3">How w5z works</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-2xl p-6 mt-4">
              <p className="text-white/90 text-lg leading-relaxed">
                Describe what you need in as much detail as you like. I'll email you a quote, 
                build and host your site for free, and you can request up to 3 rounds of tweaks on your initial idea. 
                <span className="text-brand-green font-semibold"> Only pay if you love it.</span>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Price cards with smaller size */}
      <div className="grid md:grid-cols-3 gap-6">
        {priceCards.map((card, index) => (
          <Card key={index} className="glass-effect border-white/20 p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-brand-green mb-4">{card.price}</p>
            <p className="text-white/80 text-base">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
