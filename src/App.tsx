import React from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppPage } from './pages/AppPage/AppPage';
import { StartPage } from './pages/StartPage/StartPage';


const App= (): JSX.Element => {
  console.log('ENV', process.env.NODE_ENV );
  return (
    <BrowserRouter>
      <div className='appWrapper'>
        <Routes>
          <Route path='/*' element={<AppPage />} />
          <Route path='/start' element={<StartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
