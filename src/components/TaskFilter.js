function TaskFilter({ filterPriority, filterStatus, setFilterPriority, setFilterStatus }) {
  return (
    <div className="flex gap-4">
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="pending_approval">Pending Approval</option>
      </select>
    </div>
  );
}

export default TaskFilter;
