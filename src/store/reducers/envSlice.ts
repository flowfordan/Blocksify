import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    toggleColor: boolean;
    color: number;
}

const initialState: SidebarState = {
    toggleColor: false,
    color: 0xffffff,
}

export const envSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
        changeCubeColor(state, action: PayloadAction<number>){
            state.color = action.payload
        }
    }
})


export default envSlice.reducer;