import { useEffect, useState } from "react";
import { getAllTasks, addTask, deleteTaskById } from "../services/api";

function Dashboard(props) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await getAllTasks(token);
      setTasks(res.data);
    } catch (err) {
      console.log("Error while fetching tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addNewTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await addTask({ title, description }, token);
      setTitle("");
      setDescription("");
      loadTasks();
    } catch (err) {
      console.log("Error while adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskById(id, token);
      loadTasks();
    } catch (err) {
      console.log("Error while deleting task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Tasks</h2>
      <button onClick={props.onLogout}>Logout</button>

      <form onSubmit={addNewTask} style={{ marginTop: "10px" }}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t._id}>
              {t.title} - {t.description}
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;