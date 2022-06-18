import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './reducers/SidebarSlice';
import envReducer from './reducers/envSlice';



const rootReducer = combineReducers({
    sidebarReducer, envReducer
})


const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export {setupStore}