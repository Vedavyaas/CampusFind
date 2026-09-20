import React from 'react';
import { ChevronRight } from 'lucide-react';

export function FormSectionIndicator({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="form-steps-indicator" aria-label="Form section navigation">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <span className="step-pill">
            <span className="step-pill-number">{index + 1}</span>
            <span className="step-pill-text">{step}</span>
          </span>
          {index < steps.length - 1 && (
            <ChevronRight size={14} className="step-separator" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
