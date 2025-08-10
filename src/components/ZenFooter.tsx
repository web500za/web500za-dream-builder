import React from 'react';

export function ZenFooter() {
  // Footer styles - opposite of main theme
  const footerStyles = {
    backgroundColor: '#1F1F1F',  // Dark footer on pink background
    color: '#D1CFC0',            // Light text
    borderColor: '#2E2E2E'       // Dark border
  };

  return (
    <footer style={{
      backgroundColor: footerStyles.backgroundColor,
      color: footerStyles.color,
      padding: 'var(--space-4xl) 0 var(--space-2xl)',
      marginTop: 'var(--space-5xl)',
      borderTop: `1px solid ${footerStyles.borderColor}`,
      transition: 'var(--transition-colors)'
    }}>
      <div className="container">
        {/* Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-3xl)'
        }}>
          {/* Brand Section */}
          <div>
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: footerStyles.color,
              marginBottom: 'var(--space-md)',
              fontFamily: 'var(--font-sans)'
            }}>
              The Social Media Unicorn
            </h4>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#B8B6A7',
              marginBottom: 'var(--space-lg)',
              maxWidth: '300px',
              fontFamily: 'var(--font-sans)'
            }}>
              Creating magical social media content that converts followers into customers. 
              Professional social campaigns that grow your business.
            </p>
            
            {/* Contact Info */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <a 
                href="mailto:hello@socialmediaunicorn.com"
                style={{
                  color: 'var(--brand-primary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: 'var(--space-xs)',
                  fontWeight: '500'
                }}
              >
                hello@socialmediaunicorn.com
              </a>
              <a 
                href="https://wa.me/27832540891"
                style={{
                  color: 'var(--brand-primary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'block',
                  fontWeight: '500'
                }}
              >
                +27 83 254 0891
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)',
              fontFamily: 'var(--font-sans)'
            }}>
              Services
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                'Content Creation',
                'Social Media Management', 
                'Instagram & TikTok Strategy',
                'LinkedIn Growth',
                'Brand Storytelling'
              ].map((service, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: '#B8B6A7',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-colors)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-md)',
              fontFamily: 'var(--font-sans)'
            }}>
              Company
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                'About',
                'Portfolio',
                'Process',
                'Testimonials',
                'Blog',
                'Contact'
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: '#B8B6A7',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-colors)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid var(--border-default)',
          paddingTop: 'var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)'
        }}>
          <p className="text-caption">
            © 2025 The Social Media Unicorn. Growing businesses with magical social content.
          </p>
          
          {/* Social Links */}
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <a
              href="https://wa.me/27832540891"
              style={{
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--transition-colors)'
              }}
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@socialmediaunicorn.com"
              style={{
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--transition-colors)'
              }}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}