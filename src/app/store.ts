import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import myCounterReducer from '../features/myCounter/my-counter.slice';
import todoReducer from '../features/Todo/Todo.slice';
import spinnerReducer from '../features/Spinner/spinner.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    myCounter: myCounterReducer,
    todo: todoReducer,
    spinner: spinnerReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
