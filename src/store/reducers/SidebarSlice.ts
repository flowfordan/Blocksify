import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    count: number;
    error: string;
    isBtnActive: boolean
}

const initialState: SidebarState = {
    count: 0,
    error: '',
    isBtnActive: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        inc(state, action: PayloadAction<number>){
            state.count += action.payload
        },
        toggleActive(state, action: PayloadAction<boolean>){
            state.isBtnActive = action.payload
        }
    }
})


export default sidebarSlice.reducer;
