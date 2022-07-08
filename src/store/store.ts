import { combineReducers, configureStore } from "@reduxjs/toolkit";
import drawReducer from './reducers/drawingSlice';
import uiReducer from './reducers/uiSlice';
import logger from 'redux-logger'



const rootReducer = combineReducers({
    drawReducer, uiReducer
})


const setupStore = configureStore({
        reducer: rootReducer,
        //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
})



export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof setupStore
export type AppDispatch = AppStore['dispatch']

export {setupStore}