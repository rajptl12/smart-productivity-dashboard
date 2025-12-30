"use client";

import { useState } from "react";

/* MOCK DATA */
const tasksData = [
  { id: 1, name: "UI Design", status: "Completed", priority: "High" },
  { id: 2, name: "Dashboard Development", status: "In progress", priority: "Medium" },
  { id: 3, name: "Bug Fixing", status: "Pending", priority: "Low" },
  { id: 4, name: "Responsive Design", status: "Completed", priority: "Medium" },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const itemsPerPage = 3;

  /* METRICS */
  const total = tasksData.length;
  const completed = tasksData.filter(t => t.status === "Completed").length;
  const inProgress = tasksData.filter(t => t.status === "In progress").length;
  const pending = tasksData.filter(t => t.status === "Pending").length;

  /* FILTERING */
  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  /* SORTING */
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  /* PAGINATION */
  const paginatedTasks = sortedTasks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP NAVBAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workspace Overview</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Admin User</span>
          <div className="h-9 w-9 bg-slate-800 text-white rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total items" value={total} color="blue" />
        <StatCard title="Completed" value={completed} color="green" />
        <StatCard title="In progress" value={inProgress} color="yellow" />
        <StatCard title="Pending" value={pending} color="red" />
      </div>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <input
          placeholder="Search by task name"
          className="px-4 py-2 border rounded-md w-full lg:w-1/3"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="px-4 py-2 border rounded-md w-full lg:w-1/4"
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="px-4 py-2 border rounded-md w-full lg:w-1/4"
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th
                className="p-4 cursor-pointer"
                onClick={() => setSortBy("name")}
              >
                Task name
              </th>
              <th className="p-4">Current status</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => setSortBy("priority")}
              >
                Priority level
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No tasks match your criteria
                </td>
              </tr>
            ) : (
              paginatedTasks.map(task => (
                <tr
                  key={task.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{task.name}</td>
                  <td className="p-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="p-4">{task.priority}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-4 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="px-4 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    "In progress": "bg-yellow-100 text-yellow-700",
    Pending: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
