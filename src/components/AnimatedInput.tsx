
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSubmit?: () => void;
}

export function AnimatedInput({ value, onChange, className, onSubmit }: AnimatedInputProps) {
  const [placeholderText, setPlaceholderText] = useState("Tell me what you want me to build you");
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDots(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <Input
      type="text"
      placeholder={`${placeholderText}${showDots ? '...' : ''}`}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      className={cn(className)}
    />
  );
}
