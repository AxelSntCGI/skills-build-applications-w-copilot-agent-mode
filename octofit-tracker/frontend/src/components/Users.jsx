import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">The community</p><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div><div className="table-panel">{error ? <p className="error-message">{error}</p> : users.length === 0 ? <p className="empty-state">No users have joined yet.</p> : <div className="user-grid">{users.map((user) => <article className="user-card" key={user._id ?? user.id}><div className="avatar">{(user.name ?? user.username ?? '?').slice(0, 1).toUpperCase()}</div><div><strong>{user.name ?? user.username ?? 'Unknown user'}</strong><small>{user.email ?? user.role ?? 'Octofit member'}</small></div></article>)}</div>}</div></section>
}

export default Users