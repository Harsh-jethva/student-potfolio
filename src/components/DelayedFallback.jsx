import React, { useState, useEffect } from 'react';
import LoadingFallback from './LoadingFallback';

/**
 * DelayedFallback prevents layout flickering on fast networks.
 * If the lazy-loaded chunk resolves within `delay` ms (default 300ms),
 * no loading spinner is shown. Only slower loads display the fallback UI.
 */
export default function DelayedFallback({ delay = 300, message = 'Loading page...' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <LoadingFallback message={message} />;
}
