import React from 'react';
import { AddTodo } from './AddTodo';
import { css } from '@emotion/css';

interface AddTodoModalProps {
    visible: boolean,
    addTodo: (txt: string) => void
    cancel: () => void
}

export const AddTodoModal:React.FC<AddTodoModalProps> = ({visible, addTodo, cancel}) => {

    const clsContainer = css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #444;
        opacity: 0.7;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const clsBox = css`
        background-color: white;
        padding: 60px;
    `;

    return !visible ? <></> : (
        <div className={clsContainer}>
            <div className={clsBox}>
                <AddTodo addTodo={addTodo}/>
                <button onClick={cancel}>Annulla</button>
            </div>
        </div>
    ) 

}