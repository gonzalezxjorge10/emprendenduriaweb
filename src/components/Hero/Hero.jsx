import React, { useState } from 'react';
import { ThreeCompact, ThreeModal } from '../ThreeScene';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section 
      id="hero" 
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        padding: '8rem 4rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 80% at 70% 50%, rgba(14,165,233,0.12) 0%, transparent 60%), linear-gradient(135deg, #0c1a1a 0%, #071218 100%)',
        alignItems: 'center',
      }}
    >
      {/* Columna izquierda - Texto */}
      <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'inline-block', 
          backgroundColor: 'rgba(14,165,233,0.15)', 
          border: '1px solid rgba(14,165,233,0.4)', 
          color: '#0ea5e9', 
          fontSize: '0.75rem', 
          fontWeight: 500, 
          padding: '0.4rem 1rem', 
          borderRadius: '2rem', 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          marginBottom: '1.5rem', 
          animation: 'fadeUp 0.8s ease both' 
        }}>
          💧 Biotecnología accesible
        </div>
        <h1 style={{ 
          fontFamily: '"Playfair Display", serif', 
          fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
          fontWeight: 900, 
          lineHeight: 1, 
          letterSpacing: '-0.03em', 
          marginBottom: '1.5rem', 
          animation: 'fadeUp 0.8s 0.1s ease both' 
        }}>
          Agua <em style={{ color: '#0ea5e9', fontStyle: 'italic' }}>limpia</em><br />para todos,<br /><span style={{ color: '#16a34a' }}>siempre.</span>
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          fontWeight: 300, 
          color: 'rgba(240,249,255,0.7)', 
          lineHeight: 1.7, 
          maxWidth: '560px', 
          marginBottom: '2.5rem', 
          animation: 'fadeUp 0.8s 0.2s ease both' 
        }}>
          Un sistema de filtración modular que usa materiales naturales y principios biotecnológicos para purificar agua sin químicos costosos ni alto consumo de energía.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.3s ease both' }}>
          <a href="#como-funciona" style={{ 
            background: '#0ea5e9', 
            color: '#0c1a1a', 
            padding: '0.9rem 2.2rem', 
            borderRadius: '3rem', 
            fontSize: '0.95rem', 
            fontWeight: 500, 
            textDecoration: 'none', 
            transition: 'all 0.3s', 
            border: 'none', 
            cursor: 'pointer' 
          }} onMouseOver={(e) => { e.target.style.background = '#16a34a'; e.target.style.color = 'white'; e.target.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.target.style.background = '#0ea5e9'; e.target.style.color = '#0c1a1a'; e.target.style.transform = 'translateY(0)'; }}>
            Cómo funciona
          </a>
          <a href="#contacto" style={{ 
            background: 'transparent', 
            color: 'white', 
            padding: '0.9rem 2.2rem', 
            borderRadius: '3rem', 
            fontSize: '0.95rem', 
            fontWeight: 500, 
            textDecoration: 'none', 
            transition: 'all 0.3s', 
            border: '1px solid rgba(240,249,255,0.3)', 
            cursor: 'pointer' 
          }} onMouseOver={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.color = '#0ea5e9'; }} onMouseOut={(e) => { e.target.style.borderColor = 'rgba(240,249,255,0.3)'; e.target.style.color = 'white'; }}>
            Quiero más info
          </a>
        </div>
      </div>

      {/* Columna derecha - Modelo 3D */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        maxWidth: '600px',
        justifySelf: 'end',
      }}>
        <ThreeCompact onExpand={() => setIsModalOpen(true)} />
      </div>

      {/* Modal */}
      <ThreeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;