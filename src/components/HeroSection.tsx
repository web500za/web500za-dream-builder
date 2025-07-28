import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExpandingHeroForm } from "@/components/ExpandingHeroForm";
import { ChevronDown, Check } from "lucide-react";
import { detectBrowser } from "@/lib/browserDetection";
import './HeroSection.css';


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
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [internalIsPricingOpen, setInternalIsPricingOpen] = useState(false);
  const [internalShowPricingBadge, setInternalShowPricingBadge] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [browserInfo, setBrowserInfo] = useState({ isInstagram: false, isSocialMedia: false });
  
  const isPricingOpen = externalIsPricingOpen ?? internalIsPricingOpen;
  const setIsPricingOpen = externalSetIsPricingOpen ?? setInternalIsPricingOpen;
  const showPricingBadge = externalShowPricingBadge && internalShowPricingBadge;
  const setShowPricingBadge = externalSetShowPricingBadge ?? setInternalShowPricingBadge;

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
  };

  // Handle when email is successfully sent
  const handleEmailSent = () => {
    setEmailSent(true);
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
          {/* Mobile: Form first, minimal messaging */}
          <div className="md:hidden">
            <ExpandingHeroForm 
              triggerTextareaGlow={triggerTextareaGlow}
              onEmailSent={handleEmailSent}
            />
            
            <div className="flex items-center justify-center gap-4 text-xs text-brand-text-muted/80 mt-3 mb-6">
              <span>✓ 24-48hr response</span>
              <span>✓ No upfront payment</span>
              <span>✓ Professional quality</span>
            </div>
            
            <p className="text-sm text-brand-text-muted text-center mb-4">
              Get 3 free mockups. <span className="text-brand-green font-semibold">Only pay when you love the design.</span>
            </p>
            
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

          {/* Desktop: Form first, minimal messaging */}
          <div className="hidden md:block">
            {/* Form */}
            <div className="mb-8">
              <ExpandingHeroForm 
                triggerTextareaGlow={triggerTextareaGlow}
                onEmailSent={handleEmailSent}
              />
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-brand-text-muted/80 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                <span>24-48hr response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                <span>No upfront payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                <span>Professional quality</span>
              </div>
            </div>
            
            <p className="text-base text-brand-text-muted text-center max-w-2xl mx-auto leading-relaxed mb-16 md:mb-20">
              Get 3 free mockups for your website idea. <span className="text-brand-green font-semibold">Only pay when you love the design</span> and want to move forward.
            </p>
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