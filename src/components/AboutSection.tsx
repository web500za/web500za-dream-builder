import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Shield, Zap, Heart } from "lucide-react";

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
          Fast forward 20 years from when the photo above was taken, and I'm now working in Cybersecurity, putting my technical background to use in a meaningful way.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          This career path has shown me the importance of things being well-built and airtight. What's more meaningful than bringing that value to small businesses?
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          To be blunt, I believe small businesses are what will stop money from leaving our country and start keeping our money circulating locally to feed back into our communities.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          My goal is to strengthen local businesses, in hopes of rekindling the sense of community from the 70s, 80s, and 90s and early 2000's—a spirit that the modern marketplace and neighborhood is sorely missing.
        </p>
        <p className="text-brand-text-muted leading-relaxed">
          If you believe community is the most important thing and want to pursue this together, then the button below is your next step.
        </p>
      </div>

      {/* Work With Me CTA */}
      <div className="text-center mb-10">
        <Button 
          onClick={onNavigateToQuote}
          className="bg-brand-green hover:bg-brand-green-light text-white px-12 py-5 text-2xl font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-bounce-slow mt-8"
        >
          Work With Me
        </Button>
      </div>
    </div>
  );
}
