import React from 'react';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppPage, StartPage, TestPage } from 'pages';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Routes>
          <Route path="/" element={<AppPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
