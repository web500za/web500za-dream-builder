
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
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3 text-shadow">
          About Me
        </h2>
        <p className="text-lg text-white/90">
          Hi, I'm Jared
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
        {/* Profile Section */}
        <div className="text-center md:text-left">
          <div className="w-32 h-32 mx-auto md:mx-0 mb-4 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/8b733c1a-7b6c-4da3-95c5-58519bb624c6.png" 
              alt="Jared" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white/90 leading-relaxed mb-4">
            I'm a 90s kid who grew up in the early days of the internet, surrounded by games, gadgets, and curiosity about how things work. I've always enjoyed creating—whether it's tinkering with tech, designing something new, or finding smart solutions to everyday problems.
          </p>
          <p className="text-white/90 leading-relaxed mb-4">
            By day, I work in Cybersecurity, so I know how important it is to build websites that are safe, reliable, and well thought out. But my real passion is helping local businesses and entrepreneurs bring their ideas online—combining the technical know-how with a creative touch.
          </p>
          <p className="text-white/90 leading-relaxed">
            That's what inspired web500za: making it easy and affordable for anyone to get a professional site, no matter where they are on their journey.
          </p>
        </div>

        {/* Contact Card */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-5">Get In Touch</h4>
          <div className="space-y-3">
            <div className="flex items-center text-white/90">
              <Mail className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">web500za@gmail.com</span>
            </div>
            <div className="flex items-center text-white/90">
              <Phone className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">083 254 0891</span>
            </div>
            <div className="flex items-center text-white/90">
              <MapPin className="h-4 w-4 text-brand-green mr-3" />
              <span className="text-sm">South Africa</span>
            </div>
          </div>
          <Button className="w-full mt-5 bg-brand-green hover:bg-brand-green/90 text-white">
            Start Your Project
          </Button>
        </Card>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-5">
        {values.map((value, index) => (
          <Card key={index} className="glass-effect border-white/20 p-5 text-center hover:scale-105 transition-transform duration-300">
            <value.icon className="h-10 w-10 text-brand-green mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white mb-2">{value.title}</h4>
            <p className="text-white/80 text-sm">{value.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
