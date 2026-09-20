import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowLeft } from 'lucide-react';

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract message and submission type from router state
  const message = location.state?.message || 'Submission completed successfully.';
  const isFound = location.state?.type === 'found';

  return (
    <div className="card success-card">
      <div className="success-icon-badge">
        <CheckCircle2 size={40} />
      </div>

      <h1 className="success-title">Submission Confirmed</h1>

      <div className="success-message">
        {message}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={18} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
