import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Campus Find — Lost & Found Administrative Resolution Portal.
        </p>
        <p className="footer-text">
          Submissions are securely stored for campus administration review. No public listings are generated.
        </p>
      </div>
    </footer>
  );
}
