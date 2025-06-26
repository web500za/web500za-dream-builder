import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Send, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, validateEmail } from "@/lib/emailService";

export function HeroSection() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [step, setStep] = useState<"idea" | "details" | "success">("idea");
  const [form, setForm] = useState({
    firstName: "",
    email: ""
  });
  const [honeypot, setHoneypot] = useState(""); // Hidden field to catch bots
  const [formError, setFormError] = useState("");
  const { toast } = useToast();
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Launch offer state (for future dynamic spots left)
  const launchSpotsLeft = 5; // Placeholder, can be made dynamic later

  // Scroll modal content into view if keyboard opens (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && modalContentRef.current) {
        modalContentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [step]);

  // Generate previews when images change
  useEffect(() => {
    if (images.length === 0) {
      setImagePreviews([]);
      return;
    }
    const urls = images.map(img => URL.createObjectURL(img));
    setImagePreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleIdeaSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectDescription.trim()) return;
    setStep("details");
  };

  const isEmailValid = validateEmail(form.email);
  const isFormValid = form.firstName.trim().length >= 2 && isEmailValid && projectDescription.trim().length >= 10 && !honeypot;

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot - if filled, it's likely a bot
    if (honeypot) {
      setFormError("Invalid submission detected.");
      return;
    }
    
    if (!isFormValid) {
      if (!form.firstName.trim() || form.firstName.trim().length < 2) {
        setFormError("Please enter a valid first name (at least 2 characters).");
      } else if (!isEmailValid) {
        setFormError("Please enter a valid email address.");
      } else if (!projectDescription.trim() || projectDescription.trim().length < 10) {
        setFormError("Please provide a more detailed project description (at least 10 characters).");
      }
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await sendEmail({
        firstName: form.firstName,
        email: form.email,
        projectDescription: projectDescription,
        imageUrls: imagePreviews,
      });
      
      toast({
        title: "Request submitted!",
        description: "I aim to respond within 24-48hrs with the first iteration, but expect delays on the weekend.",
        duration: 5000,
      });
      
      setStep("success");
      setForm({ firstName: "", email: "" });
      setProjectDescription("");
      setImagePreviews([]);
      setHoneypot(""); // Reset honeypot
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3
    setImages(files);
  };

  const priceCards = [
    {
      title: "Simple one-pager",
      price: "From R500",
      description: "Perfect for landing pages, portfolios, or basic business sites"
    },
    {
      title: "With bookings or logins",
      price: "From R1000",
      description: "Interactive features, user accounts, booking systems"
    },
    {
      title: "Something bigger?",
      price: "Custom quote",
      description: "Complex web apps, e-commerce, custom functionality"
    }
  ];

  return (
    <div className="text-center max-w-6xl mx-auto px-4 md:px-6">
      {step === "idea" && (
        <form onSubmit={handleIdeaSubmit} className="mb-6 md:mb-12">
          <div className="relative max-w-5xl mx-auto">
            <AnimatedInput
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              onSubmit={handleIdeaSubmit}
              className="w-full h-20 md:h-20 lg:h-24 xl:h-28 text-lg md:text-lg lg:text-xl xl:text-2xl px-6 md:px-8 lg:px-10 xl:px-12 pr-20 md:pr-24 lg:pr-28 xl:pr-32 bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(45,90,61,0.15)] placeholder:text-brand-text-muted text-brand-text-dark focus:outline-none focus:ring-0 focus:shadow-[0_20px_80px_rgba(45,90,61,0.4)] focus:border-brand-green/80 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(45,90,61,0.2)] hover:border-brand-green/30"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 h-16 md:h-14 lg:h-16 xl:h-18 w-16 md:w-14 lg:w-16 xl:w-18 bg-brand-green hover:bg-brand-green-light text-white rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Send className="h-8 md:h-8 lg:h-10 xl:h-12 w-8 md:w-8 lg:w-10 xl:w-12 text-white" />
            </Button>
          </div>
        </form>
      )}
      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="mb-6 md:mb-12 max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in">
          <label className="block text-sm font-medium text-brand-text-dark mb-1 text-left">Your idea/brief</label>
          <textarea
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg border border-brand-green/20 px-3 py-2 text-base text-brand-text-dark bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
            placeholder="Describe what you want built..."
          />
          <Input
            placeholder="First name*"
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            required
            autoFocus
          />
          <Input
            placeholder="Email address*"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          {/* Honeypot field - hidden from users but visible to bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div>
            <label className="block text-sm font-medium text-brand-text-dark mb-1">Attach images (optional, up to 3)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-brand-text-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green/10 file:text-brand-green hover:file:bg-brand-green/20"
              style={{ padding: 0 }}
              max={3}
            />
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-brand-green/20"
                  />
                ))}
              </div>
            )}
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <Button type="submit" disabled={!isFormValid} className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3 text-lg font-semibold rounded-xl shadow-md mt-2 sticky bottom-0 disabled:opacity-60 disabled:cursor-not-allowed">Let's get building!</Button>
        </form>
      )}

      {/* Compelling CTA-driven description */}
      <p className="text-base md:text-lg lg:text-xl text-brand-text-muted mb-6 md:mb-16 max-w-3xl mx-auto leading-relaxed">
        Describe what you need above. I'll receive your idea via e-mail and start crafting and hosting your website or web app for free. Only pay if you love the result, starting from just <span className="font-bold text-brand-green">R500</span>.
      </p>

      {/* Combined How it works & Ideal brief Section */}
      <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300">
            <span className="text-base md:text-lg font-medium mr-2 md:mr-3">FAQs</span>
            <ChevronDown className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 mt-3 md:mt-4">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">1. How quickly will you respond?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I aim to respond within 24-48hrs with the first iteration, but expect delays on the weekend. I'll email you a quote and start building your site for free—you only pay if you're happy with the result.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">2. How does w5z work?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Describe what you need in as much detail as you like. I'll email you a quote, build and host your site for free, and you only pay if you're happy with the result.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">3. What makes an ideal brief?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">4. What happens if I want changes to my site?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I include all reasonable tweaks and adjustments during the build—my goal is that you love the final result! After you sign off and your site is live, any major changes or new features are quoted separately, so you're always in control.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">5. Can I get my site's code or move it later?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Yes! If you want to host your site yourself or move it to your own domain in the future, I can provide the code or assist with the transfer for a small, once-off fee.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Pricing Dropdown */}
      <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
        <Collapsible open={isPricingOpen} onOpenChange={setIsPricingOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300 mb-2">
            <span className="text-base md:text-lg font-medium mr-2 md:mr-3">Pricing</span>
            <ChevronDown className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-4">
              {priceCards.map((card, index) => (
                <Card key={index} className="glass-effect border-brand-green/20 p-4 md:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-lg md:text-xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
                  <p className="text-xl md:text-2xl font-bold text-brand-green mb-3 md:mb-4">{card.price}</p>
                  <p className="text-brand-text-muted text-sm md:text-base">{card.description}</p>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Mobile CTA Button */}
      <div className="mt-8 md:hidden">
        <Button 
          onClick={() => {
            // Scroll to top and focus the input
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Focus the input after a short delay to allow scroll to complete
            setTimeout(() => {
              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (input) input.focus();
            }, 500);
          }}
          className="w-full bg-brand-green hover:bg-brand-green-light text-white py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          Let's get building
        </Button>
      </div>
    </div>
  );
}