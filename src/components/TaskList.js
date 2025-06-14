function TaskList({ tasks, onEdit, onDelete, onClose, activeTimer, onStartTimer, onStopTimer }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks match your filters.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="border p-4 rounded bg-white shadow flex flex-col">
          <div className="flex justify-between">
            <span className="font-semibold">Task: {task.title}</span>
            <span className="text-sm text-orange-500">Priority: {task.priority}</span>
          </div>
          <p className="text-md text-gray-800">Assigned to: {task.assignee}</p>
          <p className="text-sm text-gray-700">Description:{task.desc}</p>
          <p className="text-sm text-yellow-400">Due Date: {task.date}</p>
          <p className="text-sm text-green-600">Time Spent: {task.timeSpent} mins</p>
          <span className="text-xs mt-1 text-blue-500">
            Status: {task.status === 'pending_approval' ? 'Pending Approval' : task.status}
          </span>

          <div className="mt-2 flex justify-end gap-2 flex-wrap">
            <button onClick={() => onEdit(task.id)} className="text-sm px-2 py-1 bg-yellow-400 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(task.id)} className="text-sm px-2 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
            {task.status === 'open' && (
              <button onClick={() => onClose(task.id)} className="text-sm px-2 py-1 bg-blue-500 text-white rounded">
                Close
              </button>
            )}
            {activeTimer !== task.id ? (
              <button onClick={() => onStartTimer(task.id)} className="text-sm px-2 py-1 bg-green-500 text-white rounded">
                Start Timer
              </button>
            ) : (
              <button onClick={() => onStopTimer(task.id)} className="text-sm px-2 py-1 bg-gray-700 text-white rounded">
                Stop Timer
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
