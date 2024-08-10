import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
