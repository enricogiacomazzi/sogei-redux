import React, { useEffect } from "react";
import { getTodos } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add } from "../myCounter/my-counter.slice";
import { AddTodo } from "./components/AddTodo";
import { List } from "./components/List";
import { TodoModel } from "./models/todo.model";
import {deleteTodo, addTodo, loadTodo, loadTodoAsync, editTodo } from "./Todo.slice";



export const Todo: React.FC = () => {
    const items = useAppSelector(s => s.todo.items);
    const error = useAppSelector(s => s.todo.errorMessage);
    const dispatch = useAppDispatch();


    useEffect(() => {
        console.log('start');
        // dispatch(loadTodo());
        dispatch(loadTodoAsync()).then(() => {
            console.log('stop');
        });
    }, []);


    const add = (txt: string) => {
        dispatch(addTodo({label: txt, completed: false}));
    }


    const toggleComplete = (item: TodoModel) => {
        dispatch(editTodo({...item, completed: !item.completed})); 
    }

    const del = (item: TodoModel) => {
        dispatch(deleteTodo(item.id));
    }

    return (
        <>
            <AddTodo addTodo={add}/>
            <List items={items}
                toggleComplete={toggleComplete}
                deleteTodo={del} />
            {error && <h3>{error}</h3>}
        </>
        
    );
}

