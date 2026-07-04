import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero/Hero';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: '#0c1a1a', color: 'white', overflow: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 4rem',
        backgroundColor: 'rgba(12,26,26,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(14,165,233,0.15)'
      }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0ea5e9', letterSpacing: '-0.02em' }}>
          Aqua<span style={{ color: '#16a34a' }}>Bio</span>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
          <li><a href="#problema" style={{ color: 'rgba(240,249,255,0.7)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#0ea5e9'} onMouseOut={(e) => e.target.style.color = 'rgba(240,249,255,0.7)'}>Problema</a></li>
          <li><a href="#como-funciona" style={{ color: 'rgba(240,249,255,0.7)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#0ea5e9'} onMouseOut={(e) => e.target.style.color = 'rgba(240,249,255,0.7)'}>Cómo Funciona</a></li>
          <li><a href="#beneficios" style={{ color: 'rgba(240,249,255,0.7)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#0ea5e9'} onMouseOut={(e) => e.target.style.color = 'rgba(240,249,255,0.7)'}>Beneficios</a></li>
          <li><a href="#contacto" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', background: '#0ea5e9', padding: '0.5rem 1.4rem', borderRadius: '2rem', transition: 'background 0.3s', cursor: 'pointer' }} onMouseOver={(e) => e.target.style.background = '#16a34a'} onMouseOut={(e) => e.target.style.background = '#0ea5e9'}>Contáctanos</a></li>
        </ul>
      </nav>

      {/* Hero con modelo 3D */}
      <Hero />

      {/* Problema */}
      <section id="problema" style={{ padding: '6rem 4rem', background: 'linear-gradient(135deg, #071218 0%, #0c1a1a 100%)', borderTop: '1px solid rgba(14,165,233,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: '1rem' }}>El problema</div>
          <blockquote style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.3, color: 'white', borderLeft: '4px solid #0ea5e9', paddingLeft: '2rem', marginBottom: '3rem' }}>
            "Millones de personas consumen agua que no es completamente segura. Nuestro filtro transforma esa realidad."
          </blockquote>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🌊', text: 'Agua con turbidez, mal olor o contaminantes peligrosos' },
              { icon: '💸', text: 'Alto gasto mensual en garrafones de agua embotellada' },
              { icon: '🦠', text: 'Riesgo constante de enfermedades gastrointestinales' },
              { icon: '🏭', text: 'Dependencia de soluciones poco sustentables y costosas' },
            ].map((item, idx) => (
              <div key={idx} className="reveal" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: '12px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s', cursor: 'pointer' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.background = 'rgba(14,165,233,0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.15)'; e.currentTarget.style.background = 'rgba(14,165,233,0.06)'; }}>
                <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                <p style={{ fontSize: '0.95rem', color: 'rgba(240,249,255,0.8)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="como-funciona" style={{ padding: '6rem 4rem', background: '#0c1a1a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: '1rem' }}>El proceso</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
            3 etapas de <em style={{ color: '#0ea5e9', fontStyle: 'italic' }}>purificación</em>
          </h2>

          {[
            { num: '1', icon: '🪨', title: 'Filtración Física', desc: 'La primera barrera retiene partículas visibles: tierra, sedimentos y sólidos suspendidos que dan turbidez al agua.', tags: ['🪨 Grava', '⬜ Arena', '🧵 Algodón'], color: '#0ea5e9' },
            { num: '2', icon: '⬛', title: 'Filtración Química', desc: 'El carbón activado actúa como esponja molecular, absorbiendo cloro, olores desagradables y compuestos orgánicos volátiles.', tags: ['⬛ Carbón Activado'], color: '#16a34a' },
            { num: '3', icon: '🌱', title: 'Filtración Biotecnológica', desc: 'La etapa más avanzada usa moringa o biofilm bacteriano para eliminar microorganismos y mejorar la calidad microbiológica del agua.', tags: ['🌿 Moringa', '🧬 Biofilm bacteriano'], color: '#f59e0b' },
          ].map((step, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '2rem', padding: '2rem 0', alignItems: 'start', opacity: 0, transform: 'translateX(-20px)', animation: `fadeInStep 0.6s ease ${idx * 0.2}s both` }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 900, border: `2px solid ${step.color}`, color: step.color, background: '#0c1a1a', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                {step.num}
              </div>
              <div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: step.color }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(240,249,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                  {step.desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {step.tags.map((tag, tidx) => (
                    <span key={tidx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', borderRadius: '2rem', fontWeight: 500, background: `rgba(${step.color === '#0ea5e9' ? '14,165,233' : step.color === '#16a34a' ? '22,163,74' : '245,158,11'},0.15)`, color: step.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materiales */}
      <section id="materiales" style={{ padding: '6rem 4rem', background: 'linear-gradient(180deg, #071218, #0c1a1a)', borderTop: '1px solid rgba(14,165,233,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: '1rem' }}>Composición</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            <em style={{ color: '#0ea5e9', fontStyle: 'italic' }}>Materiales</em> accesibles<br />y sostenibles
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {[
              { emoji: '🧪', name: 'PVC / Acrílico', desc: 'Estructura resistente y duradera que aloja el sistema de filtración' },
              { emoji: '🪨', name: 'Arena & Grava', desc: 'Primera barrera de filtración física, retiene sedimentos' },
              { emoji: '⬛', name: 'Carbón Activado', desc: 'Elimina olores, cloro y compuestos orgánicos perjudiciales' },
              { emoji: '🌿', name: 'Moringa', desc: 'Agente biotecnológico natural con propiedades antimicrobianas' },
              { emoji: '🔩', name: 'Mallas & Válvulas', desc: 'Sistema modular de control de flujo y separación de capas' },
              { emoji: '📡', name: 'Sensor (opcional)', desc: 'Sensor de turbidez y microcontrolador para monitoreo inteligente' },
            ].map((item, idx) => (
              <div key={idx} className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.8rem 1.5rem', textAlign: 'center', transition: 'all 0.35s', cursor: 'pointer' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                <span style={{ fontSize: '2.5rem', marginBottom: '0.8rem', display: 'block' }}>{item.emoji}</span>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,249,255,0.5)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" style={{ padding: '6rem 4rem', background: '#0c1a1a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0ea5e9', marginBottom: '1rem' }}>Por qué elegirlo</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
            Beneficios que <em style={{ color: '#0ea5e9', fontStyle: 'italic' }}>transforman</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '💰', title: 'Económicos', bg: 'rgba(245,158,11,0.15)', items: ['Reduce gasto en agua embotellada', 'Bajo costo de mantenimiento', 'Materiales locales y asequibles'] },
              { icon: '🧬', title: 'Salud', bg: 'rgba(244,114,182,0.15)', items: ['Mejora la calidad del agua', 'Reduce riesgo de enfermedades', 'Elimina microorganismos patógenos'] },
              { icon: '🌱', title: 'Ambientales', bg: 'rgba(22,163,74,0.15)', items: ['Disminuye el uso de plástico', 'No requiere químicos agresivos', 'Tecnología eco-compatible'] },
              { icon: '🛠️', title: 'Prácticos', bg: 'rgba(14,165,233,0.15)', items: ['Fácil de usar sin conocimientos técnicos', 'Mantenimiento sencillo', 'Modular y escalable'] },
            ].map((item, idx) => (
              <div key={idx} className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2rem', transition: 'all 0.3s', cursor: 'pointer' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: item.bg }}>
                    {item.icon}
                  </div>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 700 }}>
                    {item.title}
                  </div>
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {item.items.map((li, lidx) => (
                    <li key={lidx} style={{ fontSize: '0.9rem', color: 'rgba(240,249,255,0.7)', padding: '0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#0ea5e9', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" style={{ padding: '6rem 4rem', background: 'linear-gradient(135deg, #0369a1 0%, #065f46 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
            Agua limpia, accesible y sustentable al alcance de todos
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            ¿Quieres saber más sobre AquaBio o llevar este filtro a tu comunidad?<br />
            Déjanos tu correo y te contactamos.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input type="email" placeholder="tu@correo.com" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.9rem 1.5rem', borderRadius: '3rem', fontSize: '0.95rem', outline: 'none', width: '280px', fontFamily: 'inherit', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'white'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'} />
            <button style={{ background: 'white', color: '#0369a1', padding: '0.9rem 2rem', borderRadius: '3rem', fontSize: '0.95rem', fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s' }} onMouseOver={(e) => { e.target.style.background = '#0c1a1a'; e.target.style.color = 'white'; }} onMouseOut={(e) => { e.target.style.background = 'white'; e.target.style.color = '#0369a1'; }}>
              Quiero saber más
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#060e0e', padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(14,165,233,0.1)', fontSize: '0.8rem', color: 'rgba(240,249,255,0.4)' }}>
        <div>© 2026 AquaBio · Filtro Biotecnológico de Agua</div>
        <div>Hecho con 💧 para comunidades sustentables</div>
      </footer>

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
        @keyframes fadeInStep {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;