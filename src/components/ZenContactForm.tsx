import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { sendEmail, validateEmail } from '@/lib/emailService';

// Enhanced input component with focus effects
const EnhancedInput = ({ style, onFocus, onBlur, ...props }) => {
  const [focused, setFocused] = useState(false);
  
  const baseStyle = {
    width: '100%',
    padding: 'var(--space-md)',
    border: `2px solid ${focused ? 'var(--brand-primary)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-sm)',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(136, 166, 139, 0.1)' : 'none',
    ...style
  };

  return (
    <input
      {...props}
      style={baseStyle}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );
};

const EnhancedTextarea = ({ style, onFocus, onBlur, ...props }) => {
  const [focused, setFocused] = useState(false);
  
  const baseStyle = {
    width: '100%',
    padding: 'var(--space-md)',
    border: `2px solid ${focused ? 'var(--brand-primary)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-sm)',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    resize: 'vertical',
    minHeight: '100px',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(136, 166, 139, 0.1)' : 'none',
    ...style
  };

  return (
    <textarea
      {...props}
      style={baseStyle}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );
};

const EnhancedSelect = ({ style, onFocus, onBlur, ...props }) => {
  const [focused, setFocused] = useState(false);
  
  const baseStyle = {
    width: '100%',
    padding: 'var(--space-md)',
    border: `2px solid ${focused ? 'var(--brand-primary)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-sm)',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(136, 166, 139, 0.1)' : 'none',
    ...style
  };

  return (
    <select
      {...props}
      style={baseStyle}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );
};

interface ZenContactFormProps {
  onSuccess?: () => void;
}

export function ZenContactForm({ onSuccess }: ZenContactFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user types
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

  if (submitted) {
    return (
      <div className="minimal-card" style={{
        textAlign: 'center'
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
          fontSize: '2rem'
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
    <form onSubmit={handleSubmit} className="minimal-form" style={{
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Form Header with Subtle Animation */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--space-xl)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '4px',
          backgroundColor: 'var(--brand-primary)',
          borderRadius: '2px',
          opacity: 0.8
        }} />
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          marginBottom: 'var(--space-sm)'
        }}>
          Tell me about your project
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          opacity: 0.8
        }}>
          The more details you share, the better your mockups will be
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          color: '#DC2626',
          padding: 'var(--space-md)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--space-lg)',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        {/* Name and Email Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-xs)',
              fontFamily: 'var(--font-sans)'
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
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'var(--transition-colors)'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-xs)',
              fontFamily: 'var(--font-sans)'
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
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'var(--transition-colors)'
              }}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-xs)',
            fontFamily: 'var(--font-sans)'
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
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              transition: 'var(--transition-colors)'
            }}
          />
        </div>

        {/* Project Description */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-xs)',
            fontFamily: 'var(--font-sans)'
          }}>
            Project Description *
          </label>
          <textarea
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell me about your business and what kind of website you need..."
            style={{
              width: '100%',
              padding: 'var(--space-md)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              transition: 'var(--transition-colors)',
              resize: 'vertical',
              minHeight: '100px'
            }}
          />
        </div>

        {/* Budget and Timeline Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-xs)',
              fontFamily: 'var(--font-sans)'
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
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'var(--transition-colors)'
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
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-xs)',
              fontFamily: 'var(--font-sans)'
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
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'var(--transition-colors)'
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

        {/* Submit Button */}
        <div style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary, var(--brand-primary)) 100%)',
          borderRadius: 'var(--radius-sm)',
          padding: '2px',
          marginTop: 'var(--space-lg)'
        }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isSubmitting ? 'var(--brand-primary)' : 'var(--brand-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: 'var(--space-lg) var(--space-2xl)',
              borderRadius: 'calc(var(--radius-sm) - 2px)',
              fontSize: '1.05rem',
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
              boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
          >
            {isSubmitting && <LoadingSpinner size="sm" color="var(--bg-primary)" />}
            {isSubmitting ? 'Sending Your Project...' : 'Get My Free Mockups'}
          </button>
        </div>
        
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
    </form>
  );
}