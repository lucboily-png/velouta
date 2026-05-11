'use client'

import Script from 'next/script'

export default function Merci() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #fff7f8, #fdeff2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: '100%',
          background: 'white',
          borderRadius: 24,
          padding: 40,
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}
      >

        {/* ICON */}
        <div style={{ fontSize: 50, marginBottom: 10 }}>
          💬✨
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: 34,
            fontFamily: 'Playfair Display, serif',
            marginBottom: 10,
          }}
        >
          Ton accès est activé
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            fontSize: 16,
            color: '#5a4f4f',
            lineHeight: 1.6,
            marginBottom: 25,
          }}
        >
          Tu peux maintenant commencer une conversation privée en toute discrétion.  
          <br />
          Le chat s’ouvre automatiquement en bas à droite.
        </p>

        {/* STATUS CARD */}
        <div
          style={{
            background: '#fbe9ee',
            padding: 14,
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            color: '#8b5e83',
            marginBottom: 20,
          }}
        >
          🔒 Session privée sécurisée • 100% confidentiel
        </div>

        {/* CTA hint */}
        <p
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 30,
          }}
        >
          💡 Astuce : écris simplement “bonjour” pour commencer
        </p>

        {/* DIVIDER */}
        <div
          style={{
            height: 1,
            background: '#eee',
            margin: '20px 0',
          }}
        />

        {/* SECOND MESSAGE */}
        <p
          style={{
            fontSize: 13,
            color: '#6b5b5b',
            lineHeight: 1.6,
          }}
        >
          Prends ton temps.  
          Ici, il n’y a aucune pression — seulement une présence.
        </p>
      </div>

      {/* TAWK SCRIPT */}
      <Script id="tawkto" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();

          (function() {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];

            s1.async = true;
            s1.src='https://embed.tawk.to/69e9023529e1a31c3475385d/1jmr318i6';
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");

            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
      </Script>

    </div>
  )
}