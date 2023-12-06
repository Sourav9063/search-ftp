import { useEffect, useState } from "react";

export function useOnScreen({ ref, rootMargin = "0px" }) {
  // State and setter for storing whether element is visible

  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const refCur = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      {
        refCur && observer.unobserve(refCur);
      }
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
