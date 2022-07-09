import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawState {
    count: number;
    error: string;
    isDrawLine: boolean;
    isDrawPLine: boolean;
}

const initialState: DrawState = {
    count: 0,
    error: '',
    isDrawLine: false,
    isDrawPLine: false
}

export const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        toggleDrawLine(state, action: PayloadAction<boolean>){
            state.isDrawLine = action.payload
        },
        toggleDrawPLine(state, action: PayloadAction<boolean>){
            state.isDrawPLine = action.payload
        }
    }
})

const {actions, reducer} = drawingSlice;
export const { toggleDrawLine, toggleDrawPLine } = actions;
export default reducer;
