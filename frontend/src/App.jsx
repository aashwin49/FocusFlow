import React, { useState, useEffect } from "react";
import ControlBar from "./components/ControlBar";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import Statistics from "./components/Statistics";
import TaskList from "./components/TaskList";
import Login from "./Login";
import API from "./api.js";

function App() {
  // 🔐 AUTH STATE
  const [token, setToken] = useState(localStorage.getItem("token"));

  // STATE
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    tags: "",
    starred: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  // 🔥 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ ONLY fetch if logged in
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 🔴 SHOW LOGIN IF NOT AUTHENTICATED
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // ADD TASK
  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      await API.post("/tasks", newTask);
      await fetchTasks();

      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        tags: "",
        starred: false,
      });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // DELETE TASK
  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${_id}`);
        await fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ARCHIVE
  const handleArchive = (id) => {
    const taskToArchive = tasks.find((task) => task._id === id);
    if (taskToArchive) {
      setArchivedTasks([
        ...archivedTasks,
        { ...taskToArchive, archivedAt: new Date().toISOString() },
      ]);
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const handleUnarchive = (id) => {
    const taskToUnarchive = archivedTasks.find((task) => task._id === id);
    if (taskToUnarchive) {
      const { archivedAt, ...task } = taskToUnarchive;
      setTasks([...tasks, task]);
      setArchivedTasks(
        archivedTasks.filter((task) => task._id !== id)
      );
    }
  };

  const handleToggleStar = (id) => {
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, starred: !task.starred } : task
      )
    );
  };

  // EDIT
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditForm({ ...task });
  };

  const handleSaveEdit = async () => {
    if (!editForm.title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    try {
      await API.put(`/tasks/${editingId}`, editForm);
      await fetchTasks();

      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // SORT
  const sortTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];

    switch (sortBy) {
      case "recent":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "dueDate":
        return sorted.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      case "starred":
        return sorted.sort(
          (a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0)
        );
      default:
        return sorted;
    }
  };

  const currentTasks = showArchived ? archivedTasks : tasks;

  const filteredTasks = sortTasks(
    currentTasks.filter((task) => {
      const matchesStatus =
        filterStatus === "all" || task.status === filterStatus;
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.tags &&
          task.tags.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStatus && matchesPriority && matchesSearch;
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔐 Logout */}
        <button
          onClick={handleLogout}
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>

        <ControlBar />

        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onAddTask={handleAddTask}
        />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showArchived={showArchived}
          setShowArchived={setShowArchived}
        />

        <Statistics tasks={tasks} />

        <TaskList
          tasks={filteredTasks}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          onEdit={handleEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
          onToggleStar={handleToggleStar}
          showArchived={showArchived}
        />
      </div>
    </div>
  );
}

export default App;