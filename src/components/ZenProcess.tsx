import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Step 1 Component
export function ZenProcessStep1() {
  const isMobile = useIsMobile();

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
            1 → Fill in the Textarea
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

          <button 
            className="btn btn-accent"
            onClick={() => {
              // Scroll to hero section form
              const heroSection = document.querySelector('.hero');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
                // Focus textarea after scroll
                setTimeout(() => {
                  const textarea = document.querySelector('textarea[name="project"]') as HTMLElement;
                  if (textarea) {
                    textarea.focus();
                  }
                }, 800);
              }
            }}
            style={{
              fontSize: isMobile ? '1rem' : '1rem',
              fontWeight: '500',
              padding: isMobile ? 'var(--space-md) var(--space-xl)' : 'var(--space-md) var(--space-xl)',
              backgroundColor: 'var(--brand-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--brand-primary)';
              }
            }}
          >
            Start Your Project
          </button>
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