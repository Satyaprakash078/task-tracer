import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';



function ManagerDashboard() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const loadTasks = useTaskStore((state) => state.loadTasks);


  useEffect(() => {
    loadTasks();
    const interval = setInterval(() => {
      loadTasks();
    }, 2000);
    return () => clearInterval(interval);
  }, [loadTasks]);

  const handleApprove = (id) => {
    updateStatus(id, 'approved');
  };

  const handleReject = (id) => {
    updateStatus(id, 'rejected');
  };

  const filteredTasks = tasks.filter(task => task.status === 'pending_approval');

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manager Dashboard</h2>

      <div>
        {filteredTasks.length === 0 ? (
          <p>No pending tasks for approval.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="border p-4 rounded mb-4 bg-white shadow space-y-2">
              <h3 className="text-lg "><strong>Task:</strong> {task.title}</h3>
              <p><strong>Description:</strong> {task.desc}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Due Date:</strong> {task.date}</p>
              <p><strong>Time Spent:</strong> {task.timeSpent} mins</p>
              <p className="text-sm text-gray-500"><strong>Created By:</strong> {task.createdBy || 'N/A'}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleApprove(task.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
