import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TaskFormState {
    id: number;
    task: string;
    description: string;
    priority: number
};

interface TaskState {
    tasks: Task[],

}

const initialState: TaskState = {
    tasks: [],
    
};


export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Omit<Task, "id">>) {
            const newTask = { ...action.payload, id: Date.now()};
            state.tasks.push(newTask);
        },
        toggleTaskStatus(state, action:PayloadAction<number>) {
            const index = state.tasks.findIndex(Task => Task.id === action.payload);
            state.tasks[index].status = !state.tasks[index].status 
        },
        clearTasks(state) {
            state.tasks = [];
        },
        deleteTask(state, action:PayloadAction<number>) {
            state.tasks = state.tasks.filter(tasks => tasks.id != action.payload)
        },
        editTask(state, action:PayloadAction<{id: number, title: string}>) {
            const index = state.tasks.findIndex(Task => Task.id === action.payload.id);
            state.tasks[index].title=action.payload.title
        },
        setTasks(state, action:PayloadAction<Task[]>) {
            state.tasks = action.payload
        }
    },
});



export const {addTask, clearTasks, toggleTaskStatus, deleteTask, editTask, setTasks} = taskSlice.actions;
export default taskSlice.reducer