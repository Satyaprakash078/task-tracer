import { useState } from 'react';
import TaskFilter from './TaskFilter';
import { useTaskStore } from '../store/taskStore';
import TaskList from './TaskList';

function DeveloperTaskSection() {
  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    closeTask,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    activeTimer,
    startTimer,
    stopTimer,
  } = useTaskStore();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');
  const [date, setDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPriority('');
    setAssignee('');
    setDate('');
    setEditTaskId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTask = tasks.find((t) => t.id === editTaskId);

    const newTask = {
      id: editTaskId ?? Date.now(),
      title,
      desc,
      priority,
      assignee,
      date,
      status: 'open',
      timeSpent: editTaskId ? existingTask?.timeSpent || 0 : 0,
      timeLogs: editTaskId ? existingTask?.timeLogs || [] : [],
    };

    if (editTaskId) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }

    resetForm();
    setFilterPriority('');
    setFilterStatus('');
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleClose = (id) => {
    closeTask(id);
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTitle(task.title);
      setDesc(task.desc);
      setPriority(task.priority);
      setAssignee(task.assignee);
      setDate(task.date);
      setEditTaskId(task.id);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterPriority === '' || task.priority === filterPriority) &&
      (filterStatus === '' || task.status === filterStatus)
    );
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Tasks/Bugs</h2>

      {/* Task Creation Form */}
      <div className="bg-gray-100 p-4 rounded space-y-3">
        <h3 className="text-lg font-semibold">Create New Task/Bug</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className={`${editTaskId ? 'bg-green-600' : 'bg-blue-500'} text-white px-4 py-2 rounded`}
            >
              {editTaskId ? 'Update Task' : 'Create Task'}
            </button>
            {editTaskId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter Part */}
      <TaskFilter
        filterPriority={filterPriority}
        filterStatus={filterStatus}
        setFilterPriority={setFilterPriority}
        setFilterStatus={setFilterStatus}
      />

      {/* Task List */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Task List</h3>
             <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleClose}
                activeTimer={activeTimer}
                onStartTimer={startTimer}
                onStopTimer={stopTimer}
              />
      </div>
    </div>
  );
}

export default DeveloperTaskSection;
