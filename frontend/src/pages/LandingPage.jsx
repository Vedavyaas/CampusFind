import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PackageCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Campus Lost &amp; Found Portal</h1>
        <p className="hero-subtitle">
          Official campus reporting system. Submit your lost report or found query securely for administrative resolution.
        </p>
      </section>

      {/* Primary Actions Grid */}
      <div className="action-cards-grid">
        {/* Action 1: I Lost an Item */}
        <Link to="/report-lost" className="action-card action-card-lost">
          <div>
            <div className="card-icon-wrapper">
              <Search size={32} />
            </div>
            <h2 className="action-card-title">I Lost an Item</h2>
            <p className="action-card-desc">
              Submit details about an item you lost on campus so administrators can correlate incoming queries.
            </p>
          </div>
          <div className="btn btn-primary btn-full">
            <span>I Lost an Item</span>
            <ArrowRight size={18} />
          </div>
        </Link>

        {/* Action 2: I Found an Item */}
        <Link to="/report-found" className="action-card action-card-found">
          <div>
            <div className="card-icon-wrapper">
              <PackageCheck size={32} />
            </div>
            <h2 className="action-card-title">I Found an Item</h2>
            <p className="action-card-desc">
              Submit a query describing an item you found and obtain instructions to hand it over to administration.
            </p>
          </div>
          <div className="btn btn-primary btn-full">
            <span>I Found an Item</span>
            <ArrowRight size={18} />
          </div>
        </Link>
      </div>

      {/* Privacy Notice Card */}
      <div className="privacy-notice-box">
        <ShieldCheck size={28} color="#059669" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
        <div>
          <h3 className="privacy-notice-title">Privacy-First Operational Model</h3>
          <p className="privacy-notice-text">
            Campus Find is a confidential reporting portal. To protect student privacy and prevent fraudulent claims, reports are not publicly browsable or searchable. All submissions are stored securely and accessible only to authorized campus administrators.
          </p>
        </div>
      </div>
    </div>
  );
}
