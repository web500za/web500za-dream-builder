
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
      {/* Horizontal Logo */}
      <div className="mb-16">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/d7073b2e-ab29-446c-8a1f-9dbfdb899a9e.png" 
            alt="web500za" 
            className="h-16 md:h-20 object-contain"
          />
        </div>
      </div>

      {/* Main headline with generous spacing */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-shadow leading-tight">
        Websites and Web-Apps from R500…
      </h1>

      {/* Subheading */}
      <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
        I build and host your idea for free—and you'll only pay if you're happy with the result.
      </p>

      {/* Hero input - made much larger and more prominent */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="relative max-w-4xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-24 md:h-28 text-2xl md:text-3xl px-8 md:px-12 pr-24 md:pr-32 bg-white/95 backdrop-blur-md border-0 rounded-3xl shadow-2xl placeholder:text-gray-500 text-gray-900 focus:ring-4 focus:ring-brand-green/30 focus:shadow-[0_0_30px_rgba(65,151,107,0.3)] transition-all duration-300"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-16 md:h-20 w-16 md:w-20 bg-brand-green hover:bg-brand-green/90 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Send className="h-8 md:h-10 w-8 md:w-10 text-white" />
          </Button>
        </div>
      </form>

      {/* Quote response time */}
      <p className="text-white/80 text-lg mb-16">
        I aim to respond within 24hrs with slight delays over weekends
      </p>

      {/* How w5z works - expandable */}
      <div className="mb-20 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-3xl p-6 text-white hover:bg-white/10 transition-all duration-300">
            <span className="text-xl font-medium mr-3">How w5z works</span>
            <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-3xl p-8 mt-6">
              <p className="text-white/90 text-xl leading-relaxed">
                Describe what you need in as much detail as you like. I'll email you a quote, 
                build and host your site for free, and you can request up to 3 rounds of tweaks on your initial idea. 
                <span className="text-brand-green font-semibold"> Only pay if you love it.</span>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Price cards with better spacing */}
      <div className="grid md:grid-cols-3 gap-8">
        {priceCards.map((card, index) => (
          <Card key={index} className="glass-effect border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
            <p className="text-3xl font-bold text-brand-green mb-6">{card.price}</p>
            <p className="text-white/80 text-lg">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
