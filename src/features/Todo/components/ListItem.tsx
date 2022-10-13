import React from "react";
import { TodoModel } from "../models/todo.model";
import classNames from "classnames";
import { css, cx } from "@emotion/css";



interface ListItemProps {
    item: TodoModel,
    toggleComplete: () => void;
    deleteTodo: () => void;
}


export const ListItem:React.FC<ListItemProps> = ({item, toggleComplete, deleteTodo}) => {
    const competedIconCls = classNames('fa', {
        'fa-times': item.completed,
        'fa-check': !item.completed
    });

    // const spanStyle = item.completed ? {textDecoration: 'line-through'} : undefined;

    const spanStyle = css`
        text-decoration: ${item?.completed ? 'line-through' : undefined}
    `



    // const delTodo = () => {
    //     dispach(deleteTodo(item.id));
    // }

    return (
        <li>
            <span className={spanStyle}>{item?.label}</span>
            <button onClick={toggleComplete}><i className={competedIconCls}/></button>
            <button onClick={deleteTodo}><i className="fa fa-trash"/></button>
        </li>
    )
}