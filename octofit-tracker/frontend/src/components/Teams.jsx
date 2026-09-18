import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <CollectionView title="Teams" eyebrow="Find your pace" resource="teams" rows={teams} error={error} detail={(team) => `${team.members?.length ?? team.memberCount ?? 0} members`} />
}

function CollectionView({ title, eyebrow, resource, rows, error, detail }) {
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="count-badge">{rows.length} total</span></div>{error ? <p className="error-message">{error}</p> : rows.length === 0 ? <p className="empty-state">No {resource} have been created yet.</p> : <div className="collection-grid">{rows.map((row, index) => <article className="collection-card" key={row._id ?? row.id}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h2>{row.name ?? row.title ?? 'Untitled'}</h2><p>{row.description ?? detail(row)}</p></article>)}</div>}</section>
}

export default Teams