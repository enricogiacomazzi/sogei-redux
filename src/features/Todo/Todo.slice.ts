import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, addTodo as addRemoteTodo, editTodo as editRemoteTodo, deleteTodo as deleteRemoteTodo } from "../../api";
import { AppThunk } from "../../app/store";
import { hide, show } from "../Spinner/spinner.slice";
import { TodoModel } from "./models/todo.model";


interface TodoState {
    items: Array<TodoModel>,
    errorMessage?: string;
    showModal: boolean;
}

const INITIALSTATE: TodoState = {
    items: [],
    showModal: false
}

export const loadTodoAsync = createAsyncThunk('todo-list/loadTodo', async (_, thunkApi) => {
    thunkApi.dispatch(show());
    return getTodos().then(x => {
        thunkApi.dispatch(hide());
        return x;   
    }, x => {
        thunkApi.dispatch(hide());
        return x;
    });
});

const todoSlice = createSlice({
    name: 'todo-list',
    initialState: INITIALSTATE,
    reducers: {
        loadTodoSuccess: (state, {payload}: PayloadAction<Array<TodoModel>>) => {
            state.items = payload;
        },
        loadTodoError: (state, {payload}: PayloadAction<string>) => {
            state.errorMessage = payload;
        },
        addTodoSuccess: (state, {payload}: PayloadAction<TodoModel>) => {
            state.items.push(payload);
        },
        addTodoError: (state, {payload}: PayloadAction<string>) => {
            state.errorMessage = payload;
        },
        editTodoSuccess: (state, {payload}: PayloadAction<TodoModel>) => {
            const index = state.items.findIndex(x => x.id === payload.id);
            state.items[index] = payload;
        },
        editTodoError: (state, {payload}: PayloadAction<string>) => {
            state.errorMessage = payload;
        },
        deleteTodoSuccess: (state, {payload: id}: PayloadAction<number>) => {
            const index = state.items.findIndex(x => x.id === id);
            state.items.splice(index, 1);
        },
        deleteTodoError: (state, {payload}: PayloadAction<string>) => {
            state.errorMessage = payload;
        },
        // showAddModal: (state) => {
        //     state.showModal = true;
        // },
        // hideAddModal: (state) => {
        //     state.showModal = false;
        // },
    },
    extraReducers: builder => {
        builder.addCase(loadTodoAsync.pending, state => {
            return state;
        })
        builder.addCase(loadTodoAsync.fulfilled, (state, {payload}: PayloadAction<Array<TodoModel>>) => {
            state.items = payload;
        });

        builder.addCase(loadTodoAsync.rejected, (state, e: PayloadAction<any>) => {
            state.errorMessage = e.payload.message;
        })
    }
        
});

export const {loadTodoSuccess, loadTodoError, addTodoSuccess, addTodoError} = todoSlice.actions;
export default todoSlice.reducer;


export const loadTodo = (): AppThunk => async (dispatch) => {
    dispatch(show());
    try {
        const todos = await getTodos();
        dispatch(loadTodoSuccess(todos));
    } catch (e) {
        dispatch(loadTodoError((e as Error).message));
    }
    finally {
        dispatch(hide());
    }
} 

export const addTodo = (todo: Omit<TodoModel, 'id'>): AppThunk => async (dispatch) => {
    try {
        const created = await addRemoteTodo(todo);
        dispatch(addTodoSuccess(created));
    } catch(e) {
        dispatch(addTodoError((e as Error).message));
    }
}

export const editTodo = (todo: TodoModel): AppThunk => async (dispatch) => {
    try {
        const edited = await editRemoteTodo(todo);
        dispatch(todoSlice.actions.editTodoSuccess(edited));
    } catch(e) {
        dispatch(todoSlice.actions.editTodoError((e as Error).message));
    }
}

export const deleteTodo = (todoId: number): AppThunk => async (dispatch) => {
    try {
        const edited = await deleteRemoteTodo({id: todoId});
        dispatch(todoSlice.actions.deleteTodoSuccess(todoId));
    } catch(e) {
        dispatch(todoSlice.actions.deleteTodoError((e as Error).message));
    }
}
 // hideAddModal
export const showAddModal = (): AppThunk => async (dispatch) => {
    const label = prompt("Add todo");
    if(label !== null) {
        dispatch(addTodo({label, completed: false}));
    }
}

