import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Step 1 Component
export function ZenProcessStep1() {
  const isMobile = useIsMobile();
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const exampleText = "I run Sage Therapy, a mental health practice in Cape Town. I need a calming, professional website that helps potential clients understand my services and easily book appointments. The site should feel warm and trustworthy, with information about therapy approaches, my background, and a simple booking system. I'd love to showcase client testimonials and have a blog section for mental health resources.";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTyping && currentIndex < exampleText.length) {
      timer = setTimeout(() => {
        setTypedText(exampleText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Typing speed
    } else if (isTyping && currentIndex >= exampleText.length) {
      // Finished typing, pause then restart
      timer = setTimeout(() => {
        setCurrentIndex(0);
        setTypedText('');
      }, 3000); // Pause before restarting
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, exampleText]);

  const startTyping = () => {
    setIsTyping(true);
    setCurrentIndex(0);
    setTypedText('');
  };

  return (
    <section className="section" style={{ 
      paddingTop: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
      paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)'
    }}>
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 className="text-section-title" style={{ 
            marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            1 → Share your vision
          </h2>
          
          <p className="text-body-lg" style={{ 
            fontSize: isMobile ? '1rem' : '1.125rem',
            lineHeight: isMobile ? '1.6' : '1.7',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            marginBottom: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)'
          }}>
            Share your vision in the form at the top of this page. Tell me about your business, goals, and what you need your website to accomplish. The more details you provide, the better I can create something perfect for you.
          </p>

          {/* Example Textarea Demo */}
          <div style={{
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            {/* Example Label */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '20px',
              backgroundColor: 'var(--bg-primary)',
              padding: '0 var(--space-sm)',
              fontSize: '0.875rem',
              color: 'var(--brand-primary)',
              fontWeight: '500',
              fontFamily: 'var(--font-sans)'
            }}>
              Example: Sage Therapy
            </div>

            {/* Mock Textarea */}
            <div 
              style={{
                minHeight: isMobile ? '120px' : '150px',
                padding: 'var(--space-md)',
                backgroundColor: 'var(--bg-primary)',
                border: `2px solid ${isTyping ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)',
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: '1.5',
                color: 'var(--text-primary)',
                position: 'relative',
                cursor: 'text',
                transition: 'border-color 0.2s ease'
              }}
              onClick={startTyping}
            >
              {typedText}
              {isTyping && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.2em',
                  backgroundColor: 'var(--brand-primary)',
                  marginLeft: '1px',
                  animation: 'blink 1s infinite'
                }} />
              )}
              {!isTyping && !typedText && (
                <span style={{
                  color: 'var(--text-tertiary)',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                  Click to see an example...
                </span>
              )}
            </div>

          </div>

          {/* Blinking Animation */}
          <style jsx>{`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

// Step 3 Component
export function ZenProcessStep3() {
  const isMobile = useIsMobile();

  return (
      <section className="section" style={{ 
        paddingTop: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
        paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{ 
              marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-primary)',
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}>
              3 → <span style={{ color: 'var(--brand-primary)' }}>Go Live</span>
            </h2>
            
            <p style={{ 
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: isMobile ? '1.6' : '1.7',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-primary)',
              fontWeight: '400',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}>
              I'll host your website and link your domain. Your site goes live and starts attracting customers. Pay the remaining 50% only when your website brings in business - you succeed, then I succeed.
            </p>

            {/* Space reserved for future animation */}
            <div style={{
              height: isMobile ? '200px' : '300px',
              marginTop: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-quaternary)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-primary)'
            }}>
              {/* Placeholder for animation */}
            </div>
          </div>
        </div>
      </section>
  );
}