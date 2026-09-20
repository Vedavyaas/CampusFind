import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, X, RefreshCw, CheckCircle, AlertCircle, FileImage } from 'lucide-react';

export function FileUpload({
  id,
  label,
  file,
  onChange,
  onRemove,
  error,
  required = false,
  accept = 'image/*',
  helpText = 'PNG, JPG, JPEG up to 5MB',
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate and manage thumbnail object URL
  useEffect(() => {
    if (file && file instanceof File && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleBoxClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    if (e) e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
    onRemove();
  };

  // Helper to format bytes into readable size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="form-group">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className="form-label" htmlFor={id}>
          {label}
          {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
        {file && (
          <span className="file-status-badge">
            <CheckCircle size={12} />
            <span>Image Selected</span>
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />

      {!file ? (
        <div
          className={`file-upload-box ${error ? 'has-error' : ''}`}
          onClick={handleBoxClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBoxClick();
            }
          }}
        >
          <UploadCloud className="file-upload-icon" size={32} />
          <p className="file-upload-label">
            Click to select or drag image file
          </p>
          <p className="file-upload-hint">{helpText}</p>
        </div>
      ) : (
        <div className="file-preview-card">
          <div className="file-preview-content">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected preview"
                className="file-preview-thumbnail"
              />
            ) : (
              <div className="file-preview-icon-placeholder">
                <FileImage size={24} color="#2563eb" />
              </div>
            )}
            
            <div className="file-preview-details">
              <span className="file-preview-filename" title={file.name}>
                {file.name}
              </span>
              <span className="file-preview-size">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>

          <div className="file-preview-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleBoxClick}
              disabled={disabled}
            >
              <RefreshCw size={14} />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              className="btn btn-danger-link btn-sm"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X size={14} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div id={`${id}-error`} className="error-text" role="alert" style={{ marginTop: '0.35rem' }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
