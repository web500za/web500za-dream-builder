import React from 'react';

interface ZenFooterProps {
  currentTheme?: 'light' | 'dark';
}

export function ZenFooter({ currentTheme = 'light' }: ZenFooterProps) {
  // Use opposite theme colors
  const footerStyles = currentTheme === 'light' ? {
    // Light mode -> use dark colors
    backgroundColor: '#1F1F1F',  // Zen's black
    color: '#D1CFC0',            // Zen's light gray
    borderColor: '#2E2E2E'       // Zen's dark slate
  } : {
    // Dark mode -> use light colors  
    backgroundColor: '#D1CFC0',  // Zen's light gray
    color: '#1F1F1F',            // Zen's black
    borderColor: 'rgba(31, 31, 31, 0.2)' // Subtle dark border
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
              web500za
            </h4>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: currentTheme === 'light' ? '#B8B6A7' : '#2E2E2E',
              marginBottom: 'var(--space-lg)',
              maxWidth: '300px',
              fontFamily: 'var(--font-sans)'
            }}>
              Bringing Fortune 500 quality web design and security to local businesses. 
              Professional websites that work as hard as you do.
            </p>
            
            {/* Contact Info */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <a 
                href="mailto:web500za@gmail.com"
                style={{
                  color: 'var(--brand-primary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'block',
                  marginBottom: 'var(--space-xs)',
                  fontWeight: '500'
                }}
              >
                web500za@gmail.com
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
                'Website Design',
                'E-commerce Development', 
                'Security Auditing',
                'Performance Optimization',
                'Maintenance & Support'
              ].map((service, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: currentTheme === 'light' ? '#B8B6A7' : '#2E2E2E',
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
                    color: currentTheme === 'light' ? '#B8B6A7' : '#2E2E2E',
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
            © 2025 web500za. Building stronger communities, one website at a time.
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
              href="mailto:web500za@gmail.com"
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