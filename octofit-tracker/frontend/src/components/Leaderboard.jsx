import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const LEADERBOARD_ENDPOINT = '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(LEADERBOARD_ENDPOINT).then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">The weekly race</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} athletes</span></div><div className="rank-list">{error ? <p className="error-message">{error}</p> : entries.length === 0 ? <p className="empty-state">The leaderboard is waiting for its first result.</p> : entries.map((entry, index) => <article className="rank-row" key={entry._id ?? entry.id}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{entry.name ?? entry.username ?? entry.user ?? 'Unnamed athlete'}</strong><small>{entry.team ?? 'Independent'}</small></div><b>{entry.points ?? entry.score ?? 0} pts</b></article>)}</div></section>
}

export default Leaderboard