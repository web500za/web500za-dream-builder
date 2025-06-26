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
        <div className="w-48 h-48 md:w-80 md:h-80 mx-auto mb-6 rounded-lg overflow-hidden border-2 border-brand-green">
          <img 
            src="/lovable-uploads/about-childhood-pc.jpg" 
            alt="Me and my PC, circa 2002" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <p className="text-brand-text-muted text-sm italic">
          <span className="font-semibold">Me and my PC, circa 2002</span>
        </p>
      </div>

      {/* About Text Content */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-brand-text-muted leading-relaxed mb-4">
          I've been hooked on the intersection between technology and creativity as far back as I can remember. That early curiosity about how things work—and how to make them work better—has driven everything I do.
        </p>
        <p className="text-brand-text-muted leading-relaxed mb-4">
          Today, I work in Cybersecurity, which has taught me the value of secure, well-functioning websites (and what can go wrong when things aren't built right). I started web500za to combine that technical background with a creative approach—helping local entrepreneurs get reliable, great-looking sites, minus the big agency price tags.
        </p>
        <p className="text-brand-text-muted leading-relaxed">
          If you want a website or webapp that just works—and is a little more "you"—I'd love to help bring your idea online.
        </p>
      </div>

      {/* Work With Me CTA */}
      <div className="text-center mb-10">
        <h4 className="text-xl font-semibold text-brand-text-dark mb-4">Ready to bring your idea online?</h4>
        <Button 
          onClick={onNavigateToQuote}
          className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-3 text-lg"
        >
          Work With Me
        </Button>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-5">
        {values.map((value, index) => (
          <Card key={index} className="glass-effect border-brand-green/20 p-5 text-center hover:scale-105 transition-transform duration-300">
            <value.icon className="h-10 w-10 text-brand-green mx-auto mb-3" />
            <h4 className="text-base font-semibold text-brand-text-dark mb-2">{value.title}</h4>
            <p className="text-brand-text-muted text-sm">{value.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
