'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [online, setOnline] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadStatus = async () => {
    const res = await fetch('/api/admin-status')
    const data = await res.json()
    setOnline(data.online)
    setLoading(false)
  }

  const toggleStatus = async () => {
    await fetch('/api/admin-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        online: !online
      })
    })

    loadStatus()
  }

  useEffect(() => {
    loadStatus()
  }, [])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          background: '#1d1d1d',
          padding: '50px',
          borderRadius: '20px',
          textAlign: 'center',
          width: '420px',
        }}
      >
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>
          Admin Live Status
        </h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div
              style={{
                fontSize: '26px',
                marginBottom: '30px',
              }}
            >
              {online ? '🟢 EN LIGNE' : '🔴 HORS LIGNE'}
            </div>

            <button
              onClick={toggleStatus}
              style={{
                padding: '16px 24px',
                border: 'none',
                borderRadius: '12px',
                background: online ? '#ff4d4d' : '#22c55e',
                color: 'white',
                fontWeight: 700,
                cursor: 'pointer',
                width: '100%',
                fontSize: '18px',
              }}
            >
              {online
                ? 'Passer Hors Ligne'
                : 'Passer En Ligne'}
            </button>
          </>
        )}
      </div>
    </main>
  )
}