import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  onSubmit?: () => void;
  placeholder?: string;
}

export function AnimatedInput({ value, onChange, className, onSubmit, placeholder }: AnimatedInputProps) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  const dots = '.'.repeat(dotCount);
  const spaces = '\u00A0'.repeat(3 - dotCount); // Non-breaking spaces to maintain width

  const defaultPlaceholder = `Let me build something for you${dots}${spaces}`;
  
  return (
    <Textarea
      placeholder={placeholder || defaultPlaceholder}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      rows={6}
      className={cn(
        "placeholder:opacity-70 placeholder:transition-opacity placeholder:duration-300 resize-none leading-relaxed",
        className
      )}
    />
  );
}
