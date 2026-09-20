import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LostReportPage } from './pages/LostReportPage';
import { FoundQueryPage } from './pages/FoundQueryPage';
import { SuccessPage } from './pages/SuccessPage';

export function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report-lost" element={<LostReportPage />} />
          <Route path="/report-found" element={<FoundQueryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
