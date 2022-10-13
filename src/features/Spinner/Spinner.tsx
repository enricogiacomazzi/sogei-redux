import React from "react";
import { useAppSelector } from "../../app/hooks";
import css from './Spinner.module.css';

export const Spinner: React.FC = () => {

    const visible = useAppSelector(s => s.spinner.waitCount > 0);

    if(!visible) {
        return <></>
    }

    return (
        <div className={css.container}>
            <div>...</div>
        </div>
    );
}