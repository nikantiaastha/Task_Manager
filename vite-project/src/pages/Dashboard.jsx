import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study'); // Default Category
  const token = localStorage.getItem('token');

  const fetchContent = async () => {
    try {
      const resTasks = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: token } });
      setTasks(resTasks.data);
      const resStats = await axios.get('http://localhost:5000/api/tasks/stats/category', { headers: { Authorization: token } });
      setStats(resStats.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchContent(); }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { title, category }, { headers: { Authorization: token } });
    setTitle('');
    fetchContent(); // Refresh list and stats
  };

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <h2>➕ Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Study">Study</option>
          <option value="Sports">Sports</option>
          <option value="Leisure">Leisure</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <hr />
      <h2>📊 Task Analytics (Stage 2)</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {stats.length > 0 ? stats.map(s => (
          <div key={s._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            {s._id}: <strong>{s.count}</strong>
          </div>
        )) : <p>No tasks created yet!</p>}
      </div>

      <h2>📝 My Tasks</h2>
      <ul>
        {tasks.map(t => <li key={t._id}>{t.title} - <strong>{t.category}</strong></li>)}
      </ul>
    </div>
  );
};

export default Dashboard;