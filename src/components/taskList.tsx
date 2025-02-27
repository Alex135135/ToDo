import React, { useState, ReactElement } from 'react';
import '../App.css';
import {Task} from "../types"
import checkmark from "../assets/17967003.png";
import checkmarkTwo from "../assets/Create.png";
import { useAppDispatch } from './store/index.ts';
import { editTask } from './store/TodoSlice.ts';


type ListProps = {
  list: Task[]; 
  onToggleCheck: (index: number) => void;
  onDeleteTask: (index: number) => void;
};

const getPriorityClass = (priority: number) => {
  switch (priority) {
    case 0:
      return 'priority-none'; 
    case 1:
      return 'priority-low'; 
    case 2:
      return 'priority-medium'; 
    case 3:
      return 'priority-high'; 
    default:
      return '';
  }
};

export const TaskList = (props: ListProps)  => {
  const {list, onToggleCheck, onDeleteTask} = props; 
const [editingTask, setEditingTask] = useState<Task | null>(null);
const [newTitle, setNewTitle] = useState ("");

const handleEditClick = (task) => {
  setEditingTask(task);
  setNewTitle(task.title)
}

const dispatch = useAppDispatch();

const handleSaveClick = () => {
  if(editingTask !== null) {
  dispatch(editTask({id: editingTask.id, title: newTitle}))
setEditingTask(null);
setNewTitle("")}
}

const handleCancelClick = () => {
  setEditingTask(null);
  setNewTitle("")
}

return (
  <div>
    <h1 className = "title" >Список задач:</h1>
    <ol className="task-list">

      {list.map((task ) => ( 
          <li key={task.id} className={`block ${getPriorityClass(task.priority)}`} >
            <input className="check"
              type="checkbox"
              checked={task.status}
              onChange={() => onToggleCheck(task.id)}/>
              {editingTask && editingTask.id === task.id ? (
              <div>
                <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={handleSaveClick}>Сохранить</button>
                <button onClick={handleCancelClick}>Отмена</button>
                </div>
              ) : (
              <span className = "priority" id="priority" 
              style={{ textDecoration: task.status ? 'line-through' : 'none' }}>{task.title}</span>)}
              <p className="desc">{task.description}</p>
              <button className="delete" type="button" id="submit" onClick={() => onDeleteTask(task.id)}> 
              <img src={checkmark} className="button-image" alt="Удалить"style={{ width: '20px', height: '20px'}}></img> </button>
    
              {!(editingTask && editingTask.id === task.id ) && <button className="buttonCreate" onClick={() => handleEditClick(task)}>
              <img src={checkmarkTwo} alt="Редактировать"style={{ width: '20px', height: '20px'}}></img>
                </button>}
            </li>
                ))}
            </ol>
  </div>
);
}
export default TaskList;