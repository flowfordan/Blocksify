import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import {AppPage} from '../../pages/AppPage/AppPage';
import {StartPage} from '../../pages/StartPage/StartPage';
import {Header} from '../Header/Header';

const App= (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>

     
          <Header />
        
          <Routes>
            <Route path='/*' element={<AppPage />} />
            <Route path='/start' element={<StartPage />} />
          </Routes>
       


      </div>
    </BrowserRouter>
  );
}

export default App;
