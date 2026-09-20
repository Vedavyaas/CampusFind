import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-link" aria-label="Campus Find Home">
          <div className="brand-logo-icon">
            <Search size={20} />
          </div>
          <span>Campus Find</span>
        </Link>
        <div className="privacy-badge">
          <ShieldCheck size={14} />
          <span>Privacy-First Portal</span>
        </div>
      </div>
    </header>
  );
}
