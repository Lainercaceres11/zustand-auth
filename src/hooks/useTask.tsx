import { DragEvent, useState } from "react";
import { useTaskStore } from "../stores/task/task.stores";
import { TaskStatus } from "../interfaces/Task";
import Swal from "sweetalert2";

interface Options {
  status: TaskStatus;
}

const useTask = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.dragginTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTaskStore);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleTask = async () => {
    const { isConfirmed, value: valueTask } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe existir un valor";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(valueTask, status);
  };

  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTaskDrop(status);
  };

  return {
    handleDragEvent,
    handleDragLeave,
    handleDrop,
    isDragging,
    onDragOver,
    handleTask,
  };
};

export default useTask;
