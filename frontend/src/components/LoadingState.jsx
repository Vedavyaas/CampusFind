import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Processing your submission...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        textAlign: 'center',
      }}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="spinner" size={36} color="#2563eb" style={{ marginBottom: '1rem' }} />
      <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '1rem' }}>{message}</p>
    </div>
  );
}
