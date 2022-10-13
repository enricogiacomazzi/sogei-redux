import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {sub, add, myCounterValueSelector} from './my-counter.slice';


export const MyCounter: React.FC = () => {
    const value: number = useAppSelector(myCounterValueSelector);
    const dispatch = useAppDispatch();

    return (
        <>
            <h1>{value}</h1>
            <button onClick={() => dispatch(sub())}>-</button>
            <button onClick={() => dispatch(add())}>+</button>
        </>
    )
}