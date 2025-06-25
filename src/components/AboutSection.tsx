
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
          Hi, I'm the developer behind web500za
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        {/* Profile Section */}
        <div className="text-center md:text-left">
          <div className="w-32 h-32 bg-brand-green rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">JD</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">John Developer</h3>
          <p className="text-white/90 leading-relaxed mb-6">
            I'm a full-stack developer with over 5 years of experience building 
            web applications for businesses across South Africa. I believe in 
            creating beautiful, functional websites that help businesses grow.
          </p>
          <p className="text-white/90 leading-relaxed">
            My unique "pay-if-happy" model means you get to see your complete 
            website before making any payment. It's my way of ensuring you get 
            exactly what you need.
          </p>
        </div>

        {/* Contact Card */}
        <Card className="glass-effect border-white/20 p-8">
          <h4 className="text-xl font-semibold text-white mb-6">Get In Touch</h4>
          <div className="space-y-4">
            <div className="flex items-center text-white/90">
              <Mail className="h-5 w-5 text-brand-green mr-3" />
              <span>hello@web500za.com</span>
            </div>
            <div className="flex items-center text-white/90">
              <Phone className="h-5 w-5 text-brand-green mr-3" />
              <span>+27 82 123 4567</span>
            </div>
            <div className="flex items-center text-white/90">
              <MapPin className="h-5 w-5 text-brand-green mr-3" />
              <span>Cape Town, South Africa</span>
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
