import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Shield, Zap, Heart } from "lucide-react";

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
    { href: "https://twitter.com/web500za", label: "Twitter", icon: Mail },
    { href: "https://github.com/web500za", label: "GitHub", icon: Phone },
    { href: "mailto:web500za@gmail.com", label: "Email", icon: MapPin }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-text-dark mb-3 text-shadow">
          About Me
        </h2>
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

      <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
        {/* Profile Section */}
        <div className="text-center md:text-left">
          <div className="w-40 h-40 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/8b733c1a-7b6c-4da3-95c5-58519bb624c6.png" 
              alt="Jared" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="text-brand-text-muted leading-relaxed mb-4">
            Since I jailbroke my first iPhone in 2009, I've been hooked on the intersection between technology and creativity. That early curiosity about how things work—and how to make them work better—has driven everything I do.
          </p>
          <p className="text-brand-text-muted leading-relaxed mb-4">
            Today, I work in Cybersecurity, which has taught me the value of secure, well-functioning websites (and what can go wrong when things aren't built right). I started web500za to combine that technical background with a creative approach—helping local entrepreneurs get reliable, great-looking sites, minus the big agency price tags.
          </p>
          <p className="text-brand-text-muted leading-relaxed">
            If you want a website or webapp that just works—and is a little more "you"—I'd love to help bring your idea online.
          </p>
        </div>

        {/* Contact Card */}
        <Card className="glass-effect border-brand-green/20 p-6">
          <h4 className="text-lg font-semibold text-brand-text-dark mb-5">Get In Touch</h4>
          <div className="space-y-3">
            <div className="flex items-center text-brand-text-muted">
              <Mail className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">web500za@gmail.com</span>
            </div>
            <div className="flex items-center text-brand-text-muted">
              <Phone className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">083 254 0891</span>
            </div>
            <div className="flex items-center text-brand-text-muted">
              <MapPin className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">South Africa</span>
            </div>
          </div>
          <Button 
            onClick={onNavigateToQuote}
            className="w-full mt-5 bg-brand-green hover:bg-brand-green-light text-white"
          >
            Start Your Project
          </Button>
        </Card>
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
