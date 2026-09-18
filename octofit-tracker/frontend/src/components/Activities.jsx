import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const ACTIVITIES_ENDPOINT = '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(ACTIVITIES_ENDPOINT).then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <ResourceTable title="Activity log" eyebrow="Movement, measured" resource="activities" rows={activities} error={error} columns={['name', 'type', 'duration', 'calories']} />
}

function ResourceTable({ title, eyebrow, resource, rows, error, columns }) {
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="count-badge">{rows.length} records</span></div><div className="table-panel">{error ? <p className="error-message">{error}</p> : rows.length === 0 ? <p className="empty-state">No {resource} have been logged yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row._id ?? row.id}>{columns.map((column) => <td key={column}>{String(row[column] ?? '—')}</td>)}</tr>)}</tbody></table></div>}</div></section>
}

export default Activities