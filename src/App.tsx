import React, { ReactNode, useEffect, useState} from 'react';
import './App.css';
import {TaskForm} from "./components/taskForm.tsx";
import {TaskList} from "./components/taskList.tsx";
import {TaskBye} from "./components/TaskBye.tsx";
import Modal from "./components/Modal/Modal.tsx"
import Confirm from './components/Modal/confirmation.tsx';
import {Task} from "./types"
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './components/store/index.ts';
import { addTask, deleteTask, setTasks, toggleTaskStatus } from './components/store/TodoSlice.ts';

export default function App( ) {
const [isModalOpen, setIsModalOpen] = useState(false);
const [taskId, setTaskId] = useState<number | null>(null);
const key = 'myTasks';

const openModal = (id: number) => {
  setTaskId(id);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setTaskId(null);
};

const dispatch = useAppDispatch();
const tasks = useAppSelector(state => state.task.tasks)



const addTaskHandler = (taskTitle: string, taskDescription: string, taskPriority: number) => {
  if (taskTitle) {
    const newTask: Task = { title: taskTitle, status: false, description: taskDescription, priority: taskPriority, id: Date.now ()};

    dispatch(addTask(newTask))
}
}

const toggleTaskStatusHandler = (id: number) => {
  dispatch(toggleTaskStatus(id))
};

const deleteTaskHandler = (id: number) => {
  dispatch(deleteTask(id))
};

useEffect(() => { 
  if (tasks.length) {
  const item = JSON.stringify(tasks);
  localStorage.setItem(key, item);
  console.log(item);
}
}, [tasks]) 


useEffect(() => {
  try {
      const item = localStorage.getItem(key); 
      if (item) {
        dispatch(setTasks(JSON.parse(item)))
    } 
  } catch (error) {
    console.error("Ошибка", error);
}; 
}, []); 

  return (
  <>
    <div className="App">
<TaskForm onAddTask={addTaskHandler}/> 
<TaskList list={tasks} onToggleCheck={toggleTaskStatusHandler} onDeleteTask={openModal}/>
<TaskBye/>
    </div>
    <div>
   <Modal isOpen={isModalOpen} onClose={closeModal}>
    {isModalOpen && taskId !== null && <Confirm deleteTask={deleteTaskHandler} taskId={taskId} onClose={closeModal}/>}
   </Modal>
 </div>
   </>
  );
}
