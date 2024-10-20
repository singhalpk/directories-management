import { useEffect, useRef } from 'react';

const useOutsideClick = (onOutsideClick: (event: MouseEvent) => void) => {
  const elementRef = useRef<HTMLButtonElement | HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        elementRef.current &&
        !elementRef.current.contains(target) &&
        !(target instanceof HTMLButtonElement) && // Exclude button clicks
        !(target instanceof SVGElement) // Exclude SVG clicks
      ) {
        onOutsideClick(event); // Call the function when a click outside is detected
      }
    };

    // Bind the event listener using the native event
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return elementRef;
};

export default useOutsideClick;
