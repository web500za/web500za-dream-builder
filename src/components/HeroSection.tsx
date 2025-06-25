
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Send, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isIdealBriefOpen, setIsIdealBriefOpen] = useState(false);

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
      {/* Main headline */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow leading-tight">
        Websites and Web-Apps from R500
      </h2>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
        I build and host your idea for free—and you'll only pay if you're happy with the result.
      </p>

      {/* Hero input - refined size */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative max-w-4xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-16 md:h-20 text-lg md:text-xl px-6 md:px-8 pr-20 md:pr-24 bg-white/95 backdrop-blur-md border-0 rounded-2xl shadow-2xl placeholder:text-gray-500 text-gray-900 focus:ring-4 focus:ring-brand-green/30 focus:shadow-[0_0_30px_rgba(65,151,107,0.3)] transition-all duration-300"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-10 md:h-12 w-10 md:w-12 bg-brand-green hover:bg-brand-green/90 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Send className="h-5 md:h-6 w-5 md:w-6 text-white" />
          </Button>
        </div>
      </form>

      {/* Quote response time */}
      <p className="text-white/80 text-base mb-12">
        I aim to respond within 24hrs with slight delays over weekends
      </p>

      {/* Ideal Brief Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <Collapsible open={isIdealBriefOpen} onOpenChange={setIsIdealBriefOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-2xl p-4 text-white hover:bg-white/10 transition-all duration-300">
            <span className="text-lg font-medium mr-3">What makes an ideal brief?</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isIdealBriefOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-2xl p-6 mt-4">
              <p className="text-white/90 text-lg leading-relaxed">
                The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

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

      {/* Price cards */}
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
