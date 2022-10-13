import React from "react";
import { useForm } from "react-hook-form";

interface AddTodoProps {
    addTodo: (label: string) => void
}

export const AddTodo:React.FC<AddTodoProps> = ({addTodo}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(({value}) => addTodo(value))}>
            <input type="text" {...register('value', {required: true})}/>
            <input type="submit" value="add"/>
        </form>
    )
}