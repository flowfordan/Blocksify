import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import {AppPage} from '../../pages/AppPage/AppPage';
import {StartPage} from '../../pages/StartPage/StartPage';
import {Header} from '../Header/Header';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';


const App= (): JSX.Element => {
  return (
    <BrowserRouter>
    <Provider store={setupStore()}>
      <div className={styles.wrapper}>

     
          <Header />
        
          <Routes>
            <Route path='/*' element={<AppPage />} />
            <Route path='/start' element={<StartPage />} />
          </Routes>
       


      </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
