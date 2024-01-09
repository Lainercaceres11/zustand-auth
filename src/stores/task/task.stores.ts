import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../interfaces/Task";
import { devtools, persist } from "zustand/middleware";

interface TaskState {
    dragginTaskId? : string
    tasks: Record<string, Task>,

    addTaskStore: (title: string, status: TaskStatus) => void,


    getTaskByStatus: (status: TaskStatus) => Task[],
    setDragginTaskId: (draggId: string) => void
    removingDragginTaskId: () => void,
    changeProgress: (taskId: string, status: TaskStatus) => void
    onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "task-1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "task-2", status: "in-progess" },
    "ABC-3": { id: "ABC-3", title: "task-3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "task-4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) =>{
    const tasks = get().tasks
    return Object.values(tasks).filter(task => task.status === status)
  },
  addTaskStore: (title: string, status: TaskStatus)=> {

    const newTask = {id: crypto.randomUUID(), title: title, status: status}
    set(state => ({
      tasks: {
        ...state.tasks, 
        [newTask.id]: newTask
      }
    }))
  },
  setDragginTaskId: (taskId: string)=>{
    set({dragginTaskId: taskId })
  },
  dragginTaskId: undefined,
  removingDragginTaskId: ()=>{
    set({dragginTaskId: undefined })
  },
  changeProgress: (taskId: string, status: TaskStatus)=> {
    const task = get().tasks[taskId]
    task.status = status

    set((state)=> ({
      tasks: {
        ...state.tasks,
        [taskId]: task
      }

    }))
  },
  onTaskDrop: (status: TaskStatus)=>{
    const taskId = get().dragginTaskId
    if(!taskId) return

    get().changeProgress(taskId, status)
    get().removingDragginTaskId()
  },

});

export const useTaskStore = create<TaskState>()(
  devtools(persist(storeApi, { name: "taskStorage-storage" }))
);