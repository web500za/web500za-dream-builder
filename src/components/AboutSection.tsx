import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Heart, Sparkles } from "lucide-react";

interface AboutSectionProps {
  onNavigateToQuote: () => void;
}

export function AboutSection({ onNavigateToQuote }: AboutSectionProps) {
  const values = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with security best practices and reliable hosting"
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Optimized for speed and works perfectly on all devices"
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "Your satisfaction is my priority - only pay if you love it"
    }
  ];


  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-6">
      {/* Photo Section */}
      <div className="mb-12">
        <div className="w-full max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
          <img 
            src="/lovable-uploads/about-childhood-pc.jpg" 
            alt="Me and my PC, circa 2002" 
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </div>

      {/* Opening Statement */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark mb-6 leading-tight">
          I've been building things with computers since I was 8 years old.
        </h2>
      </div>

      {/* About Text Content */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="space-y-10 text-lg md:text-xl leading-relaxed text-gray-700">
          <p className="leading-loose">
            Twenty-ish years later, that kid is now securing Fortune 500 companies against cyberthreats. But here's what I learned: big companies get bulletproof systems because they can afford them.
          </p>
          
          <div className="space-y-6">
            <p className="leading-loose">
              Small businesses? They get whatever's cheap and convenient.
            </p>
            <div className="font-semibold text-[#2d5a3d] text-xl md:text-2xl leading-relaxed">
              I want to change that and bring Fortune 500 pedigree to the barber down the road.
            </div>
          </div>
          
          <p className="leading-loose">
            Small businesses are the heartbeat of real communities. They keep money circulating within our community instead of going out. They know your name.
          </p>
          
          <p className="leading-loose">
            Your website should work like your business does: reliably, beautifully, without compromise.
          </p>
          
          <div className="pt-6">
            <p className="text-xl md:text-2xl font-medium text-brand-text-dark leading-relaxed">
              If you believe in building stronger communities, let's build something together.
            </p>
          </div>
        </div>
      </div>

      {/* Work With Me CTA */}
      <div className="max-w-3xl mx-auto mb-16">
        <Button 
          onClick={onNavigateToQuote}
          className="w-full h-16 bg-[#2d5a3d] hover:bg-[#1e3d28] text-white text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:ring-offset-2 border-0"
          style={{ backgroundColor: '#2d5a3d' }}
        >
          Work With Me
        </Button>
      </div>
    </div>
  );
}
