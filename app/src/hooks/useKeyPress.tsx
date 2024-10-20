import { useEffect } from 'react';

const useKeyPress = ( onKeyPress: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
        onKeyPress(event);
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      // Clean up by removing the event listener
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [ onKeyPress]);
};

export default useKeyPress;
