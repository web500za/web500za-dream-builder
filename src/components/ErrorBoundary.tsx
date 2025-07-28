import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-primary, #D1CFC0)',
          color: 'var(--text-primary, #1F1F1F)',
          fontFamily: 'var(--font-sans, system-ui)',
          padding: 'var(--space-xl, 2rem)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: 'var(--space-2xl, 3rem)',
            backgroundColor: 'var(--bg-secondary, #E8E6DD)',
            borderRadius: 'var(--radius-lg, 1rem)',
            boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.05))'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: 'var(--brand-accent, #F76F53)',
              marginBottom: 'var(--space-lg, 1.5rem)'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary, #2E2E2E)',
              marginBottom: 'var(--space-xl, 2rem)'
            }}>
              We're sorry, but something unexpected happened. Don't worry - 
              your data is safe and this issue has been logged.
            </p>
            
            <div style={{
              display: 'flex',
              gap: 'var(--space-md, 1rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: 'var(--brand-accent, #F76F53)',
                  color: 'white',
                  border: 'none',
                  padding: 'var(--space-md, 1rem) var(--space-xl, 2rem)',
                  borderRadius: 'var(--radius-sm, 0.375rem)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'var(--transition-colors, all 0.25s ease)',
                  fontFamily: 'inherit'
                }}
              >
                Reload Page
              </button>
              
              <a
                href="mailto:web500za@gmail.com?subject=Website Error"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary, #1F1F1F)',
                  border: '1px solid var(--border-default, rgba(31, 31, 31, 0.2))',
                  padding: 'var(--space-md, 1rem) var(--space-xl, 2rem)',
                  borderRadius: 'var(--radius-sm, 0.375rem)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-colors, all 0.25s ease)',
                  fontFamily: 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Report Issue
              </a>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: 'var(--space-xl, 2rem)',
                textAlign: 'left',
                backgroundColor: 'var(--bg-tertiary, #F3F0EB)',
                padding: 'var(--space-lg, 1.5rem)',
                borderRadius: 'var(--radius-sm, 0.375rem)',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  marginTop: 'var(--space-md, 1rem)', 
                  whiteSpace: 'pre-wrap',
                  color: 'var(--text-tertiary, #6B6B6B)'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}