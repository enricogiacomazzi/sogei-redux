import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { TodoModel } from "../models/todo.model";
import { ListItem } from "./ListItem";


interface ListProps {
    items: Array<TodoModel>
    toggleComplete: (item: TodoModel) => void;
    deleteTodo: (item: TodoModel) => void;
}


export const List:React.FC<ListProps> = ({items, toggleComplete, deleteTodo}) => {

    return (
        <ul>
            {items.map(t => <ListItem key={t.id} 
                                item={t}
                                toggleComplete={() =>toggleComplete(t)}
                                deleteTodo={() => deleteTodo(t)}
                            />)}
        </ul>
    )
}