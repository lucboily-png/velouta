'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isOnline, setIsOnline] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [showOfflineModal, setShowOfflineModal] = useState(false)

  const loadStatus = async () => {
    try {
      const res = await fetch('/api/admin-status')
      const data = await res.json()
      setIsOnline(data.online)
    } catch {
      setIsOnline(false)
    } finally {
      setLoadingStatus(false)
    }
  }

  useEffect(() => {
    loadStatus()
    const interval = setInterval(loadStatus, 8000)
    return () => clearInterval(interval)
  }, [])

  const checkout = async (price: string) => {
    await loadStatus()

    if (!isOnline) {
      setShowOfflineModal(true)
      return
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: price }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  const container = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 'clamp(20px, 4vw, 80px)',
  }

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', background: '#fff6f9' }}>

      {/* NAV */}
      <nav style={{ ...container, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/images/logo.png" style={{ height: 'clamp(50px, 6vw, 110px)' }} />

        <div style={{
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 999,
          background: isOnline ? '#e7f9ee' : '#fde7e7',
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: isOnline ? 'green' : 'red'
          }} />
          {loadingStatus ? '...' : isOnline ? 'En ligne' : 'Hors ligne'}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        ...container,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>

        <div>

          <p style={{ fontSize: 12, letterSpacing: 2, color: '#8b5e83' }}>
            CHAT PRIVÉ • CONFIDENTIEL
          </p>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 1.1,
            marginTop: 10,
            fontWeight: 700
          }}>
            Un espace simple<br />où tu peux parler
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 20px)',
            color: '#5a4f4f',
            lineHeight: 1.7,
            marginTop: 20
          }}>
            Une conversation humaine, calme, sans jugement.
          </p>

          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              marginTop: 25,
              padding: '14px 20px',
              width: '100%',
              maxWidth: 320,
              borderRadius: 14,
              background: '#8b5e83',
              color: 'white',
              fontWeight: 600,
              border: 'none'
            }}
          >
            Commencer
          </button>

        </div>

        {/* IMAGE */}
        <div style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          height: 'clamp(300px, 60vw, 600px)'
        }}>
          <img
            src="/images/2.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            background: 'rgba(255,255,255,0.9)',
            padding: '8px 12px',
            borderRadius: 12,
            fontSize: 12
          }}>
            {isOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
          </div>
        </div>

      </section>

      {/* EXPERIENCE */}
      <section style={{ ...container, textAlign: 'center' }}>

        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 44px)',
          fontFamily: 'serif'
        }}>
          Un moment pour toi
        </h2>

        <p style={{ color: '#666', marginTop: 10 }}>
          Sans pression. Sans jugement.
        </p>

        <div style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20
        }}>

          {[
            { t: 'Connexion', d: 'Conversation réelle' },
            { t: 'Discrétion', d: '100% privé' },
            { t: 'Présence', d: 'Écoute attentive' }
          ].map(i => (
            <div key={i.t} style={{
              padding: 20,
              borderRadius: 18,
              background: '#fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
              <h3>{i.t}</h3>
              <p style={{ fontSize: 13, color: '#666' }}>{i.d}</p>
            </div>
          ))}

        </div>

      </section>

      {/* PRICING */}
      <section id="pricing" style={container}>

        <h2 style={{ textAlign: 'center', fontSize: 'clamp(26px, 4vw, 48px)' }}>
          Choisis ton moment
        </h2>

        <div style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20
        }}>

          {[
            { t: '25 min', p: '29$', id: '25' },
            { t: '45 min', p: '49$', id: '45' },
            { t: '60 min', p: '69$', id: '60' },
          ].map(p => (
            <div key={p.id} style={{
              padding: 24,
              borderRadius: 20,
              background: '#fff',
              textAlign: 'center'
            }}>

              <h3>{p.t}</h3>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{p.p}</div>

              <button
                onClick={() => checkout(p.id)}
                style={{
                  marginTop: 15,
                  width: '100%',
                  padding: 12,
                  borderRadius: 12,
                  background: '#8b5e83',
                  color: 'white',
                  border: 'none'
                }}
              >
                Réserver
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* MODAL */}
      {showOfflineModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 18,
            maxWidth: 350,
            width: '100%',
            textAlign: 'center'
          }}>
            <h3>Hors ligne</h3>
            <p style={{ fontSize: 14, color: '#666' }}>
              Je ne suis pas disponible pour le moment.
            </p>

            <button
              onClick={() => setShowOfflineModal(false)}
              style={{
                marginTop: 15,
                width: '100%',
                padding: 12,
                borderRadius: 12,
                background: '#8b5e83',
                color: 'white',
                border: 'none'
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </main>
  )
}