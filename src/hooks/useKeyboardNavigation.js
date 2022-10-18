import { useEffect } from 'react';
import { navigate } from 'gatsby';

export const useKeyboardNavigation = (previousLink, nextLink) => {
  useEffect(() => {
    const keyboardHandler = (event) => {
      if (event.key === 'ArrowRight' && nextLink) {
        navigate(nextLink);
      }
      if (event.key === 'ArrowLeft' && previousLink) {
        navigate(previousLink);
      }
    };
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [previousLink, nextLink]);
};
