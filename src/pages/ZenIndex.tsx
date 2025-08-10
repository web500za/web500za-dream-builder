import React, { useState } from 'react';
import { ZenHero } from '@/components/ZenHero';
import { ZenFooter } from '@/components/ZenFooter';
import { TextMessagesAnimation } from '@/components/TextMessagesAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ZenIndex() {
  const isMobile = useIsMobile();
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const handleGetStarted = () => {
    // Scroll to contact or open contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no contact section, could open a modal or navigate to contact page
      window.location.href = 'mailto:web500za@gmail.com?subject=New Project Inquiry';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      transition: 'var(--transition-colors)'
    }}>

      {/* Main Content */}
      <main>
        
        {/* Hero Section */}
        <ZenHero 
          onGetStarted={handleGetStarted} 
          onFormExpandChange={setIsFormExpanded} 
        />

        {/* Text Messages Animation Section - Absolutely positioned */}
        <div style={{ 
          position: 'absolute',
          left: 0,
          right: 0,
          top: isMobile ? 'calc(100vh - 300px)' : 'calc(100vh - 400px)',
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          <TextMessagesAnimation />
        </div>

        {/* Simple CTA Section */}
        <section className="section" id="contact" style={{ 
          textAlign: 'center',
          paddingTop: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
          paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
          marginTop: isFormExpanded ? (isMobile ? '300px' : '400px') : '0px',
          transition: 'margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div className="container">
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-lg)' }}>
              Ready to get started?
            </h2>
            <p className="text-body-lg" style={{ 
              marginTop: 'var(--space-lg)', 
              maxWidth: '600px', 
              marginLeft: 'auto', 
              marginRight: 'auto',
              marginBottom: 'var(--space-3xl)',
              color: 'var(--text-secondary)'
            }}>
              Tell me about your social media goals and I'll send you 3 free content mockups. Only pay when you want to work together.
            </p>
            
            <div style={{
              display: 'flex',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => {
                  const heroSection = document.querySelector('.hero');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  padding: isMobile ? 'var(--space-md) var(--space-xl)' : 'var(--space-md) var(--space-xl)',
                  minHeight: isMobile ? 'var(--space-mobile-touch)' : 'auto',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-sans)',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Started
              </button>
              
              <a 
                href="https://wa.me/27832540891"
                style={{ 
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  padding: isMobile ? 'var(--space-md) var(--space-xl)' : 'var(--space-md) var(--space-xl)',
                  minHeight: isMobile ? 'var(--space-mobile-touch)' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '500',
                  fontFamily: 'var(--font-sans)',
                  transition: 'color 0.2s ease',
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--brand-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <ZenFooter />
    </div>
  );
}