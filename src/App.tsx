import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UniversitiesPage from './pages/UniversitiesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UniversitiesPage />} />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
};

export default App;