import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  icon: Icon,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader2 className="spinner" size={18} />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
