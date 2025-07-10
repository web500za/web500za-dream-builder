import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_ro91mud',
        'template_24c6cew',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'web500za@gmail.com'
        },
        'oD5OBOHE23lePaczJ'
      );
      
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Main Headline */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-brand-text-dark mb-8">
          Let's Talk
        </h2>
      </div>

      {/* Direct Contact Methods */}
      <div className="text-center mb-16 space-y-8">
        <div className="space-y-6">
          <a
            href="https://wa.me/27832540891"
            className="group block p-6 rounded-2xl border border-gray-200 hover:border-[#4a5d4a] transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-center space-x-4">
              <MessageCircle className="w-6 h-6 text-[#4a5d4a] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-sm text-gray-600 font-medium">WhatsApp</p>
                <p className="text-xl font-semibold text-brand-text-dark group-hover:text-[#4a5d4a] transition-colors">
                  +27 83 254 0891
                </p>
              </div>
            </div>
          </a>

          <a
            href="mailto:web500za@gmail.com"
            className="group block p-6 rounded-2xl border border-gray-200 hover:border-[#4a5d4a] transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-center space-x-4">
              <Mail className="w-6 h-6 text-[#4a5d4a] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-xl font-semibold text-brand-text-dark group-hover:text-[#4a5d4a] transition-colors">
                  web500za@gmail.com
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Form Section */}
      <div className="mb-8">
        <p className="text-center text-gray-600 text-lg mb-12">
          Prefer a form? No problem:
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-brand-text-dark font-medium text-lg mb-3 block">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="h-14 text-lg border-gray-300 focus:border-[#4a5d4a] focus:ring-[#4a5d4a] rounded-xl"
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-brand-text-dark font-medium text-lg mb-3 block">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="h-14 text-lg border-gray-300 focus:border-[#4a5d4a] focus:ring-[#4a5d4a] rounded-xl"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-brand-text-dark font-medium text-lg mb-3 block">
                Project Details
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="text-lg border-gray-300 focus:border-[#4a5d4a] focus:ring-[#4a5d4a] rounded-xl resize-none placeholder:text-gray-400"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 bg-[#2d5a3d] hover:bg-[#1e3d28] text-white text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0"
              style={{ backgroundColor: '#2d5a3d' }}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}