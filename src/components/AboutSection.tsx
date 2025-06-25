
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Code, Heart, Zap } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Code,
      title: "Quality Code",
      description: "Every project is built with clean, maintainable code that stands the test of time."
    },
    {
      icon: Heart,
      title: "Client-First",
      description: "Your success is my success. I only get paid when you're completely happy."
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality or attention to detail."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 text-shadow">
          About Me
        </h2>
        <p className="text-xl text-white/90">
          Hi, I'm Jared
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        {/* Profile Section */}
        <div className="text-center md:text-left">
          <div className="w-32 h-32 mx-auto md:mx-0 mb-6">
            <img 
              src="/lovable-uploads/35083073-dd64-4fb1-b2c6-607a1c149bdb.png" 
              alt="Jared - web500za" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Jared</h3>
          <p className="text-white/90 leading-relaxed mb-4">
            I'm a 90s baby that grew up around gaming and technology, but I've always been a creative at heart. 
            Blending the two is where I feel like I'm most in my zone.
          </p>
          <p className="text-white/90 leading-relaxed">
            I work in Cybersecurity but I love building things, and this is where the idea for web500za comes from.
          </p>
        </div>

        {/* Contact Card */}
        <Card className="glass-effect border-white/20 p-8">
          <h4 className="text-xl font-semibold text-white mb-6">Get In Touch</h4>
          <div className="space-y-4">
            <div className="flex items-center text-white/90">
              <Mail className="h-5 w-5 text-brand-green mr-3" />
              <span>web500za@gmail.com</span>
            </div>
            <div className="flex items-center text-white/90">
              <Phone className="h-5 w-5 text-brand-green mr-3" />
              <span>083 254 0891</span>
            </div>
            <div className="flex items-center text-white/90">
              <MapPin className="h-5 w-5 text-brand-green mr-3" />
              <span>South Africa</span>
            </div>
          </div>
          <Button className="w-full mt-6 bg-brand-green hover:bg-brand-green/90">
            Start Your Project
          </Button>
        </Card>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <Card key={index} className="glass-effect border-white/20 p-6 text-center hover:scale-105 transition-transform duration-300">
            <value.icon className="h-12 w-12 text-brand-green mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
            <p className="text-white/80 text-sm">{value.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
