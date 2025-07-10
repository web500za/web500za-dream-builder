import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Shield, Zap, Heart, Sparkles } from "lucide-react";

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
    { href: "https://wa.me/27832540891", label: "WhatsApp", icon: (props: any) => (
      <svg {...props} viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" rx="60" fill="#25D366"/><path d="M128 64a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64Zm36.44 91.19c-1.53 4.29-7.6 8.19-10.47 8.74c-2.68.51-5.97.73-9.65-.61c-2.22-.77-5.08-1.65-8.8-3.23c-15.5-6.41-25.51-21.94-26.31-22.99c-.77-1.05-6.29-8.38-6.29-16c0-7.62 3.98-11.36 5.39-12.87c1.41-1.51 3.08-1.89 4.1-1.89c1.02 0 2.05.01 2.94.05c.95.04 2.22-.36 3.48 2.65c1.26 3.01 4.29 10.41 4.67 11.18c.38.77.64 1.68.13 2.73c-.51 1.05-.77 1.68-1.51 2.7c-.77 1.05-1.62 2.34-.23 4.6c1.39 2.26 6.18 10.18 13.27 16.5c7.09 6.32 13.09 8.3 15.35 9.25c2.26.95 3.59.8 4.89-.48c1.3-1.28 5.6-6.5 7.11-8.74c1.51-2.24 2.99-1.87 4.1-1.51c1.11.36 7.13 3.36 8.36 3.97c1.23.61 2.05.91 2.34 1.42c.29.51.29 2.94-.24 5.23Z" fill="#fff"/></svg>
    ), comingSoon: false },
    { href: "https://www.facebook.com/share/1ELx7aXeWD/?mibextid=wwXIfr", label: "Facebook", icon: (props: any) => (
      <svg {...props} viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" rx="60" fill="#1877F3"/><path d="M180 128h-36v72h-36v-72H76v-32h32V76a36 36 0 0 1 36-36h36v32h-36a4 4 0 0 0-4 4v20h40Z" fill="#fff"/></svg>
    ), comingSoon: false },
    { href: "https://www.instagram.com/web500za/profilecard/?igsh=MTBtdmUyMW9wcjhkbA==", label: "Instagram", icon: (props: any) => (
      <svg {...props} viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" rx="60" fill="url(#ig-gradient)"/><defs><linearGradient id="ig-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f58529"/><stop offset="50%" stop-color="#dd2a7b"/><stop offset="100%" stop-color="#515bd4"/></linearGradient></defs><circle cx="128" cy="128" r="48" fill="#fff"/><circle cx="128" cy="128" r="36" fill="url(#ig-gradient)"/><circle cx="180" cy="76" r="12" fill="#fff"/></svg>
    ), comingSoon: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-10">
        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.comingSoon ? "#" : social.href}
              className={`w-10 h-10 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={social.label}
              onClick={social.comingSoon ? (e) => e.preventDefault() : undefined}
              title={social.comingSoon ? 'Coming soon - Monday 30 June' : social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-brand-text-muted text-sm italic">
          <span className="font-semibold">Follow me on social media</span>
        </p>
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
          Fast forward 20 years from when this photo was taken, and I'm now working for an industry-leading Cybersecurity company, pursuing a way to make my technical background meaningful.
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
      <div className="flex justify-center mb-10">
        <Button 
          onClick={onNavigateToQuote}
          className="bg-brand-green hover:bg-brand-green-light text-white px-12 py-5 text-2xl font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
        >
          Work With Me
        </Button>
      </div>
    </div>
  );
}
