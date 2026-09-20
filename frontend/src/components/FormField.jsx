import React from 'react';
import { AlertCircle } from 'lucide-react';

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  rows = 3,
  helpText,
  disabled = false,
}) {
  const isSelect = type === 'select';
  const isTextarea = type === 'textarea';

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-star" aria-hidden="true">*</span>}
      </label>

      {isSelect ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        >
          <option value="">{placeholder || 'Select category...'}</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        />
      )}

      {helpText && !error && (
        <span className="file-upload-hint">{helpText}</span>
      )}

      {error && (
        <div id={`${id}-error`} className="error-text" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
