'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isOnline, setIsOnline] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(true)

  const [showOfflineModal, setShowOfflineModal] = useState(false)

  /* AGE GATE */
  const [showAgeModal, setShowAgeModal] = useState(false)

  /* VISITS */
  const [views, setViews] = useState<number | null>(null)

  /* LOAD ONLINE STATUS */
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
  
  const checkout = async (plan: string) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  })

  const data = await res.json()

  window.location.href = data.url
}

  useEffect(() => {
    loadStatus()

    /* AGE CHECK */
    const ageValidated = localStorage.getItem('age-validated')

    if (!ageValidated) {
      setShowAgeModal(true)
    }

    /* TRACK VIEW */
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 'landing-chat',
        userAgent: navigator.userAgent,
      }),
    })

    /* LOAD VIEWS */
    const loadViews = async () => {
      try {
        const res = await fetch('/api/views')
        const data = await res.json()

        setViews(data.views)
      } catch {}
    }

    loadViews()

    const interval = setInterval(loadStatus, 8000)

    return () => clearInterval(interval)
  }, [])


  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
  }

  return (
    <main
      style={{
        background:
          'radial-gradient(circle at top right, #fff3f8, #fdeff2 45%, #f9edf5 100%)',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#2f2a2a',
      }}
    >
      {/* NAV */}
      <nav
        style={{
          padding: '20px 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(14px)',
          background: 'rgba(255,255,255,0.55)',
          borderBottom: '1px solid rgba(139,94,131,0.08)',
        }}
      >
        <div
          style={{
            ...containerStyle,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* LOGO */}
          <img
            src="/images/logo.png"
            style={{
              height: 'clamp(50px, 7vw, 100px)',
              objectFit: 'contain',
            }}
          />

          {/* RIGHT SIDE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {/* VISIT COUNTER */}
            <div
              style={{
                padding: '0px 0px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.7)',
                fontSize: 13,
                fontWeight: 600,
                color: '#6b5b5b',
                border: '0px solid rgba(139,94,131,0.08)',
              }}
            >
             {/*  👀 {views ? views.toLocaleString() : '...'} visites*/}
            </div>

            {/* ONLINE STATUS */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: isOnline
                  ? 'rgba(46,204,113,0.12)'
                  : 'rgba(231,76,60,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: isOnline ? '#2ecc71' : '#e74c3c',
                }}
              />

              {loadingStatus
                ? 'Chargement...'
                : isOnline
                ? 'Disponible maintenant'
                : 'Hors ligne'}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          ...containerStyle,
          paddingTop: 'clamp(40px, 8vw, 80px)',
          paddingBottom: 'clamp(40px, 8vw, 90px)',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* TEXT */}
        <div>
          <div
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              borderRadius: 999,
              background: 'rgba(139,94,131,0.08)',
              color: '#8b5e83',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            CHAT PRIVÉ • CONFIDENTIEL • ADULTE
          </div>

          <h1
            style={{
              fontSize: 'clamp(38px, 7vw, 72px)',
              lineHeight: 1.05,
              marginTop: 24,
              marginBottom: 24,
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Un moment
            <br />
            juste pour toi
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px,2vw,22px)',
              lineHeight: 1.8,
              color: '#5a4f4f',
              maxWidth: 650,
            }}
          >
            Ici, tu peux décrocher du quotidien,
            parler librement, te sentir écoutée,
            désirée ou simplement profiter
            d’une présence réelle et attentive.
          </p>

          <p
            style={{
              marginTop: 22,
              color: '#7c6a6a',
              lineHeight: 1.8,
              fontSize: 16,
            }}
          >
            Sans jugement.
            Sans pression.
            Sans exposition.
            Seulement un espace privé
            pour passer un bon moment ensemble.
          </p>

          {/* TAGS */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              marginTop: 28,
            }}
          >
            {[
              '💬 Chat en direct',
              '🔒 100% confidentiel',
              '⚡ Réponse rapide',
              '✨ Expérience premium',
            ].map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'white',
                  padding: '10px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow:
                    '0 8px 20px rgba(0,0,0,0.04)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              document
                .getElementById('pricing')
                ?.scrollIntoView({
                  behavior: 'smooth',
                })
            }
            style={{
              marginTop: 34,
              padding: '18px 28px',
              borderRadius: 18,
              border: 'none',
              background:
                'linear-gradient(135deg,#8b5e83,#6f4768,#9a6d92)',
              color: 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              width: '100%',
              maxWidth: 360,
              boxShadow:
                '0 20px 50px rgba(139,94,131,0.28)',
            }}
          >
            Commencer maintenant ✨
          </button>
        </div>

        {/* IMAGE */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(420px,65vw,760px)',
            borderRadius: 34,
            overflow: 'hidden',
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.16)',
          }}
        >
          <img
            src="/images/2.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.48), rgba(0,0,0,0.08))',
            }}
          />

          {/* FLOATING STATUS 
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 20,
              background: 'rgba(255,255,255,0.94)',
              padding: '14px 18px',
              borderRadius: 18,
              backdropFilter: 'blur(12px)',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {loadingStatus
              ? 'Chargement...'
              : isOnline
              ? '🟢 Disponible maintenant'
              : '🔴 Hors ligne'}
          </div>*/}
        </div>
      </section>
	  
	  
{/* personage */}
<section
  style={{
    ...containerStyle,
    paddingTop: 'clamp(60px, 10vw, 120px)',
    paddingBottom: 'clamp(60px, 10vw, 120px)',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: 820,
      position: 'relative',
      background: 'rgba(255,255,255,0.75)',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: 28,
      padding: 'clamp(28px, 4vw, 56px)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
      backdropFilter: 'blur(10px)',
    }}
  >
    {/* MORTAISE IMAGE */}
    <div
      style={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 110,
        height: 110,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '4px solid white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      }}
    >
      <img
        src="/images/about.jpg"
        alt="portrait"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>

    {/* STATUS */}
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        borderRadius: 999,
        background: 'rgba(139,94,131,0.08)',
        color: '#8b5e83',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {loadingStatus
        ? '⏳ Chargement...'
        : isOnline
        ? '🟢 Disponible maintenant'
        : '🔴 Hors ligne'}
    </div>

    {/* TITLE */}
    <h1
      style={{
        fontSize: 'clamp(42px, 6vw, 78px)',
        lineHeight: 1.05,
        marginTop: 28,
        marginBottom: 20,
        fontFamily: 'Playfair Display, serif',
        color: '#1f1a1a',
      }}
    >
      Bienvenue dans mon Chat
    </h1>

    {/* INTRO */}
    <p
      style={{
        fontSize: 'clamp(17px,2vw,22px)',
        lineHeight: 1.8,
        color: '#4f4343',
        maxWidth: 720,
      }}
    >
      Que tu aies envie d’une conversation légère, d’un peu de flirt ou d'un moment encore plus intxxx, tout se fait naturellement, selon ton humeur et ton rythme.
    </p>

    {/* BODY */}
    <div
      style={{
        marginTop: 24,
        display: 'grid',
        gap: 14,
      }}
    >
      <p
        style={{
          color: '#6a5a5a',
          lineHeight: 1.9,
          fontSize: 16,
        }}
      >
        <u>Alors <b>Tu t'ennuie? </b> Allez, viens me rejoindre. On discute par clavardage, rien de plus!</u> 
		<br /><br />
		Je suis un homme entre 30 et 50 ans, 6 pieds 2 pouces, 215 lbs, cheveux bruns un peu long, je me garde en forme donc assez musclé mais pas monsieur Univers non plus. 
		<br /><br />
		Si tu ne fais rien, que tu t'ennuie et que t'as envie de discuter, je t'invite à choisir ton moment un peu plus bas, on va  apprendre a se connaitre et on va certainement passer un bon moment à clavarder. 
      </p>

      <p
        style={{
          color: '#6a5a5a',
          lineHeight: 1.9,
          fontSize: 16,
        }}
      >
        Tout se fait dans le respect, la discrétion et à ton rythme.
		<br /><br />
		Luca B.
		<br />
		<i>(Image à titre indicatif)</i>
      </p>
    </div>

    {/* TAGS */}
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 32,
      }}
    >
      {[
        '💬 Chat en direct',
        '🔒 Discrétion totale',
        '⚡ Réponse rapide',
        '✨ Expérience personnalisée',
      ].map((tag) => (
        <div
          key={tag}
          style={{
            background: 'white',
            padding: '10px 14px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
          }}
        >
          {tag}
        </div>
      ))}
    </div>

    {/* BUTTON */}
    <button
      onClick={() =>
        document.getElementById('pricing')?.scrollIntoView({
          behavior: 'smooth',
        })
      }
      style={{
        marginTop: 42,
        padding: '18px 28px',
        borderRadius: 18,
        border: 'none',
        background: 'linear-gradient(135deg,#8b5e83,#6f4768,#9a6d92)',
        color: 'white',
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 20px 50px rgba(139,94,131,0.28)',
      }}
    >
      Commencer maintenant ✨
    </button>
  </div>
</section>
	  

      {/* PRICING */}
      <section
        id="pricing"
        style={{
          ...containerStyle,
          paddingBottom: 120,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 60,
          }}
        >
          <p
            style={{
              color: '#8b5e83',
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            MOMENTS PRIVÉS ✨
          </p>

          <h2
            style={{
              fontSize: 'clamp(34px,5vw,56px)',
              lineHeight: 1.15,
              fontFamily: 'Playfair Display, serif',
              marginBottom: 22,
            }}
          >
            Choisis le moment
            <br />
            qui te ressemble
          </h2>

          <p
            style={{
              maxWidth: 760,
              margin: '0 auto',
              fontSize: 18,
              lineHeight: 1.9,
              color: '#5d5050',
            }}
          >
            Ce que tu recherches est peut-être plus simple que tu le crois.
            <br /><br />Tu peux prendre ton temps,
            parler librement, explorer et profiter
            d’une présence attentive.
          </p>

          {/* TRUST */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 28,
            }}
          >
            {[
              '🔒 100% confidentiel',
              '💬 Messagerie privée',
              '🛡️ Paiement sécurisé Stripe',
              '✨ Aucun engagement',
            ].map((x) => (
              <div
                key={x}
                style={{
                  background: 'white',
                  padding: '12px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow:
                    '0 10px 20px rgba(0,0,0,0.04)',
                }}
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(280px,1fr))',
            gap: 24,
          }}
        >
          {[
            {
              title: 'Instant douceur',
              time: '25 minutes',
              price: '29$',
              desc: 'Un moment léger et agréable pour décrocher du quotidien.',
              plan: '25',
            },
            {
              title: 'Moment privé',
              time: '45 minutes',
              price: '49$',
              desc: 'Le parfait équilibre entre connexion, complicité et présence.',
              plan: '45',
              featured: true,
            },
            {
              title: 'Connexion intense',
              time: '60 minutes',
              price: '69$',
              desc: 'Prendre le temps de vivre une expérience plus profonde.',
              plan: '60',
            },
          ].map((p) => (
            <div
              key={p.plan}
              style={{
                position: 'relative',
                padding: '38px 30px',
                borderRadius: 32,
                overflow: 'hidden',
                background: p.featured
                  ? 'linear-gradient(180deg,#8b5e83,#6f4768)'
                  : 'rgba(255,255,255,0.78)',
                color: p.featured
                  ? 'white'
                  : '#2f2a2a',
                backdropFilter: 'blur(14px)',
                boxShadow: p.featured
                  ? '0 35px 80px rgba(139,94,131,0.28)'
                  : '0 20px 45px rgba(0,0,0,0.06)',
                transform: p.featured
                  ? 'translateY(-8px)'
                  : 'translateY(0)',
              }}
            >
              {p.featured && (
                <div
                  style={{
                    display: 'inline-block',
                    marginBottom: 18,
                    padding: '8px 14px',
                    borderRadius: 999,
                    background:
                      'rgba(255,255,255,0.14)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  ✨ LE PLUS CHOISI
                </div>
              )}

              <h3
                style={{
                  fontSize: 30,
                  fontFamily:
                    'Playfair Display, serif',
                  marginBottom: 6,
                }}
              >
                {p.title}
              </h3>

              <div
                style={{
                  opacity: 0.85,
                  marginBottom: 22,
                }}
              >
                {p.time}
              </div>

              <div
                style={{
                  fontSize: 58,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                {p.price}
              </div>

              <p
                style={{
                  lineHeight: 1.9,
                  fontSize: 15,
                  opacity: 0.92,
                  minHeight: 90,
                }}
              >
                {p.desc}
              </p>

              {/* FEATURES */}
              <div
                style={{
                  marginTop: 24,
                  marginBottom: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  fontSize: 14,
                }}
              >
                <div>💬 Conversation privée</div>
                <div>🔒 Discrétion totale</div>
                <div>⚡ Réponse rapide</div>
                <div>✨ Aucun jugement</div>
              </div>

              <button
                onClick={() => checkout(p.plan)}
                style={{
                  width: '100%',
                  padding: '18px',
                  borderRadius: 18,
                  border: 'none',
                  background: p.featured
                    ? 'white'
                    : 'linear-gradient(135deg,#8b5e83,#6f4768)',
                  color: p.featured
                    ? '#8b5e83'
                    : 'white',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                Réserver mon moment ✨
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background:
            'linear-gradient(to top,#ffffff,#faf5f8)',
          borderTop:
            '1px solid rgba(139,94,131,0.08)',
          padding: '70px 20px',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: 34,
              fontFamily: 'Playfair Display, serif',
              marginBottom: 18,
            }}
          >
            Discret. Raffiné. Entièrement privé.
          </h3>

          <p
            style={{
              maxWidth: 760,
              margin: '0 auto',
              color: '#5d5050',
              lineHeight: 1.9,
              fontSize: 16,
            }}
          >
            Chaque échange demeure confidentiel.
            Aucun jugement, aucune pression,
            aucune exposition.
            Seulement un moment exclusif pensé
            pour offrir une connexion naturelle,
            apaisante et respectueuse.
          </p>

          {/* TRUST TAGS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 34,
            }}
          >
            {[
              '🔒 Confidentialité totale',
              '💬 Chat privé',
              '🛡️ Paiement sécurisé',
              '✨ Expérience premium',
            ].map((x) => (
              <div
                key={x}
                style={{
                  background: 'white',
                  padding: '12px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow:
                    '0 10px 20px rgba(0,0,0,0.04)',
                }}
              >
                {x}
              </div>
            ))}
          </div>

          {/* COPYRIGHT */}
          <div
            style={{
              marginTop: 40,
              color: '#9a8b8b',
              fontSize: 12,
            }}
          >
            © 2026 — Expérience privée.
            Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* AGE GATE */}
      {showAgeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: 'white',
              borderRadius: 30,
              padding: 34,
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: 30,
                marginBottom: 14,
                fontFamily: 'Playfair Display, serif',
              }}
            >
              Accès réservé aux adultes
            </h2>

            <p
              style={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Ce site est destiné exclusivement
              aux personnes âgées de 18 ans et plus.
            </p>

            <button
              onClick={() => {
                localStorage.setItem(
                  'age-validated',
                  'true'
                )

                setShowAgeModal(false)
              }}
              style={{
                marginTop: 24,
                width: '100%',
                padding: 16,
                borderRadius: 16,
                border: 'none',
                background:
                  'linear-gradient(135deg,#8b5e83,#6f4768)',
                color: 'white',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              Oui, j’ai 18 ans ou plus
            </button>

            <button
              onClick={() => {
                window.location.href =
                  'https://www.google.com'
              }}
              style={{
                marginTop: 12,
                width: '100%',
                padding: 16,
                borderRadius: 16,
                border: '1px solid #ddd',
                background: 'white',
                color: '#555',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 15,
              }}
            >
              Non
            </button>
          </div>
        </div>
      )}

      {/* OFFLINE MODAL */}
      {showOfflineModal && (
        <div
          onClick={() => setShowOfflineModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: 'white',
              borderRadius: 28,
              padding: 34,
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: 28,
                marginBottom: 14,
              }}
            >
              Indisponible pour le moment 💬
            </h3>

            <p
              style={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Je suis actuellement hors ligne.
              Tu peux revenir un peu plus tard
              ou t’inscrire pour être avertie
              lorsque je serai disponible.
            </p>

            {/* MAILCHIMP */}
            <a
              href="https://mailchi.mp/d08a184d545e/velouta"
              target="_blank"
              style={{
                display: 'block',
                marginTop: 24,
                width: '100%',
                padding: 16,
                borderRadius: 16,
                textDecoration: 'none',
                background:
                  'linear-gradient(135deg,#8b5e83,#6f4768)',
                color: 'white',
                fontWeight: 700,
              }}
            >
              Être avertie par email ✨
            </a>

            <button
              onClick={() =>
                setShowOfflineModal(false)
              }
              style={{
                marginTop: 12,
                width: '100%',
                padding: 16,
                borderRadius: 16,
                border: '1px solid #ddd',
                background: 'white',
                color: '#555',
                fontWeight: 700,
                cursor: 'pointer',
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