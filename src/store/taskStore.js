import { create } from 'zustand';

export const useTaskStore = create((set, get) => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filterPriority: '',
  filterStatus: '',
  activeTimer: null,
  timerStart: null,

  addTask: (task) => {
    const updated = [...get().tasks, task];
    set({ tasks: updated });
    localStorage.setItem('tasks', JSON.stringify(updated));
  },

  updateTask: (updatedTask) => {
    const updated = get().tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    set({ tasks: updated });
    localStorage.setItem('tasks', JSON.stringify(updated));
  },

  deleteTask: (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updated });
    localStorage.setItem('tasks', JSON.stringify(updated));
  },

  closeTask: (id) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, status: 'pending_approval' } : t
    );
    set({ tasks: updated });
    localStorage.setItem('tasks', JSON.stringify(updated));
  },

  updateStatus: (id, status) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    set({ tasks: updated });
    localStorage.setItem('tasks', JSON.stringify(updated));
  },

  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  startTimer: (taskId) => {
    set({ activeTimer: taskId, timerStart: Date.now() });
  },

  stopTimer: (taskId) => {
    const { timerStart, tasks } = get();
    if (!timerStart) return;

    const now = Date.now();
    const duration = Math.floor((now - timerStart) / 60000); // in minutes

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeSpent: (task.timeSpent || 0) + duration,
          timeLogs: [
            ...(task.timeLogs || []),
            {
              start: new Date(timerStart).toISOString(),
              end: new Date(now).toISOString(),
              duration,
            },
          ],
        };
      }
      return task;
    });

    set({ tasks: updatedTasks, activeTimer: null, timerStart: null });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  loadTasks: () => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    set({ tasks: stored });
  },
}));
