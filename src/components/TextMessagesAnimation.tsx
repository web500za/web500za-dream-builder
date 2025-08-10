import React from 'react';
import Lottie from 'lottie-react';
import { useIsMobile } from '@/hooks/use-mobile';
import textMessagesAnimation from '@/assets/animations/text-messages.json';

interface TextMessagesAnimationProps {
  className?: string;
  style?: React.CSSProperties;
}

export function TextMessagesAnimation({ className = '', style = {} }: TextMessagesAnimationProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`text-messages-animation ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? 'var(--space-lg)' : 'var(--space-2xl)',
        ...style
      }}
    >
      <Lottie
        animationData={textMessagesAnimation}
        loop={true}
        autoplay={true}
        style={{
          width: isMobile ? '100%' : '600px',
          maxWidth: '100%',
          height: 'auto'
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
}