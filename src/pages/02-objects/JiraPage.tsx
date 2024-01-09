import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/task/task.stores';

export const JiraPage = () => {
  const doneTask = useTaskStore(state => state.getTaskByStatus("done"))
  const pendingTask = useTaskStore(state => state.getTaskByStatus("open"))
  const inProgressTask = useTaskStore(state => state.getTaskByStatus("in-progess"))
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks task={pendingTask} title='Pendientes' status='open' />
          
          <JiraTasks task={inProgressTask} title='Avanzando' status='in-progess' />
          
          <JiraTasks task={doneTask} title='Terminadas' status='done' />

      </div>

      



    </>
  );
};