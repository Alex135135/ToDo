import { ReactElement, useState } from "react";
import {registerUserApi} from "../../Api/userApi.ts"
import { useNavigate } from "react-router-dom";
import React from "react";
import deleteTask from "../../App"

interface ConfirmProps {
    deleteTask: (id: number) => void;
    taskId: number;
    onClose: () => void;
}

export default function Confirm (props: ConfirmProps): ReactElement {
    const {deleteTask, taskId, onClose} = props

 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteTask (taskId);
        onClose();
    };


    return (
        <form onSubmit={handleSubmit}>
            <p>Вы уверены что хотите удалить задачу?</p>
            <button type="submit" name= "YES">Да</button>
            <button type="submit" name= "NO" onClick={onClose}>Нет</button>
        </form>
    )
    }