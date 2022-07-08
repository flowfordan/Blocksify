import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Coords = {
    x: number,
    y: number,
    z: number
}

export interface UIState {
    color: number;
    isFetchingGlobalCoords: boolean;
    globalCoords: Coords
}

const initialState: UIState = {
    color: 0xffffff,
    isFetchingGlobalCoords: true,
    globalCoords: {
        x: 1,
        y: 1,
        z: 1
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeCubeColor(state, action: PayloadAction<number>){
            state.color = action.payload
        },
        toggleUpdCoords(state, action: PayloadAction<boolean>){
            state.isFetchingGlobalCoords = action.payload
        },
        updateCoords(state, action: PayloadAction<Coords>){
            state.globalCoords = action.payload
        }
    }
})


const {actions, reducer} = uiSlice;
export const { changeCubeColor, updateCoords, toggleUpdCoords } = actions;
export default reducer;

