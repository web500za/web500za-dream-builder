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
    <div className="text-center max-w-6xl mx-auto px-6">
      {/* Main headline */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text-dark mb-6 text-shadow leading-tight">
        Websites and WebApps from R500
      </h2>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-brand-text-muted mb-16 max-w-3xl mx-auto leading-relaxed">
        I build and host your idea for free and you'll only pay if you're happy with the result. I aim to respond within 24hrs with slight delays over weekends.
      </p>

      {/* Hero input - STAR OF THE SHOW */}
      <form onSubmit={handleSubmit} className="mb-16">
        <div className="relative max-w-5xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-20 md:h-24 lg:h-28 text-lg md:text-xl px-8 md:px-10 lg:px-12 pr-24 md:pr-28 lg:pr-32 bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-3xl shadow-[0_8px_32px_rgba(45,90,61,0.15)] placeholder:text-brand-text-muted text-brand-text-dark focus:ring-4 focus:ring-brand-green/30 focus:shadow-[0_12px_48px_rgba(45,90,61,0.25)] focus:border-brand-green/40 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(45,90,61,0.2)] hover:border-brand-green/30"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 h-14 md:h-16 lg:h-18 w-14 md:w-16 lg:w-18 bg-brand-green hover:bg-brand-green-light text-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Send className="h-8 md:h-10 lg:h-12 w-8 md:w-10 lg:w-12 text-white" />
          </Button>
        </div>
      </form>

      {/* Combined How it works & Ideal brief Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-2xl p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300">
            <span className="text-lg font-medium mr-3">FAQs</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-2xl p-6 mt-4">
              <div className="space-y-6">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-2">How w5z works:</h4>
                  <p className="text-brand-text-muted text-lg leading-relaxed">
                    Describe what you need in as much detail as you like. I'll email you a quote, 
                    build and host your site for free, and you can request up to 3 rounds of tweaks on your initial idea. 
                    <span className="text-brand-green font-semibold"> Only pay if you love it.</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-2">What makes an ideal brief:</h4>
                  <p className="text-brand-text-muted text-lg leading-relaxed">
                    The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Price cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {priceCards.map((card, index) => (
          <Card key={index} className="glass-effect border-brand-green/20 p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-brand-green mb-4">{card.price}</p>
            <p className="text-brand-text-muted text-base">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}