import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { sendEmail, validateEmail } from '@/lib/emailService';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to get theme-aware colors
const getThemeColors = () => {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    containerBg: isDark ? 'rgba(44, 42, 38, 0.6)' : 'rgba(248, 246, 241, 0.6)',
    inputBg: 'var(--minimal-bg)',
    inputBgOptional: 'var(--minimal-bg)',
    border: isDark ? 'rgba(248, 246, 241, 0.15)' : 'rgba(45, 90, 61, 0.15)',
    borderRequired: isDark ? 'rgba(74, 124, 89, 0.3)' : 'rgba(45, 90, 61, 0.2)',
    gradientLine: isDark 
      ? 'linear-gradient(90deg, transparent, rgba(74, 124, 89, 0.3), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(45, 90, 61, 0.2), transparent)'
  };
};

interface ZenExpandingFormProps {
  onSuccess?: () => void;
}

export function ZenExpandingForm({ onSuccess }: ZenExpandingFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('Share your vision - I\'ll bring it to life...');
  const [themeColors, setThemeColors] = useState(getThemeColors());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Update theme colors when theme changes
  useEffect(() => {
    const updateTheme = () => setThemeColors(getThemeColors());
    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    return () => observer.disconnect();
  }, []);

  // Animated placeholder effect
  useEffect(() => {
    if (!isExpanded) {
      const placeholders = [
        'Share your vision - I\'ll bring it to life...',
        'Tell me about your dream website...',
        'Describe your business goals and I\'ll create something amazing...',
        'What\'s your story? Let\'s build something beautiful together...'
      ];
      let index = 0;
      
      const interval = setInterval(() => {
        setAnimatedPlaceholder(placeholders[index]);
        index = (index + 1) % placeholders.length;
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isExpanded]);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleTextareaFocus = () => {
    setIsExpanded(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.project.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const emailFormData = new FormData();
      emailFormData.set('from_name', formData.name);
      emailFormData.set('from_email', formData.email);
      emailFormData.set('phone', formData.phone);
      emailFormData.set('project_description', formData.project);
      emailFormData.set('budget', formData.budget);
      emailFormData.set('timeline', formData.timeline);

      await sendEmail(emailFormData);
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="minimal-card" style={{
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--brand-primary)',
          margin: '0 auto var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'var(--bg-primary)'
        }}>
          ✓
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-md)',
          fontFamily: 'var(--font-sans)'
        }}>
          Message Sent!
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.6,
          fontFamily: 'var(--font-sans)'
        }}>
          Thank you for reaching out. I'll get back to you within 24 hours with some initial ideas and next steps.
        </p>
      </div>
    );
  }

  return (
    <div ref={formRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      width: '100%'
    }}>
      <form onSubmit={handleSubmit} style={{
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        
        {/* Initial Textarea - Always Visible */}
        <div style={{
          padding: isExpanded 
            ? (isMobile ? 'var(--space-lg) var(--space-md) var(--space-md)' : 'var(--space-xl) var(--space-xl) var(--space-md)')
            : (isMobile ? 'var(--space-md)' : 'var(--space-lg)'),
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            cursor: 'text'
          }}>
            <textarea
              ref={textareaRef}
              name="project"
              value={formData.project}
              onChange={handleChange}
              onFocus={(e) => {
                handleTextareaFocus();
                e.currentTarget.style.borderColor = 'var(--brand-primary)';
                e.currentTarget.style.boxShadow = `
                  0 0 0 4px rgba(45, 90, 61, 0.2),
                  0 12px 32px rgba(45, 90, 61, 0.15),
                  inset 0 1px 3px rgba(45, 90, 61, 0.1)
                `;
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
              }}
              onBlur={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.borderColor = 'var(--brand-primary)';
                  e.currentTarget.style.boxShadow = `
                    0 0 0 3px rgba(45, 90, 61, 0.1),
                    0 4px 12px rgba(45, 90, 61, 0.08),
                    inset 0 1px 3px rgba(45, 90, 61, 0.05)
                  `;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }
              }}
              placeholder={formData.project ? '' : animatedPlaceholder}
              required
              style={{
                width: '100%',
                minHeight: isExpanded 
                  ? (isMobile ? '100px' : '120px') 
                  : (isMobile ? '80px' : '100px'),
                padding: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                border: `2.5px solid var(--brand-primary)`,
                backgroundColor: 'var(--minimal-bg)',
                borderRadius: isMobile ? '8px' : '12px',
                fontSize: isMobile ? '16px' : '1.125rem', // Prevent zoom on iOS
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                resize: 'vertical',
                outline: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `
                  0 0 0 3px rgba(45, 90, 61, 0.1),
                  0 4px 12px rgba(45, 90, 61, 0.08),
                  inset 0 1px 3px rgba(45, 90, 61, 0.05)
                `,
                background: 'var(--minimal-bg)',
                animation: !isExpanded && !formData.project ? 'textareaBreathing 4s ease-in-out infinite' : 'none',
                touchAction: 'manipulation' // Prevent double-tap zoom
              }}
              onMouseEnter={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                  e.currentTarget.style.boxShadow = `
                    0 0 0 3px rgba(45, 90, 61, 0.15),
                    0 8px 24px rgba(45, 90, 61, 0.12),
                    inset 0 1px 3px rgba(45, 90, 61, 0.08)
                  `;
                }
              }}
              onMouseLeave={(e) => {
                if (!isExpanded) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `
                    0 0 0 3px rgba(45, 90, 61, 0.1),
                    0 4px 12px rgba(45, 90, 61, 0.08),
                    inset 0 1px 3px rgba(45, 90, 61, 0.05)
                  `;
                }
              }}
            />
            
            {/* Character Count Encouragement */}
            {isExpanded && formData.project && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '16px',
                fontSize: '0.75rem',
                color: 'var(--brand-primary)',
                opacity: 0.6,
                fontWeight: '500',
                pointerEvents: 'none'
              }}>
                {formData.project.length > 20 ? 'Looking great! ✓' : 'Share more details...'}
              </div>
            )}
          </div>
        </div>


        {/* Expanded Fields - Revealed on Focus */}
        <div style={{
          maxHeight: isExpanded ? '800px' : '0',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isExpanded ? 1 : 0
        }}>
          {/* Error Message */}
          {error && (
            <div style={{
              margin: '0 var(--space-xl) var(--space-md)',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#DC2626',
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <div style={{
            padding: '0 var(--space-xl)',
            display: 'grid',
            gap: 'var(--space-lg)'
          }}>
            {/* Name and Email Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 640 ? '1fr 1fr' : '1fr',
              gap: 'var(--space-md)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--brand-primary)',
                  marginBottom: 'var(--space-xs)',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-md)',
                    border: `2px solid ${themeColors.borderRequired}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: themeColors.inputBg,
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 61, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--brand-primary)',
                  marginBottom: 'var(--space-xs)',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-md)',
                    border: `2px solid ${themeColors.borderRequired}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: themeColors.inputBg,
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 61, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--brand-secondary)',
                marginBottom: 'var(--space-xs)',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Phone (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  border: `2px solid ${themeColors.border}`,
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: themeColors.inputBgOptional,
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 61, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-default)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Budget and Timeline Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 640 ? '1fr 1fr' : '1fr',
              gap: 'var(--space-md)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--brand-secondary)',
                  marginBottom: 'var(--space-xs)',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--space-md)',
                    border: `2px solid ${themeColors.border}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: themeColors.inputBgOptional,
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 61, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select budget range</option>
                  <option value="R1000-R2500">R1000 - R2500</option>
                  <option value="R2500-R5000">R2500 - R5000</option>
                  <option value="R5000+">R5000+</option>
                  <option value="Let's discuss">Let's discuss</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--brand-secondary)',
                  marginBottom: 'var(--space-xs)',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--space-md)',
                    border: `2px solid ${themeColors.border}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: themeColors.inputBgOptional,
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 61, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-default)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{
            padding: 'var(--space-xl)',
            paddingTop: 'var(--space-lg)'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: 'var(--brand-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                padding: isMobile 
                  ? 'var(--space-md) var(--space-lg)' 
                  : 'var(--space-lg) var(--space-2xl)',
                minHeight: isMobile ? 'var(--space-mobile-comfort)' : 'auto',
                borderRadius: 'var(--radius-sm)',
                fontSize: isMobile ? '16px' : '1.05rem', // Prevent zoom on iOS
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                opacity: isSubmitting ? 0.8 : 1,
                transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
                boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(45, 90, 61, 0.3)',
                touchAction: 'manipulation'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 90, 61, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'var(--brand-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 90, 61, 0.3)';
                }
              }}
            >
              {isSubmitting && <LoadingSpinner size="sm" color="var(--bg-primary)" />}
              {isSubmitting ? 'Sending Your Project...' : 'Get My Free Mockups'}
            </button>

            {/* Trust Elements */}
            <div style={{
              marginTop: 'var(--space-lg)',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-xs)'
              }}>
                <span style={{ color: 'var(--brand-primary)' }}>✓</span>
                <span>No upfront payment required</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-xs)'
              }}>
                <span style={{ color: 'var(--brand-primary)' }}>✓</span>
                <span>24-hour response time</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)'
              }}>
                <span style={{ color: 'var(--brand-primary)' }}>✓</span>
                <span>3 professional mockups included</span>
              </div>
            </div>
          </div>
        </div>

      </form>
      
      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes textareaBreathing {
          0%, 100% { 
            box-shadow: 
              0 0 0 3px rgba(45, 90, 61, 0.1),
              0 4px 12px rgba(45, 90, 61, 0.08),
              inset 0 1px 3px rgba(45, 90, 61, 0.05);
            transform: scale(1);
          }
          50% { 
            box-shadow: 
              0 0 0 3px rgba(45, 90, 61, 0.15),
              0 6px 16px rgba(45, 90, 61, 0.12),
              inset 0 1px 3px rgba(45, 90, 61, 0.08);
            transform: scale(1.005);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes placeholderShimmer {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 
              0 0 0 3px rgba(45, 90, 61, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.06),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          50% { 
            transform: scale(1.005); 
            box-shadow: 
              0 0 0 3px rgba(45, 90, 61, 0.12),
              0 4px 12px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
          }
        }
      `}</style>
    </div>
  );
}