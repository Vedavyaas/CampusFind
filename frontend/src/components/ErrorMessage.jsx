import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="alert-box alert-danger" role="alert">
      <AlertTriangle className="alert-icon" size={20} />
      <div>
        <strong>Submission Failed</strong>
        <p style={{ marginTop: '0.25rem' }}>{message}</p>
      </div>
    </div>
  );
}
