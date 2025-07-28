import React from 'react';

export function ZenProductShowcase() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        {/* Product Preview - Like Zen's Browser Screenshot */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-xl)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}>
          {/* Mock Browser Window */}
          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
            marginBottom: 'var(--space-lg)',
            border: '1px solid var(--border-default)'
          }}>
            {/* Browser Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-md)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: '1px solid var(--border-default)'
            }}>
              <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#FF5F57'
                }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#FFBD2E'
                }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#28CA42'
                }} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                fontFamily: 'monospace'
              }}>
                yoursite.com
              </div>
            </div>
            
            {/* Mock Website Content */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-lg)',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
                fontFamily: 'var(--font-sans)'
              }}>
                Your Business Website
              </h3>
              <div style={{
                width: '80%',
                height: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '4px',
                marginBottom: 'var(--space-sm)'
              }} />
              <div style={{
                width: '60%',
                height: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '4px',
                marginBottom: 'var(--space-md)'
              }} />
              <div style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                marginTop: 'var(--space-md)'
              }}>
                <div style={{
                  width: '80px',
                  height: '32px',
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--bg-primary)',
                  fontWeight: '500'
                }}>
                  Contact
                </div>
                <div style={{
                  width: '80px',
                  height: '32px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '500'
                }}>
                  About
                </div>
              </div>
            </div>
          </div>
          
          {/* Call-to-Action Badge */}
          <div style={{
            position: 'absolute',
            top: 'var(--space-lg)',
            right: 'var(--space-lg)',
            backgroundColor: 'var(--brand-primary)',
            color: 'var(--bg-primary)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)'
          }}>
            Built for You
          </div>
          
          {/* Bottom Text */}
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.5
          }}>
            Professional websites that work as hard as your business does. 
            Enterprise security meets local business needs.
          </p>
        </div>
      </div>
    </section>
  );
}