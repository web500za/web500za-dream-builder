import React, { useState, useEffect, useRef } from 'react';

export function ZenTransformation() {
  const [activeExample, setActiveExample] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Transformation examples with realistic business scenarios
  const transformations = [
    {
      category: "Local Restaurant",
      businessType: "Food & Beverage",
      before: {
        title: "Outdated & Confusing",
        issues: ["No online ordering", "Poor mobile experience", "Unclear menu structure", "No brand consistency"],
        description: "Like most local restaurants, struggling with an outdated website that doesn't convert visitors to customers."
      },
      after: {
        title: "Modern & Converting",
        improvements: ["Seamless online ordering", "Mobile-optimized design", "Clear menu categories", "Strong brand identity"],
        description: "A clean, conversion-focused website that turns visitors into repeat customers."
      },
      metrics: { orders: "+180%", mobile: "+240%", time: "3.2s load time" }
    },
    {
      category: "Professional Services",
      businessType: "Legal Practice",
      before: {
        title: "Generic & Unprofessional",
        issues: ["Template-based design", "No clear value proposition", "Poor contact flow", "No client portal"],
        description: "A generic law firm website that fails to establish trust or differentiate from competitors."
      },
      after: {
        title: "Trusted & Professional",
        improvements: ["Custom professional design", "Clear service offerings", "Streamlined contact forms", "Secure client login"],
        description: "A trustworthy, professional presence that converts prospects into clients."
      },
      metrics: { inquiries: "+150%", trust: "+90% trust score", conversion: "2.3x higher" }
    },
    {
      category: "Health & Wellness",
      businessType: "Fitness Studio",
      before: {
        title: "Cluttered & Hard to Use",
        issues: ["Confusing class schedules", "No online booking", "Poor visual hierarchy", "Slow loading times"],
        description: "A fitness studio website that makes booking classes more difficult than the actual workout."
      },
      after: {
        title: "Simple & Booking-Focused",
        improvements: ["Clear class schedules", "One-click booking system", "Clean visual design", "Lightning-fast performance"],
        description: "An intuitive booking experience that gets members to class, not frustrated."
      },
      metrics: { bookings: "+220%", retention: "+85% retention", speed: "1.8s load time" }
    }
  ];

  // Subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -0.05;
        setParallaxOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTransformation = transformations[activeExample];

  return (
    <section 
      ref={sectionRef}
      className="section" 
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--space-4xl)',
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <h2 className="text-section-title" style={{ 
            marginBottom: 'var(--space-lg)'
          }}>
            Your Business Website
          </h2>
          <p className="text-body-lg" style={{ 
            maxWidth: '700px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            marginBottom: 'var(--space-xl)'
          }}>
            See what the w5z transformation looks like for businesses just like yours. 
            Real improvements, measurable results.
          </p>

          {/* Business Type Selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-2xl)'
          }}>
            {transformations.map((transformation, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                style={{
                  padding: 'var(--space-sm) var(--space-lg)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-default)',
                  background: activeExample === index ? 'var(--brand-primary)' : 'transparent',
                  color: activeExample === index ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all var(--duration-normal) var(--ease-in-out)',
                  transform: activeExample === index ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {transformation.category}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-4xl)',
          transform: `translateY(${parallaxOffset * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}>
          
          {/* BEFORE - Left Side */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-primary)',
            transform: 'perspective(800px) rotateY(5deg)',
            transition: 'all var(--duration-slow) var(--ease-in-out)'
          }}>
            {/* Before Header */}
            <div style={{
              padding: 'var(--space-xl)',
              borderBottom: '1px solid var(--border-default)',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-sm)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  😞
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  Before
                </h3>
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-xs)'
              }}>
                {currentTransformation.before.title}
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                {currentTransformation.before.description}
              </p>
            </div>

            {/* Before Issues List */}
            <div style={{ padding: 'var(--space-xl)' }}>
              <h5 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Common Issues
              </h5>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                {currentTransformation.before.issues.map((issue, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: 'var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(239, 68, 68, 0.05)'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      flexShrink: 0
                    }}>
                      ✗
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {issue}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Before Visual Representation */}
            <div style={{
              margin: 'var(--space-xl)',
              height: '200px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              border: '2px dashed var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6
            }}>
              <div style={{
                textAlign: 'center',
                color: 'var(--text-tertiary)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>📱</div>
                <p style={{ fontSize: '0.75rem', margin: 0 }}>Outdated Design</p>
              </div>
            </div>
          </div>

          {/* AFTER - Right Side */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid var(--brand-primary)',
            background: 'var(--bg-primary)',
            transform: 'perspective(800px) rotateY(-5deg)',
            transition: 'all var(--duration-slow) var(--ease-in-out)',
            boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)'
          }}>
            {/* After Header */}
            <div style={{
              padding: 'var(--space-xl)',
              borderBottom: '1px solid var(--border-default)',
              background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.1) 0%, rgba(45, 90, 61, 0.05) 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-sm)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  color: 'var(--bg-primary)'
                }}>
                  ✨
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  After w5z Treatment
                </h3>
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-xs)'
              }}>
                {currentTransformation.after.title}
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                {currentTransformation.after.description}
              </p>
            </div>

            {/* After Improvements List */}
            <div style={{ padding: 'var(--space-xl)' }}>
              <h5 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Key Improvements
              </h5>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)'
              }}>
                {currentTransformation.after.improvements.map((improvement, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: 'var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(45, 90, 61, 0.05)'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: 'var(--bg-primary)',
                      flexShrink: 0
                    }}>
                      ✓
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {improvement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Visual Representation */}
            <div style={{
              margin: 'var(--space-xl)',
              height: '200px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.1) 0%, rgba(45, 90, 61, 0.05) 100%)',
              border: '2px solid var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Geometric Pattern Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, transparent 40%, rgba(45, 90, 61, 0.03) 50%, transparent 60%)',
                animation: 'shimmer 3s ease-in-out infinite'
              }} />
              <div style={{
                textAlign: 'center',
                color: 'var(--brand-primary)',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>🚀</div>
                <p style={{ fontSize: '0.75rem', margin: 0, fontWeight: '600' }}>Professional Design</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Metrics */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(45, 90, 61, 0.02) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-2xl)',
          border: '1px solid rgba(45, 90, 61, 0.1)',
          textAlign: 'center',
          transform: `translateY(${parallaxOffset * 0.15}px)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-xl)'
          }}>
            Real Results for {currentTransformation.businessType}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-xl)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {Object.entries(currentTransformation.metrics).map(([key, value], index) => (
              <div key={key} style={{
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'var(--brand-primary)',
                  marginBottom: 'var(--space-sm)',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {value}
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  textTransform: 'capitalize',
                  margin: 0
                }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 'var(--space-4xl)',
          transform: `translateY(${parallaxOffset * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-xl)',
            maxWidth: '600px',
            margin: '0 auto var(--space-xl)'
          }}>
            Ready to see what your business transformation could look like?
          </p>
          <button 
            className="btn btn-primary"
            style={{
              background: 'var(--brand-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: 'var(--space-lg) var(--space-2xl)',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all var(--duration-normal) var(--ease-in-out)',
              transform: 'translateY(0)',
              boxShadow: '0 4px 12px rgba(45, 90, 61, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 90, 61, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 90, 61, 0.2)';
            }}
          >
            Get My Free Mockups
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @media (max-width: 768px) {
          .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: var(--space-xl) !important;
          }
          
          .container > div:nth-child(2) > div {
            transform: none !important;
          }
          
          .container > div:nth-child(3) > div:last-child {
            grid-template-columns: 1fr !important;
            gap: var(--space-lg) !important;
          }
        }
      `}</style>
    </section>
  );
}