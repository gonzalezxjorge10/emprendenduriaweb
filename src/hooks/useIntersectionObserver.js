import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = { threshold: 0.15 }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [options]);

  return observerRef;
};