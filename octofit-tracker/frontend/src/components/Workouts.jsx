import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">Built for today</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>{error ? <p className="error-message">{error}</p> : workouts.length === 0 ? <p className="empty-state">No workouts are available yet.</p> : <div className="collection-grid">{workouts.map((workout, index) => <article className="collection-card workout-card" key={workout._id ?? workout.id}><span className="card-index">{workout.level ?? String(index + 1).padStart(2, '0')}</span><h2>{workout.name ?? workout.title ?? 'Untitled workout'}</h2><p>{workout.description ?? `${workout.duration ?? 'Flexible'} minutes · ${workout.type ?? 'Training'}`}</p></article>)}</div>}</section>
}

export default Workouts