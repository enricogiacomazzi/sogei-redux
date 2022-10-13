import { createAction, createReducer, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


export interface myCounterState {
    value: number;
}

const INITIALSTATE = {
    value: 12,
}


// export const add = createAction('add');
// export const sub = createAction('sub');


// export const myCounterReducer = createReducer<myCounterState>(INITIALSTATE, b => 
//     b.addCase(add, state => ({...state, value: state.value + 1}))
//     .addCase(sub, state => ({...state, value: state.value - 1}))
// )


const myCounterSlice = createSlice({
    name: 'myCounter',
    initialState: INITIALSTATE as myCounterState,
    reducers: {
        add: state => ({...state, value: state.value + 1}),
        sub: state => ({...state, value: state.value - 1})
    }
});

export const {add, sub} = myCounterSlice.actions;
export default myCounterSlice.reducer;

const selectSelf = (state: RootState) => state
export const myCounterValueSelector = createSelector(selectSelf, (state) => state.myCounter.value);