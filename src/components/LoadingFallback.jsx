import React from 'react';

export default function LoadingFallback({ message = 'Loading component...' }) {
  return (
    <div className="route-loading-container" role="status" aria-live="polite">
      <div className="route-spinner" aria-hidden="true"></div>
      <p className="route-loading-text">{message}</p>
    </div>
  );
}
