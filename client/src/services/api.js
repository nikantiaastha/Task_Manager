const API_URL = "/api/tasks";

export async function getAllTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error while fetching tasks");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }}

export async function loginUser(data) {

  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Login error");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addTask(data) {
  try {
    const res = await fetch(API_URL, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Task not added");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteTaskById(id) {
  try {
    const res = await fetch(API_URL + "/" + id, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Delete failed");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }}
