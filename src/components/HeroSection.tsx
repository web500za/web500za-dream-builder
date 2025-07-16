import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedInput } from "@/components/AnimatedInput";
import { ChevronDown, ArrowUp, Plus, Check, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, validateEmail } from "@/lib/emailService";
import { detectBrowser } from "@/lib/browserDetection";
import './HeroSection.css';

// Add Cloudinary upload helper
const CLOUDINARY_UPLOAD_PRESET = "web500za customers";
const CLOUDINARY_CLOUD_NAME = "drma7031k";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

async function uploadToCloudinaryWithProgress(file: File, slotIdx: number, onProgress: (percent: number) => void, onTimeout: () => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    xhr.open("POST", CLOUDINARY_URL);
    xhr.timeout = 30000; // 30 seconds
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };
    xhr.ontimeout = () => {
      onTimeout();
      reject(new Error("Upload timed out"));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Upload failed, try again"));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed, try again"));
    xhr.send(formData);
  });
}

interface HeroSectionProps {
  isPricingOpen?: boolean;
  setIsPricingOpen?: (open: boolean) => void;
  showPricingBadge?: boolean;
  setShowPricingBadge?: (show: boolean) => void;
  triggerTextareaGlow?: boolean;
}

export function HeroSection({ 
  isPricingOpen: externalIsPricingOpen, 
  setIsPricingOpen: externalSetIsPricingOpen,
  showPricingBadge: externalShowPricingBadge = true,
  setShowPricingBadge: externalSetShowPricingBadge,
  triggerTextareaGlow = false
}: HeroSectionProps = {}) {
  const [projectDescription, setProjectDescription] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [quickEmail, setQuickEmail] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [internalIsPricingOpen, setInternalIsPricingOpen] = useState(false);
  const [internalShowPricingBadge, setInternalShowPricingBadge] = useState(true);
  
  const isPricingOpen = externalIsPricingOpen ?? internalIsPricingOpen;
  const setIsPricingOpen = externalSetIsPricingOpen ?? setInternalIsPricingOpen;
  const showPricingBadge = externalShowPricingBadge && internalShowPricingBadge;
  const setShowPricingBadge = externalSetShowPricingBadge ?? setInternalShowPricingBadge;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<("idle" | "uploading" | "failed" | "done")[]>(["idle", "idle", "idle"]);
  const [uploadError, setUploadError] = useState<string[]>(["", "", ""]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([0, 0, 0]);
  const [rejectedFileError, setRejectedFileError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [textareaGlow, setTextareaGlow] = useState(false);
  const [browserInfo, setBrowserInfo] = useState({ isInstagram: false, isSocialMedia: false });
  const { toast } = useToast();

  const MAX_TOTAL_SIZE = 50 * 1024 * 1024;

  // Initialize browser info (simplified)
  useEffect(() => {
    const browser = detectBrowser();
    setBrowserInfo({
      isInstagram: browser.isInstagram,
      isSocialMedia: browser.isSocialMedia
    });
  }, []);

  // Cross-platform smooth scroll utility function with offset
  const smoothScrollTo = (element: Element | null) => {
    if (!element) return;
    const elementPosition = (element as HTMLElement).offsetTop - 24;
    
    
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    } else {
      // Fallback for iOS Safari and older browsers
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = Math.min(Math.abs(distance) * 0.5, 800);
      let startTime: number | null = null;
      
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };
      
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  };

  // Cross-platform scroll to top function
  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback for iOS Safari and older browsers
      const startPosition = window.pageYOffset;
      const duration = Math.min(startPosition * 0.5, 800);
      let startTime: number | null = null;
      
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };
      
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress)));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  };

  // Handle Get Started button clicks
  const handleGetStarted = () => {
    scrollToTop();
    
    // Focus and glow after a short delay
    setTimeout(() => {
      const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        setTextareaGlow(true);
        setTimeout(() => setTextareaGlow(false), 2000);
      }
    }, 300); // Small delay to account for scroll
  };

  // Handle external trigger for textarea glow
  useEffect(() => {
    if (triggerTextareaGlow) {
      handleGetStarted();
    }
  }, [triggerTextareaGlow]);

  // Generate previews when images change
  useEffect(() => {
    if (attachments.length === 0) {
      setImagePreviews([]);
      return;
    }
    const urls = attachments.filter(Boolean).map(img => URL.createObjectURL(img));
    setImagePreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [attachments]);

  const handleIdeaSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectDescription.trim()) return;
    
    // If we don't have email yet, show inline form
    if (!quickEmail) {
      setShowEmailForm(true);
      return;
    }
    
    // Submit directly
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("from_name", quickEmail.split('@')[0] || 'Customer');
      formData.set("from_email", quickEmail);
      formData.set("project_description", projectDescription);
      formData.set("phone", quickPhone || '');
      formData.set("image_url_1", imageUrls[0] || '');
      formData.set("image_url_2", imageUrls[1] || '');
      formData.set("image_url_3", imageUrls[2] || '');
      
      await sendEmail(formData);
      setEmailSent(true);
      setProjectDescription("");
      setQuickEmail("");
      setQuickPhone("");
      setShowEmailForm(false);
      setShowAttachments(false);
      setAttachments([]);
      setImageUrls([]);
      setImagePreviews([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlotFileChange = async (e: React.ChangeEvent<HTMLInputElement>, slotIdx: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.size > MAX_TOTAL_SIZE) {
      setRejectedFileError("Image too large (max 50MB total)");
      return;
    }
    setRejectedFileError("");
    const newAttachments = [...attachments];
    const currentTotal = newAttachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0);
    const prevFile = newAttachments[slotIdx];
    const newTotal = currentTotal - (prevFile ? prevFile.size : 0) + file.size;
    if (newTotal > MAX_TOTAL_SIZE) {
      setRejectedFileError("Image too large (max 50MB total)");
      return;
    }
    
    // Set upload status to uploading
    const newUploadStatus = [...uploadStatus];
    newUploadStatus[slotIdx] = "uploading";
    setUploadStatus(newUploadStatus);
    const newUploadError = [...uploadError];
    newUploadError[slotIdx] = "";
    setUploadError(newUploadError);
    const newProgress = [...uploadProgress];
    newProgress[slotIdx] = 0;
    setUploadProgress(newProgress);
    newAttachments[slotIdx] = file;
    setAttachments(newAttachments);
    
    try {
      const url = await uploadToCloudinaryWithProgress(
        file,
        slotIdx,
        (percent) => {
          const progressArr = [...uploadProgress];
          progressArr[slotIdx] = percent;
          setUploadProgress(progressArr);
        },
        () => {
          // Timeout handler
          const failStatus = [...uploadStatus];
          failStatus[slotIdx] = "failed";
          setUploadStatus(failStatus);
          const failError = [...uploadError];
          failError[slotIdx] = "Upload timed out, try again";
          setUploadError(failError);
        }
      );
      const newImageUrls = [...imageUrls];
      newImageUrls[slotIdx] = url;
      setImageUrls(newImageUrls);
      newUploadStatus[slotIdx] = "done";
      setUploadStatus([...newUploadStatus]);
      newUploadError[slotIdx] = "";
      setUploadError([...newUploadError]);
      newProgress[slotIdx] = 100;
      setUploadProgress([...newProgress]);
    } catch (err) {
      // Remove the file from the slot and show error
      const newAttachmentsFail = [...attachments];
      newAttachmentsFail[slotIdx] = undefined;
      setAttachments(newAttachmentsFail);
      const newImageUrls = [...imageUrls];
      newImageUrls[slotIdx] = "";
      setImageUrls(newImageUrls);
      newUploadStatus[slotIdx] = "failed";
      setUploadStatus([...newUploadStatus]);
      newUploadError[slotIdx] = err instanceof Error ? err.message : "Upload failed, try again";
      setUploadError([...newUploadError]);
      newProgress[slotIdx] = 0;
      setUploadProgress([...newProgress]);
    }
  };

  const handleRemoveAttachment = (idx: number) => {
    const newAttachments = [...attachments];
    newAttachments[idx] = undefined;
    setAttachments(newAttachments);
    const newImageUrls = [...imageUrls];
    newImageUrls[idx] = "";
    setImageUrls(newImageUrls);
    // Clear upload status and error for this slot
    const newUploadStatus = [...uploadStatus];
    newUploadStatus[idx] = "idle";
    setUploadStatus(newUploadStatus);
    const newUploadError = [...uploadError];
    newUploadError[idx] = "";
    setUploadError(newUploadError);
    const newUploadProgress = [...uploadProgress];
    newUploadProgress[idx] = 0;
    setUploadProgress(newUploadProgress);
    setRejectedFileError("");
  };

  // Future package pricing (effective August 1st, 2025)
  /*
  const futurePackagePricing = [
    {
      title: "Digital Foundation Package",
      price: "R2,500",
      description: "Everything you need to establish your online presence",
      features: [
        "Professional domain setup with business email",
        "Single-page signature website",
        "Logo creation or refinement",
        "Mobile-optimized design",
        "30-day support included"
      ],
      featured: false
    },
    {
      title: "Business Presence Package",
      price: "R4,500",
      description: "Complete digital transformation for growing businesses",
      features: [
        "Everything in Digital Foundation",
        "Multi-page website with strategic flow",
        "AI chatbot integration",
        "Advanced business integrations",
        "Basic SEO Optimization",
        "Analytics setup",
        "60-day support included"
      ],
      featured: true,
      badge: "Most Popular"
    },
    {
      title: "Custom Solutions",
      price: "Let's talk",
      description: "For complex web applications & unique functionality",
      features: [
        "E-commerce platforms",
        "Custom web applications",
        "Enterprise integrations",
        "Unique functionality",
        "Dedicated project management",
        "Extended support options"
      ],
      featured: false,
      isCustom: true
    }
  ];
  */

  type PriceCard = {
    title: string;
    price: string;
    description: string;
    features: string[];
    featured: boolean;
    isOther?: boolean;
    badge?: string;
  };

  // Launch Special Pricing (until August 1st, 2025)
  const priceCards: PriceCard[] = [
    {
      title: "Single-Page Site",
      price: "R1000",
      description: "Perfect for establishing your online presence",
      features: [
        "Professional single-page website",
        "Mobile-responsive design",
        "Basic branding & logo",
        "Contact form integration",
        "30-day support",
        "Estimated completion: 1-4 days"
      ],
      featured: true
    },
    {
      title: "Multi-Page Site",
      price: "R2500",
      description: "Complete website for growing businesses",
      features: [
        "Multi-page website with navigation",
        "Enhanced branding & design",
        "Contact forms & integrations",
        "60-day support",
        "Estimated completion: 1-2 weeks"
      ],
      featured: true
    },
    {
      title: "Other Services",
      price: "Let's chat",
      description: "Ask me about",
      features: [
        "Social media setup & branding",
        "Website AI chatbots",
        "E-commerce functionality",
        "Custom integrations",
        "Website maintenance plans"
      ],
      featured: false,
      isOther: true
    }
  ];

  return (
    <div className="text-center max-w-6xl mx-auto mobile-safe-padding md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12">
      {/* Success state inline */}
      {emailSent ? (
        <div className="mb-16 md:mb-20 text-center animate-fade-in">
          <div className="mb-8">
            <svg className="animate-bounce-in mx-auto" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#22c55e"/>
              <path d="M24 42l12 12 20-24" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-green mb-6">Thank you!</h3>
          <p className="text-lg md:text-xl text-brand-text-dark leading-relaxed max-w-2xl mx-auto">I've received your brief and will aim to respond within <span className="font-semibold">1-2 business days</span>.</p>
        </div>
      ) : (
        <>
          {/* Mobile: Textarea first, then pricing, then description */}
          <div className="md:hidden">
            <form onSubmit={handleIdeaSubmit} className="mb-8 md:mb-12">
              <div className="relative max-w-4xl mx-auto">
                <AnimatedInput
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  onSubmit={handleIdeaSubmit}
                  className={`w-full text-lg md:text-xl px-6 md:px-8 py-6 md:py-8 pl-16 md:pl-20 pr-20 md:pr-32 bg-white/95 backdrop-blur-md border-2 rounded-2xl md:rounded-3xl placeholder:text-brand-text-muted/70 text-brand-text-dark focus:outline-none focus:ring-0 transition-all duration-500 min-h-[120px] md:min-h-[140px] ${
                    textareaGlow 
                      ? 'border-brand-green shadow-[0_0_30px_rgba(34,197,94,0.4),0_20px_80px_rgba(45,90,61,0.25)] animate-pulse' 
                      : 'border-brand-green/30 shadow-[0_12px_40px_rgba(45,90,61,0.12)] focus:shadow-[0_20px_80px_rgba(45,90,61,0.25)] focus:border-brand-green/60 hover:shadow-[0_16px_60px_rgba(45,90,61,0.15)] hover:border-brand-green/40'
                  }`}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setShowAttachments(!showAttachments)}
                  className="icon-button absolute left-3 md:left-4 bottom-3 md:bottom-4 h-11 w-11 md:h-12 md:w-12 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green rounded-2xl shadow-sm transition-all duration-300 hover:scale-105 border border-brand-green/20"
                  title="Add attachments"
                >
                  <Plus className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isSubmitting}
                  className="icon-button absolute right-3 md:right-4 bottom-3 md:bottom-4 h-11 w-11 md:h-12 md:w-12 bg-brand-green hover:bg-brand-green-light text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                  <ArrowUp className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </Button>
              </div>
            
            {/* Attachment upload section */}
            {showAttachments && (
              <div className="mt-6 max-w-4xl mx-auto bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl p-4 shadow-lg animate-fade-in">
                <div className="mb-3 text-sm font-medium text-brand-text-dark">Upload up to 3 images to strengthen your brief (50MB total)</div>
                <div className="flex gap-4 justify-center mb-4">
                  {[0, 1, 2].map((slotIdx) => {
                    const file = attachments[slotIdx];
                    return file ? (
                      <div key={slotIdx} className="relative w-20 h-20 flex items-center justify-center bg-brand-green/10 border-2 border-brand-green/30 rounded-lg shadow-sm overflow-hidden">
                        {uploadStatus[slotIdx] === "uploading" && (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                              <div className="ios-spinner-lg text-brand-green"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-green/20 z-20">
                              <div className="h-2 bg-brand-green rounded-b-2xl transition-all duration-200" style={{ width: `${uploadProgress[slotIdx]}%` }} />
                            </div>
                          </>
                        )}
                        {uploadStatus[slotIdx] === "failed" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 text-red-600 text-xs font-semibold px-2 text-center">{uploadError[slotIdx]}</div>
                        )}
                        {file.type.startsWith('image') ? (
                          <img src={imagePreviews[slotIdx]} alt={file.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl">📄</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(slotIdx)}
                          className="absolute top-1 right-1 bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 text-lg font-bold shadow"
                          aria-label="Remove file"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label key={slotIdx} className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30 rounded-2xl cursor-pointer hover:bg-brand-green/5 transition-all">
                        <span className="text-3xl text-brand-green">+</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={e => handleSlotFileChange(e, slotIdx)}
                          aria-label="Upload picture"
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-brand-text-muted">
                  <span>{attachments.filter(Boolean).length} of 3 attached</span>
                  <span>{((MAX_TOTAL_SIZE - attachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0)) / 1024 / 1024).toFixed(2)} MB left</span>
                </div>
                {rejectedFileError && <div className="text-xs text-red-600 font-medium mt-2">{rejectedFileError}</div>}
              </div>
            )}
            
            {/* Inline email form */}
            {showEmailForm && (
              <div className="mt-6 max-w-4xl mx-auto bg-white/98 backdrop-blur-md border-2 border-brand-green/40 rounded-2xl p-4 shadow-lg animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email*"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    className="flex-1"
                    autoFocus
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!validateEmail(quickEmail) || isSubmitting}
                    className="bg-brand-green hover:bg-brand-green-light text-white px-6"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="ios-spinner-sm text-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </div>
            )}
            </form>
            
            {/* Mobile: Pricing bubble second */}
            <div className="mobile-pricing-section ios-section max-w-4xl mx-auto px-6">
              <div className="flex justify-center mb-4">
                <Collapsible open={isPricingOpen} onOpenChange={setIsPricingOpen}>
                  <CollapsibleTrigger className="collapsible-trigger ios-touch flex items-center justify-center w-full glass-effect rounded-xl p-5 md:p-6 text-brand-text-dark hover:bg-brand-green/8 relative shadow-md hover:shadow-lg">
                    <span className="text-lg md:text-xl font-semibold mr-3 md:mr-4">Pricing</span>
                    {showPricingBadge && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        1
                      </div>
                    )}
                    <ChevronDown className={`h-5 w-5 md:h-5 md:w-5 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div
                      className="collapsible-inner"
                      onTransitionEnd={e => {
                        if (isPricingOpen && e.propertyName === 'max-height') {
                          // Use setTimeout to ensure iOS Safari handles the scroll properly
                          setTimeout(() => {
                            const pricingElement = document.querySelector('.mobile-pricing-section');
                            if (pricingElement) {
                              const elementPosition = (pricingElement as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 24;
                              // Force iOS Safari to use native scroll
                              window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                            }
                          }, 100);
                        }
                      }}
                    >
                      <div className="text-center mb-6">
                        <p className="text-red-500 font-semibold text-sm md:text-base mb-2">
                          Launch Special til 10 August, 2025
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6">
                        {priceCards.map((card, index) => (
                          <Card 
                            key={index} 
                            className={`relative overflow-hidden ios-hover ${
                              card.featured 
                                ? 'glass-effect border-2 border-brand-green shadow-xl hover:shadow-2xl md:scale-105' 
                                : 'glass-effect border-brand-green/20 hover:shadow-xl'
                            } p-6 md:p-8`}
                          >
                            {card.badge && (
                              <div className="absolute -top-1 -right-1 overflow-hidden" style={{width: '120px', height: '120px'}}>
                                <div className="absolute bg-brand-green text-white text-xs font-semibold py-1.5 transform rotate-45" style={{width: '150px', textAlign: 'center', top: '25px', right: '-35px'}}>
                                  {card.badge}
                                </div>
                              </div>
                            )}
                            <h3 className="text-xl md:text-2xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
                            <div className="mb-4">
                              {!card.isOther && (
                                <p className="text-sm md:text-base text-red-500 line-through mb-1">
                                  {card.title.includes('Single-Page') ? 'R2500' : 'R5000'}
                                </p>
                              )}
                              <p className="text-3xl md:text-4xl font-bold text-brand-green">{card.price}</p>
                            </div>
                            <p className="text-brand-text-muted text-sm md:text-base mb-6">{card.description}</p>
                            <ul className="space-y-3 mb-8">
                              {card.features?.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-left">
                                  <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                                  <span className="text-brand-text-dark text-left">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            {card.isOther ? (
                              <a
                                href="mailto:web500za@gmail.com"
                                className={`w-full inline-block text-center px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                  card.featured
                                    ? 'bg-brand-green hover:bg-brand-green-light text-white shadow-lg'
                                    : 'bg-brand-green/10 hover:bg-brand-green hover:text-white text-brand-green'
                                }`}
                                style={{ textDecoration: 'none' }}
                              >
                                Contact me
                              </a>
                            ) : (
                              <Button
                                onClick={() => {
                                  if (card.isOther) {
                                    window.location.href = 'mailto:web500za@gmail.com?subject=Other%20Services%20Inquiry';
                                  } else {
                                    handleGetStarted();
                                  }
                                }}
                                className={`w-full ios-button ${
                                  card.featured
                                    ? 'bg-brand-green hover:bg-brand-green-light text-white shadow-lg'
                                    : 'bg-brand-green/10 hover:bg-brand-green hover:text-white text-brand-green'
                                }`}
                              >
                                {card.isOther ? 'Contact me' : 'Get Started'}
                              </Button>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

          {/* Desktop: Description first, then textarea */}
          <div className="hidden md:block">
            {/* Description */}
            <div className="ios-element-spacing">
              <p className="text-xl md:text-2xl text-brand-text-muted/70 max-w-4xl mx-auto leading-relaxed text-center font-medium ios-body-spacing">
                Send me your idea and I'll send you 3 free mock-ups. Only pay when you want to work together.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleIdeaSubmit} className="mb-16 md:mb-20">
              <div className="relative max-w-4xl mx-auto">
                <AnimatedInput
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  onSubmit={handleIdeaSubmit}
                  className={`w-full text-xl md:text-2xl px-8 md:px-12 py-8 md:py-10 pl-20 md:pl-24 pr-32 md:pr-40 bg-white/95 backdrop-blur-md border-2 rounded-2xl md:rounded-3xl placeholder:text-brand-text-muted/70 text-brand-text-dark focus:outline-none focus:ring-0 transition-all duration-500 min-h-[160px] md:min-h-[180px] ${
                    textareaGlow 
                      ? 'border-brand-green shadow-[0_0_30px_rgba(34,197,94,0.4),0_20px_80px_rgba(45,90,61,0.25)] animate-pulse' 
                      : 'border-brand-green/30 shadow-[0_12px_40px_rgba(45,90,61,0.12)] focus:shadow-[0_20px_80px_rgba(45,90,61,0.25)] focus:border-brand-green/60 hover:shadow-[0_16px_60px_rgba(45,90,61,0.15)] hover:border-brand-green/40'
                  }`}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setShowAttachments(!showAttachments)}
                  className="absolute left-4 bottom-4 h-12 w-12 bg-brand-green/10 hover:bg-brand-green/20 text-brand-green rounded-2xl shadow-sm ios-button border border-brand-green/20"
                  title="Add attachments"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isSubmitting}
                  className="absolute right-4 bottom-4 h-12 w-12 bg-brand-green hover:bg-brand-green-light text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="ios-spinner text-white"></div>
                  ) : (
                    <ArrowUp className="h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
              
              {/* Attachment upload section for desktop */}
              {showAttachments && (
                <div className="mt-6 max-w-4xl mx-auto bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl p-4 shadow-lg animate-fade-in">
                  <div className="mb-3 text-sm font-medium text-brand-text-dark">Upload up to 3 images to strengthen your brief (50MB total)</div>
                  <div className="flex gap-4 justify-center mb-4">
                    {[0, 1, 2].map((slotIdx) => {
                      const file = attachments[slotIdx];
                      return file ? (
                        <div key={slotIdx} className="relative w-20 h-20 flex items-center justify-center bg-brand-green/10 border-2 border-brand-green/30 rounded-2xl shadow-sm overflow-hidden">
                          {uploadStatus[slotIdx] === "uploading" && (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                                <div className="ios-spinner-lg text-brand-green"></div>
                              </div>
                              <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-green/20 z-20">
                                <div className="h-2 bg-brand-green rounded-b-2xl transition-all duration-200" style={{ width: `${uploadProgress[slotIdx]}%` }} />
                              </div>
                            </>
                          )}
                          {uploadStatus[slotIdx] === "failed" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 text-red-600 text-xs font-semibold px-2 text-center">{uploadError[slotIdx]}</div>
                          )}
                          {file.type.startsWith('image') ? (
                            <img src={imagePreviews[slotIdx]} alt={file.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">📄</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(slotIdx)}
                            className="absolute top-1 right-1 bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 text-lg font-bold shadow"
                            aria-label="Remove file"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label key={slotIdx} className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30 rounded-2xl cursor-pointer hover:bg-brand-green/5 transition-all">
                          <span className="text-3xl text-brand-green">+</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            className="hidden"
                            onChange={e => handleSlotFileChange(e, slotIdx)}
                            aria-label="Upload picture"
                          />
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-xs text-brand-text-muted">
                    <span>{attachments.filter(Boolean).length} of 3 attached</span>
                    <span>{((MAX_TOTAL_SIZE - attachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0)) / 1024 / 1024).toFixed(2)} MB left</span>
                  </div>
                  {rejectedFileError && <div className="text-xs text-red-600 font-medium mt-2">{rejectedFileError}</div>}
                </div>
              )}
              
              {/* Inline email form for desktop */}
              {showEmailForm && (
                <div className="mt-6 max-w-4xl mx-auto bg-white/98 backdrop-blur-md border-2 border-brand-green/40 rounded-2xl p-4 shadow-lg animate-fade-in">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Your email*"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      className="flex-1"
                      autoFocus
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={!validateEmail(quickEmail) || isSubmitting}
                      className="bg-brand-green hover:bg-brand-green-light text-white px-6"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="ios-spinner-sm text-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

      {/* Pricing Dropdown - Desktop only (mobile version is above) */}
      <div id="pricing-section" className="hidden md:block ios-section max-w-4xl mx-auto px-6">
        <Collapsible open={isPricingOpen} onOpenChange={(open) => {
          setIsPricingOpen(open);
          // Hide badge when pricing is opened
          if (open && showPricingBadge) {
            setShowPricingBadge(false);
          }
          // Scroll to pricing section when opened, or to top when closed
          if (open) {
            setTimeout(() => {
              const pricingElement = document.querySelector('#pricing-section');
              smoothScrollTo(pricingElement);
            }, 100);
          } else {
            // Cross-platform scroll to top when pricing is collapsed
            setTimeout(() => {
              scrollToTop();
            }, 50);
          }
        }}>
          <CollapsibleTrigger className="ios-touch flex items-center justify-center w-full glass-effect rounded-xl p-5 md:p-6 text-brand-text-dark hover:bg-brand-green/8 relative shadow-md hover:shadow-lg">
            <span className="text-lg md:text-lg font-medium mr-3 md:mr-3">Pricing</span>
            {showPricingBadge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                1
              </div>
            )}
            <ChevronDown className={`h-5 w-5 md:h-5 md:w-5 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-center mb-6">
              <p className="text-red-500 font-semibold text-sm md:text-base mb-2">
                Launch Special til 10 August, 2025
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6">
              {priceCards.map((card, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden transition-all duration-300 ${
                    card.featured 
                      ? 'glass-effect border-2 border-brand-green shadow-xl hover:shadow-2xl md:scale-105' 
                      : 'glass-effect border-brand-green/20 hover:shadow-xl hover:scale-102'
                  } p-6 md:p-8`}
                >
                  {card.badge && (
                    <div className="absolute -top-1 -right-1 overflow-hidden" style={{width: '120px', height: '120px'}}>
                      <div className="absolute bg-brand-green text-white text-xs font-semibold py-1.5 transform rotate-45" style={{width: '150px', textAlign: 'center', top: '25px', right: '-35px'}}>
                        {card.badge}
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
                  <div className="mb-4">
                    {!card.isOther && (
                      <p className="text-sm md:text-base text-red-500 line-through mb-2">
                        {card.title.includes('Single-Page') ? 'R1500' : 'R3500'}
                      </p>
                    )}
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">{card.price}</p>
                  </div>
                  <p className="text-brand-text-muted text-sm md:text-base mb-6">{card.description}</p>
                  <ul className="space-y-3 mb-8">
                    {card.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-left">
                        <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-brand-text-dark text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {card.isOther ? (
                    <a
                      href="mailto:web500za@gmail.com"
                      className={`w-full inline-block text-center px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        card.featured
                          ? 'bg-brand-green hover:bg-brand-green-light text-white shadow-lg'
                          : 'bg-brand-green/10 hover:bg-brand-green hover:text-white text-brand-green'
                      }`}
                      style={{ textDecoration: 'none' }}
                    >
                      Contact me
                    </a>
                  ) : (
                    <Button 
                      onClick={() => {
                        if (card.isOther) {
                          window.location.href = 'mailto:web500za@gmail.com?subject=Other%20Services%20Inquiry';
                        } else {
                          handleGetStarted();
                        }
                      }}
                      className={`w-full ${
                        card.featured 
                          ? 'bg-brand-green hover:bg-brand-green-light text-white shadow-lg' 
                          : 'bg-brand-green/10 hover:bg-brand-green hover:text-white text-brand-green'
                      } transition-all duration-300`}
                    >
                      {card.isOther ? 'Contact me' : 'Get Started'}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* How w5z works Section */}
      <div id="how-w5z-works-section" className="mb-8 md:mb-12 max-w-4xl mx-auto px-6">
        <Collapsible open={isHowItWorksOpen} onOpenChange={(open) => {
          setIsHowItWorksOpen(open);
          // Scroll to section when opened, or to top when closed
          if (open) {
            setTimeout(() => {
              const worksElement = document.querySelector('#how-w5z-works-section');
              smoothScrollTo(worksElement);
            }, 100);
          } else {
            // Cross-platform scroll to top when collapsed
            setTimeout(() => {
              scrollToTop();
            }, 50);
          }
        }}>
          <CollapsibleTrigger className="ios-touch flex items-center justify-center w-full glass-effect rounded-xl p-4 md:p-4 text-brand-text-dark hover:bg-brand-green/5">
            <span className="text-lg md:text-lg font-medium mr-3 md:mr-3">
              How <span className="text-brand-green">w5z</span> works
            </span>
            <ChevronDown className={`h-5 w-5 md:h-5 md:w-5 transition-transform duration-300 ${isHowItWorksOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-xl p-6 md:p-8 mt-4 md:mt-6">
              <div className="space-y-8 md:space-y-10">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">1. Discovery & Vision</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Share your brief and vision with me via email. I'll respond with strategic questions to ensure we're aligned on your goals.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">2. Design Exploration</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I'll create your first design concept as a single-page mockup, showcasing the color palette, typography, and overall aesthetic direction for your brand.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">3. Refinement Process</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    You'll receive up to 3 initial mockups included in your package. Additional design iterations are R100 each. This ensures we land on the perfect visual direction before development begins.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">4. Development Phase</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Once you approve the design direction, a 50% deposit secures your project slot. I then build your complete website according to your chosen package specifications.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">5. Multi-Page Architecture</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    For Business Presence packages, the approved single-page design becomes the foundation for your full site architecture, ensuring visual consistency across all pages.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* FAQs Section */}
      <div id="faqs-section" className="faq-mobile ios-section max-w-4xl mx-auto px-6">
        <Collapsible open={isWorkflowOpen} onOpenChange={(open) => {
          setIsWorkflowOpen(open);
          // Scroll to section when opened, or to top when closed
          if (open) {
            setTimeout(() => {
              const faqsElement = document.querySelector('#faqs-section');
              smoothScrollTo(faqsElement);
            }, 100);
          } else {
            // Cross-platform scroll to top when collapsed
            setTimeout(() => {
              scrollToTop();
            }, 50);
          }
        }}>
          <CollapsibleTrigger className="ios-touch flex items-center justify-center w-full glass-effect rounded-xl p-4 md:p-4 text-brand-text-dark hover:bg-brand-green/5">
            <span className="text-lg md:text-lg font-medium mr-3 md:mr-3">FAQs</span>
            <ChevronDown className={`h-5 w-5 md:h-5 md:w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-xl p-6 md:p-8 mt-4 md:mt-6">
              <div className="space-y-8 md:space-y-10">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">1. How quickly will you respond?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I aim to respond within 24-48hrs with the first iteration, but expect delays on the weekend.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">2. Why are submissions closed?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I only work with up to 4 clients at any given time so that everyone gets their due attention. Check back soon or turn on notifications for submissions being opened again.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">3. How do I secure my slot?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Once you see a mock-up you like and pay the 50% deposit (non-refundable), your slot is secured and 1 less slot becomes available.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">4. What makes an ideal brief?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">5. What happens if I want changes to my site?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I include all reasonable tweaks and adjustments during the build—my goal is that you love the final result! After you sign off and your site is live, any major changes or new features are quoted separately, so you're always in control.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">6. Can I get my site's code or move it later?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Yes! If you want to host your site yourself or move it to your own domain in the future, I can provide the code or assist with the transfer for a small, once-off fee.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">7. What about my domain name?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    You are welcome to purchase your own domain and I'll gladly link it to the site I build for you. If you'd prefer that I handle the domain registration and setup, I can do that for you and simply add the cost to your invoice. Either way, you'll have full control over your domain.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Mobile CTA Button */}
      <div className="mt-16 mb-12 md:hidden px-6">
        <Button 
          onClick={handleGetStarted}
          className="w-full bg-brand-green hover:bg-brand-green-light text-white py-8 text-xl md:text-2xl font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[70px]"
        >
          Let's Get Building
        </Button>
      </div>
        </>
      )}
    </div>
  );
}