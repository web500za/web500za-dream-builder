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

  return (
    <Input
      type="text"
      placeholder={`What should I build for you${dots}`}
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
