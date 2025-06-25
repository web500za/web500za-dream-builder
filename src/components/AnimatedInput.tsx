
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
  const [placeholderText] = useState("Tell me what you want me to build for you");
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4); // Cycles from 0 to 3, then back to 0
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  const dots = '.'.repeat(dotCount);

  return (
    <Input
      type="text"
      placeholder={`${placeholderText}${dots}`}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      className={cn(
        "placeholder:opacity-70 placeholder:transition-opacity placeholder:duration-300",
        className
      )}
    />
  );
}
