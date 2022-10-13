import { createSlice } from "@reduxjs/toolkit";


interface spinnerState {
    waitCount: number;
}



const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {waitCount: 0} as spinnerState,
    reducers: {
        show: state => {
            state.waitCount++;
        },
        hide: state => {
            state.waitCount--;
        },
        reset: state => {
            state.waitCount = 0;
        }
    }
});

export const {show, hide, reset} = spinnerSlice.actions;
export default spinnerSlice.reducer;