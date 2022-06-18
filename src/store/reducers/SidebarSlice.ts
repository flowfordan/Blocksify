import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    count: number;
    error: string;
}

const initialState: SidebarState = {
    count: 0,
    error: ''
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        inc(state, action: PayloadAction<number>){
            state.count += action.payload
        }
    }
})


export default sidebarSlice.reducer;
