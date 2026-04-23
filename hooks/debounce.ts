import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  delay: number = 500,
  onDebounce?: (value: T) => void,
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      onDebounce?.(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
