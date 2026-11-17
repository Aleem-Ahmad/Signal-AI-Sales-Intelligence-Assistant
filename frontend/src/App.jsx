import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import AnalysisDetail from './pages/AnalysisDetail';
import { initShery, initMagnets, initCardAnimations } from './utils/sheryAnimations';

const AnimationObserver = () => {
  const location = useLocation();

  useEffect(() => {
    initShery();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      initMagnets();
      initCardAnimations();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimationObserver />
      <div className="app-layout">
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<AnalysisDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
