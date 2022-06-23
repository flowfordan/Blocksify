import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawState {
    count: number;
    error: string;
    isDrawLine: boolean
}

const initialState: DrawState = {
    count: 0,
    error: '',
    isDrawLine: false
}

export const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        inc(state, action: PayloadAction<number>){
            state.count += action.payload
        },
        toggleDrawLine(state, action: PayloadAction<boolean>){
            state.isDrawLine = action.payload
        }
    }
})


export default drawingSlice.reducer;
