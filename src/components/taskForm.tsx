import React, { useState } from 'react';
import { ReactElement } from 'react';
import '../App.css';
import { useDispatch } from 'react-redux';
import { addTask } from './store/TodoSlice';



type FormProps = {
    onAddTask: (taskTitle: string, taskDescription: string, taskPriority: number) => void; 
};

export function TaskForm(props: FormProps): ReactElement { // принимаем пропс
    const dispatch = useDispatch();
    const { onAddTask } = props; 
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [prior, setPrior] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value); 
        setError(null);

    };

  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
        if (isValid()) {
            onAddTask(task, description, prior !== null ? prior : 0); 
            setTask('');
            setDescription('');
            setPrior(null);
    }
}

 
    const isValid = () => { 
        if (!task.trim()) { 
            setError('Необходимо заполнить данное поле');
            return false;
        }
        if (task.length < 2) {
            setError('Должно быть не менее двух символов');
            return false;
        }
        setError(null);
        return true;
    };


    return (
        <form className="back" onSubmit={handleSubmit} noValidate>
            <div className="downSpan">
            <input 
                className={`input ${error ? "form__input_type_error" : ""}`} 
                id="task-input" 
                type="text" 
                placeholder="Ваш текст задачи..." 
                value={task} 
                onChange={handleChange} 
                required 
            />
            
 
            <div className="form__input-error task-input-error">{error}</div> 
            </div>
            <div>
            <h2 className="priorityTwo">Определите цветом приоритет задачи</h2>
                <button className="buttonOne" type="button" onClick={() => setPrior(0)}></button>
                <button className="buttonTwo" type="button" onClick={() => setPrior(1)}></button>
                <button className="buttonThree" type="button" onClick={() => setPrior(2)}></button>
                <button className="buttonFour" type="button" onClick={() => setPrior(3)}></button>
            </div>
            <textarea 
                className="description" 
                id="desc" 
                placeholder="Описание задачи..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button className="button" type="submit" id="submit">Создать</button>
        </form>
    );
}
 