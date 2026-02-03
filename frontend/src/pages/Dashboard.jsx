import { useEffect, useState } from 'react'
import api from '../api'
import TaskCard from '../components/TaskCard'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')

  const loadTasks = async () => {
    const res = await api.get('/tasks')
    setTasks(res.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const createTask = async () => {
    await api.post('/tasks', {
      title,
      assignee,
      description: 'Created from UI'
    })
    setTitle('')
    setAssignee('')
    loadTasks()
  }

  return (
    <div>
      <h1>DevOps Task Tracker</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Assignee" value={assignee} onChange={e => setAssignee(e.target.value)} />
      <button onClick={createTask}>Add</button>
      {tasks.map(t => <TaskCard key={t.id} task={t} reload={loadTasks} />)}
    </div>
  )
}
