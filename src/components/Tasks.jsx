import React, { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getTasks()
      setTasks(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setError('')
      if (editingId) {
        await updateTask(editingId, { title, description, priority: priority.toLowerCase() })
        setEditingId(null)
      } else {
        await createTask({ title, description, priority: priority.toLowerCase(), completed: false })
      }
      setTitle('')
      setDescription('')
      setPriority('Medium')
      loadTasks()
    } catch (err) {
      setError(err.message || 'Failed to save task')
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id || task._id, { completed: !task.completed })
      loadTasks()
    } catch (err) {
      setError(err.message || 'Failed to update task status')
    }
  }

  const handleEdit = (task) => {
    setEditingId(task.id || task._id)
    setTitle(task.title)
    setDescription(task.description || '')
    setPriority(task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await deleteTask(id)
      loadTasks()
    } catch (err) {
      setError(err.message || 'Failed to delete task')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setDescription('')
    setPriority('Medium')
  }

  return (
    <div className="tasks-container">
      <h1 className="tasks-header-title">Task Manager</h1>
      <p className="tasks-header-subtitle">Manage your tasks using the React, Express and MongoDB backend.</p>

      {error && <div className="auth-error">{error}</div>}

      <div className="task-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="section-title">Your Tasks</h2>

      {loading ? (
        <div className="loading-spinner">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <p className="empty-state">No tasks found. Create your first task above!</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            const taskId = task.id || task._id
            return (
              <div key={taskId} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-card-content">
                  <h3 className="task-card-title">{task.title}</h3>
                  {task.description && <p className="task-card-description">{task.description}</p>}
                  <div className="task-meta">
                    <span className="meta-item">
                      Priority: <strong>{task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}</strong>
                    </span>
                    <span className="meta-item">
                      Status: <strong className={task.completed ? 'status-done' : 'status-pending'}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="task-card-actions">
                  <button
                    className="btn-action btn-complete"
                    onClick={() => handleToggleComplete(task)}
                  >
                    {task.completed ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(taskId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Tasks
