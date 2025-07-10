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
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488"/>
      </svg>
    ), comingSoon: false },
    { href: "https://www.facebook.com/share/1ELx7aXeWD/?mibextid=wwXIfr", label: "Facebook", icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ), comingSoon: false },
    { href: "https://www.instagram.com/web500za/profilecard/?igsh=MTBtdmUyMW9wcjhkbA==", label: "Instagram", icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ), comingSoon: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Social Media Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.comingSoon ? "#" : social.href}
              className={`w-12 h-12 bg-[#4a5d4a]/8 hover:bg-[#4a5d4a]/15 text-[#4a5d4a] rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={social.label}
              onClick={social.comingSoon ? (e) => e.preventDefault() : undefined}
              title={social.comingSoon ? 'Coming soon - Monday 30 June' : social.label}
            >
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Photo Section */}
      <div className="mb-24">
        <div className="w-full max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <img 
            src="/lovable-uploads/about-childhood-pc.jpg" 
            alt="Me and my PC, circa 2002" 
            className="w-full h-auto object-cover object-center"
          />
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-lg italic font-light tracking-wide">
            Me and my PC, circa 2002
          </p>
        </div>
      </div>

      {/* Opening Statement */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text-dark mb-8 leading-tight">
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
