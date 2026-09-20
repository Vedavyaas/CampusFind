import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export function WhatHappensNext() {
  return (
    <div className="what-happens-next-panel">
      <div className="panel-header">
        <ShieldCheck size={18} color="#2563eb" />
        <h3>What happens after you submit?</h3>
      </div>
      <ol className="panel-steps">
        <li>
          <span className="step-num">1</span>
          <span>Your report is securely received into the administration queue.</span>
        </li>
        <li>
          <span className="step-num">2</span>
          <span>Authorized campus administrators review the submitted details.</span>
        </li>
        <li>
          <span className="step-num">3</span>
          <span>Potential matches are manually checked against active records.</span>
        </li>
        <li>
          <span className="step-num">4</span>
          <span>Administration contacts you directly if a match is identified.</span>
        </li>
      </ol>
    </div>
  );
}
