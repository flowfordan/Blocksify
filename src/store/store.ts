import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './reducers/drawingSlice';
import envReducer from './reducers/envSlice';
import logger from 'redux-logger'



const rootReducer = combineReducers({
    sidebarReducer, envReducer
})


const setupStore = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production'
})



export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof setupStore
export type AppDispatch = AppStore['dispatch']

export {setupStore}