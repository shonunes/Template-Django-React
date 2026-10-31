import { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState({ status: 'loading...' })

  useEffect(() => {
    fetch('/api/health/')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => setHealth({ status: 'error', details: err.message }))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem', maxWidth: '40rem', margin: '0 auto' }}>
      <h1>ShiftAppens Full-Stack Starter</h1>
      <p>React (Vite) + Django REST Framework + PostgreSQL</p>
      <pre style={{ background: '#1e1e1e', color: '#4af626', padding: '1rem', borderRadius: '1rem', overflowX: 'auto' }}>
        {JSON.stringify(health, null, 2)}
      </pre>
      <p>
        Explore <a href="http://localhost:8000/api/docs/" target="_blank" rel="noreferrer">Swagger API Docs (/api/docs)</a> or{' '}
        <a href="http://localhost:8000/admin/" target="_blank" rel="noreferrer">Django Admin (/admin)</a> (login: <code>admin</code> / <code>admin</code>).
      </p>
    </main>
  )
}
