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
    <div className="text-center max-w-6xl mx-auto px-4 md:px-6">
      {/* Hero input - Most prominent CTA */}
      <form onSubmit={handleSubmit} className="mb-6 md:mb-12">
        <div className="relative max-w-5xl mx-auto">
          <AnimatedInput
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            onSubmit={handleSubmit}
            className="w-full h-20 md:h-20 lg:h-24 xl:h-28 text-lg md:text-lg lg:text-xl xl:text-2xl px-6 md:px-8 lg:px-10 xl:px-12 pr-20 md:pr-24 lg:pr-28 xl:pr-32 bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(45,90,61,0.15)] placeholder:text-brand-text-muted text-brand-text-dark focus:outline-none focus:ring-0 focus:shadow-[0_20px_80px_rgba(45,90,61,0.4)] focus:border-brand-green/80 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(45,90,61,0.2)] hover:border-brand-green/30"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 h-16 md:h-14 lg:h-16 xl:h-18 w-16 md:w-14 lg:w-16 xl:w-18 bg-brand-green hover:bg-brand-green-light text-white rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Send className="h-8 md:h-8 lg:h-10 xl:h-12 w-8 md:w-8 lg:w-10 xl:w-12 text-white" />
          </Button>
        </div>
      </form>

      {/* Compelling CTA-driven description */}
      <p className="text-base md:text-lg lg:text-xl text-brand-text-muted mb-6 md:mb-16 max-w-3xl mx-auto leading-relaxed">
        Describe what you need above, and I'll craft and host your website or web app for free. Only pay if you love the result—starting from just <span className="font-bold text-brand-green">R500</span>. Let's turn your vision into something real, fast, and hassle-free.
      </p>

      {/* Combined How it works & Ideal brief Section */}
      <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300">
            <span className="text-base md:text-lg font-medium mr-2 md:mr-3">FAQs</span>
            <ChevronDown className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 mt-3 md:mt-4">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">1. How does w5z work?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Describe what you need in as much detail as you like. I'll email you a quote, build and host your site for free, and you only pay if you're happy with the result. I aim to respond within 24hrs, with slight delays over weekends.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">2. What makes an ideal brief?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">3. What happens if I want changes to my site?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I include all reasonable tweaks and adjustments during the build—my goal is that you love the final result! After you sign off and your site is live, any major changes or new features are quoted separately, so you're always in control.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">4. Can I get my site's code or move it later?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Yes! If you want to host your site yourself or move it to your own domain in the future, I can provide the code or assist with the transfer for a small, once-off fee.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Price cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {priceCards.map((card, index) => (
          <Card key={index} className="glass-effect border-brand-green/20 p-4 md:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg md:text-xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
            <p className="text-xl md:text-2xl font-bold text-brand-green mb-3 md:mb-4">{card.price}</p>
            <p className="text-brand-text-muted text-sm md:text-base">{card.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}