import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces/Task";
import { useTaskStore } from "../../stores/task/task.stores";

interface Props {
  task: Task;
}
const SingleTask = ({ task }: Props) => {
  const setDragginTaskId = useTaskStore(state => state.setDragginTaskId)
  const removingDragginTaskId = useTaskStore(state => state.removingDragginTaskId)
  return (
    <div
      draggable
      onDragStart={() => setDragginTaskId(task.id)}
      onDragEnd={removingDragginTaskId}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}1</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};

export default SingleTask;
