import React, { useEffect, useState } from "react";
import { getTodos } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add } from "../myCounter/my-counter.slice";
import { AddTodo } from "./components/AddTodo";
import { AddTodoModal } from "./components/AddTodoModal";
import { List } from "./components/List";
import { TodoModel } from "./models/todo.model";
import {deleteTodo, addTodo, loadTodo, loadTodoAsync, editTodo, showAddModal } from "./Todo.slice";



export const Todo: React.FC = () => {
    // const visible = useAppSelector(s => s.todo.showModal);
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

    const setVisible = (show: boolean) => {
        dispatch(showAddModal());
        // dispatch(show ? showAddModal() : hideAddModal());
    }


    const add = (txt: string) => {
        setVisible(false);
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
            <button onClick={() => setVisible(true)}>Add</button>
            <List items={items}
                toggleComplete={toggleComplete}
                deleteTodo={del} />
            {/* <AddTodoModal visible={visible} addTodo={add} cancel={() => setVisible(false)}/> */}
        </>
        
    );
}

