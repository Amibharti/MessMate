import { useEffect, useState } from 'react'

function History() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const savedEntries = localStorage.getItem('messMateEntries')

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  return (
    <section>
      <h2>📅 Daily History</h2>

      {entries.length === 0 ? (
        <p>No saved entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.date}>
            <h3>{entry.date}</h3>
            <p>Total: ₹{entry.total}</p>
            <p>Items: {entry.items.join(', ')}</p>
          </div>
        ))
      )}
    </section>
  )
}

export default History