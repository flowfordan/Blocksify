import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Coords = {
    x: number,
    y: number,
    z: number
}

interface UIState {
    color: number;
    fetchGlobalCoords: boolean;
    globalCoords: Coords
}

const initialState: UIState = {
    color: 0xffffff,
    fetchGlobalCoords: true,
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
        updateCoords(state, action: PayloadAction<Coords>){
            state.globalCoords = action.payload
        }
    }
})


const {actions, reducer} = uiSlice
export const { changeCubeColor, updateCoords } = actions
export default reducer

