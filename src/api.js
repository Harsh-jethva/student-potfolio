const BASE_URL = 'http://localhost:3000/api'

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

export function removeToken() {
  localStorage.removeItem('token')
}

function getAuthHeaders() {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

/**
 * Register user
 * POST /api/auth/register
 */
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name || 'User', email, password })
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error?.message || data.message || 'Registration failed')
  }

  if (data.token) {
    setToken(data.token)
  }

  return data
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error?.message || data.message || 'Login failed')
  }

  if (data.token) {
    setToken(data.token)
  }

  return data
}

/**
 * Get current user profile
 * GET /api/auth/me
 */
export async function getCurrentUser() {
  const token = getToken()
  if (!token) return null

  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    })

    if (!res.ok) {
      if (res.status === 401) {
        removeToken()
      }
      return null
    }

    const data = await res.json()
    return data.user
  } catch (err) {
    return null
  }
}

/**
 * Get all tasks
 * GET /api/tasks
 */
export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders()
  })

  if (res.status === 401) {
    removeToken()
    throw new Error('Authentication required. Please login.')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error?.message || 'Failed to fetch tasks')
  }

  const data = await res.json()
  return data.tasks || []
}

/**
 * Create a new task
 * POST /api/tasks
 */
export async function createTask(taskData) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  })

  if (res.status === 401) {
    removeToken()
    throw new Error('Authentication required. Please login.')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error?.message || 'Failed to create task')
  }

  return data.task
}

/**
 * Update an existing task
 * PUT /api/tasks/:id
 */
export async function updateTask(id, taskData) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  })

  if (res.status === 401) {
    removeToken()
    throw new Error('Authentication required. Please login.')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error?.message || 'Failed to update task')
  }

  return data.task
}

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  if (res.status === 401) {
    removeToken()
    throw new Error('Authentication required. Please login.')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error?.message || 'Failed to delete task')
  }

  return data.task
}

export function logout() {
  removeToken()
}
