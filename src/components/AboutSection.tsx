import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Shield, Zap, Heart, Sparkles } from "lucide-react";

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

  const socialLinks = [
    { href: "https://facebook.com/web500za", label: "Facebook", icon: Facebook },
    { href: "https://instagram.com/web500za", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com/in/web500za", label: "LinkedIn", icon: Linkedin },
    { href: "https://x.com/web500za", label: "X (Twitter)", icon: Twitter }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-10">
        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-10 h-10 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Photo Section */}
      <div className="text-center mb-8">
        <div className="w-full md:w-4/5 mx-auto mb-6 rounded-lg overflow-hidden border-2 border-brand-green">
          <img 
            src="/lovable-uploads/about-childhood-pc.jpg" 
            alt="Me and my PC, circa 2002" 
            className="w-full h-auto object-cover object-center"
            style={{ maxHeight: '500px' }}
          />
        </div>
        <p className="text-brand-text-muted text-sm italic">
          <span className="font-semibold">Me and my PC, circa 2002</span>
        </p>
      </div>

      {/* About Text Content */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-brand-text-muted leading-relaxed mb-4">
          I've been hooked on blending technology and creativity for as far back as I can remember.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          Fast forward 20 years from when the photo above was taken, and I'm now working for an industry-leading Cybersecurity company, pursuing a way to make my technical background meaningful.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          This career path has shown me the importance of things being well-built and air-tight. What's more meaningful than bringing that value to small businesses? A fortune 500 pedigree to the barber down the road.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          To be blunt, I believe small businesses are what will stop money from leaving our country and start keeping our money circulating locally to feed back into our communities.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          My goal is to strengthen local businesses, in hopes of rekindling the sense of community from the 70s, 80s, 90s and early 2000's—a spirit that the modern marketplace and modern neighborhood is sorely missing.
        </p>
        <p className="text-brand-text-muted leading-relaxed">
          If you believe community is the most important thing and want to pursue this together, then the button below is your next step.
        </p>
      </div>

      {/* Work With Me CTA */}
      <div className="text-center mb-10">
        <Button 
          onClick={onNavigateToQuote}
          className="bg-gradient-to-r from-brand-green via-emerald-400 to-brand-green-light hover:from-brand-green-light hover:to-brand-green text-white px-14 py-5 text-2xl font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-slow mt-8 flex items-center justify-center gap-3 relative overflow-hidden"
          style={{ position: 'relative' }}
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-white/90 animate-pulse" />
            Work With Me
          </span>
          <span className="absolute left-0 top-0 w-full h-full pointer-events-none animate-shine" style={{ background: 'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.35) 60%,rgba(255,255,255,0.05) 100%)', opacity: 0.7 }}></span>
        </Button>
      </div>
    </div>
  );
}
