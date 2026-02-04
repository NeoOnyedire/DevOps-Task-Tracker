import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/tasks";

const statusColors = {
  TODO: "#64748b",
  IN_PROGRESS: "#f59e0b",
  DONE: "#22c55e",
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  const loadTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    if (!title) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, assignee }),
    });

    setTitle("");
    setAssignee("");
    loadTasks();
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_URL}/${id}/status/${newStatus}`, {
      method: "PUT",
    });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const grouped = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 40 }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        DevOps Task Tracker
      </h1>

      <div
        style={{
          maxWidth: 700,
          margin: "0 auto 40px",
          background: "white",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Create Task</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          <input
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
          <button
            onClick={createTask}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {Object.entries(grouped).map(([status, list]) => (
          <div
            key={status}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: 15 }}>
              {status.replace("_", " ")}
            </h3>

            {list.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: 15,
                  marginBottom: 10,
                  borderRadius: 8,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{task.title}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {task.assignee || "Unassigned"}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 6,
                      color: "white",
                      background: statusColors[task.status],
                    }}
                  >
                    {task.status}
                  </span>

                  <div>
                    {task.status !== "DONE" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            task.id,
                            task.status === "TODO"
                              ? "IN_PROGRESS"
                              : "DONE"
                          )
                        }
                        style={{
                          fontSize: 12,
                          padding: "6px 10px",
                          borderRadius: 6,
                          border: "none",
                          background: "#0f172a",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Move →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
