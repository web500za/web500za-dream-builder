import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ZenFeatures() {
  const isMobile = useIsMobile();
  const features = [
    {
      title: "Secure & Protected",
      description: "Modern security practices built into every website. SSL encryption, secure hosting, and regular updates keep your site safe."
    },
    {
      title: "Lightning Fast",
      description: "Optimized for speed and performance. Your customers won't wait, and neither should your website load times."
    },
    {
      title: "Mobile First",
      description: "Designed from the ground up for mobile users. Perfect experience on every device, every time."
    },
    {
      title: "Clean Architecture", 
      description: "Built with modern web standards and clean code practices. Maintainable, scalable, and future-proof websites."
    },
    {
      title: "Always Available",
      description: "Reliable hosting and monitoring ensure your website stays online when your customers need it most."
    },
    {
      title: "Future Proof",
      description: "Modern technology stack that grows with your business. No more outdated websites holding you back."
    }
  ];

  return (
    <section className="section" style={{
      paddingTop: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)',
      paddingBottom: isMobile ? 'var(--space-4xl)' : 'var(--space-5xl)'
    }}>
      <div className="container">
        {/* Section Title - Zen Style */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-4xl)'
        }}>
          <h2 className="text-section-title" style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem'
          }}>Reliability at its best</h2>
          <p className="text-body-lg" style={{ 
            marginTop: isMobile ? 'var(--space-md)' : 'var(--space-lg)', 
            maxWidth: isMobile ? '100%' : '600px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            fontSize: isMobile ? '1rem' : '1.125rem',
            lineHeight: isMobile ? '1.6' : '1.7',
            padding: isMobile ? '0 var(--space-md)' : '0'
          }}>
            Every website I build follows the same security and performance standards 
            used by Fortune 500 companies. Your local business deserves enterprise-grade quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="feature-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
          marginTop: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)'
        }}>
          {features.map((feature, index) => (
            <div key={index} className="minimal-card" style={{
              padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
              marginBottom: isMobile ? 'var(--space-md)' : '0'
            }}>
              <h3 className="text-card-title" style={{
                fontSize: isMobile ? '1.125rem' : '1.25rem'
              }}>{feature.title}</h3>
              <p className="text-body" style={{ 
                marginTop: 'var(--space-md)',
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: isMobile ? '1.5' : '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}