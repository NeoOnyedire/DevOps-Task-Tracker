import api from '../api'

export default function TaskCard({ task, reload }) {
  const updateStatus = async (status) => {
    await api.put(`/tasks/${task.id}/status/${status}`)
    reload()
  }

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.assignee}</p>
      <p>{task.status}</p>
      <button onClick={() => updateStatus('TODO')}>TODO</button>
      <button onClick={() => updateStatus('IN_PROGRESS')}>DOING</button>
      <button onClick={() => updateStatus('DONE')}>DONE</button>
    </div>
  )
}
