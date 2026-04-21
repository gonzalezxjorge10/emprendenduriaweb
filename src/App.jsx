import React from 'react';
import './App.css';

function App() {
  return (
    <div className="w-full bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">💧 FiltroH2O</div>
          <ul className="hidden md:flex space-x-8 text-gray-700">
            <li><a href="#hero" className="hover:text-blue-600 transition">Inicio</a></li>
            <li><a href="#problema" className="hover:text-blue-600 transition">Problema</a></li>
            <li><a href="#como-funciona" className="hover:text-blue-600 transition">Cómo Funciona</a></li>
            <li><a href="#beneficios" className="hover:text-blue-600 transition">Beneficios</a></li>
            <li><a href="#contacto" className="hover:text-blue-600 transition">Contacto</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Agua Limpia, Accesible y Sustentable
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Filtro Biotecnológico de Bajo Costo para Purificación de Agua. Una solución innovadora diseñada para tu hogar y tu comunidad.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary">Descubre el Filtro</button>
            <button className="btn-secondary">Saber Más</button>
          </div>
          <div className="mt-12">
            <div className="text-6xl">💧</div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section id="problema" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">¿Cuál es el Problema?</h2>
          <p className="section-subtitle text-center">
            Millones de personas consumen agua que no es completamente segura
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💧', title: 'Agua Turbia', desc: 'Contaminada con sedimentos y partículas' },
              { icon: '👃', title: 'Mal Olor', desc: 'Presencia de cloro y contaminantes químicos' },
              { icon: '🦠', title: 'Enfermedades', desc: 'Riesgo de infecciones gastrointestinales' },
              { icon: '💰', title: 'Alto Costo', desc: 'Gasto constante en garrafones de agua' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solucion Section */}
      <section id="solucion" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Nuestra Solución</h2>
          <p className="section-subtitle text-center">
            Un sistema accesible, sustentable y eficiente
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <p className="text-lg text-gray-700 text-center mb-6">
              El Filtro Biotecnológico es un dispositivo de filtración modular que utiliza materiales naturales y principios de biotecnología para eliminar impurezas, mejorar la calidad del agua y reducir riesgos para la salud, sin necesidad de químicos costosos ni consumo elevado de energía.
            </p>
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-700 px-6 py-4 rounded-lg font-semibold">
                ✓ Sin químicos agresivos • ✓ Bajo consumo de energía • ✓ Fácil de mantener
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona Section */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">¿Cómo Funciona?</h2>
          <p className="section-subtitle text-center">
            3 etapas de filtración para agua pura y segura
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                num: '1',
                icon: '🪨',
                title: 'Filtración Física',
                materials: 'Grava + Arena',
                desc: 'Retiene partículas grandes como tierra y sedimentos'
              },
              {
                num: '2',
                icon: '⚫',
                title: 'Filtración Química',
                materials: 'Carbón Activado',
                desc: 'Elimina olores, cloro y compuestos orgánicos'
              },
              {
                num: '3',
                icon: '🌱',
                title: 'Filtración Biotecnológica',
                materials: 'Moringa / Biofilm',
                desc: 'Elimina microorganismos y mejora la calidad microbiológica'
              },
            ].map((stage, idx) => (
              <div key={idx} className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-4 mx-auto">
                  {stage.num}
                </div>
                <div className="text-4xl text-center mb-3">{stage.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{stage.title}</h3>
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm font-semibold text-center mb-3">
                  {stage.materials}
                </div>
                <p className="text-gray-700 text-center text-sm">{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-8">
            <p className="text-lg font-semibold text-gray-900">
              Resultado: Agua Limpia, Segura y Lista para Consumir
            </p>
          </div>
        </div>
      </section>

      {/* Materiales Section */}
      <section id="materiales" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">¿De Qué Está Hecho?</h2>
          <p className="section-subtitle text-center">
            Materiales accesibles, económicos y fáciles de reemplazar
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Componentes Principales</h3>
              <ul className="space-y-3">
                {[
                  'Estructura de PVC o acrílico resistente',
                  'Arena y grava para filtración inicial',
                  'Carbón activado de alta calidad',
                  'Material biotecnológico (moringa o bacterias seguras)',
                  'Mallas y válvulas de control',
                  'Sensor de turbidez (opcional) + microcontrolador',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ventajas de los Materiales</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="font-semibold text-gray-900">Accesibles</p>
                  <p className="text-gray-700 text-sm">Se encuentran fácilmente en el mercado local</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">Económicos</p>
                  <p className="text-gray-700 text-sm">Precio final muy por debajo de otras soluciones</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="font-semibold text-gray-900">Remplazables</p>
                  <p className="text-gray-700 text-sm">Componentes individuales fáciles de cambiar</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">Duraderos</p>
                  <p className="text-gray-700 text-sm">Larga vida útil con mantenimiento básico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Quién Va Dirigido Section */}
      <section id="usuarios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">¿A Quién Va Dirigido?</h2>
          <p className="section-subtitle text-center">
            Una solución para muchas necesidades
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Usuarios Principales</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">👨‍👩‍👧‍👦</span>
                  <div>
                    <p className="font-semibold text-gray-900">Familias en zonas de baja calidad de agua</p>
                    <p className="text-gray-700 text-sm">Comunidades rurales y semiurbanas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Usuarios Secundarios</h3>
              <div className="space-y-4">
                {[
                  { icon: '🏫', title: 'Escuelas', desc: 'Para proveer agua segura a estudiantes' },
                  { icon: '🏪', title: 'Pequeños Negocios', desc: 'Cafés, restaurantes y tiendas' },
                  { icon: '🤝', title: 'Proyectos Sociales', desc: 'ONGs y iniciativas ambientales' },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-3xl mr-4">{user.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{user.title}</p>
                      <p className="text-gray-700 text-sm">{user.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Perfil Típico del Usuario</h3>
            <p className="text-gray-700">
              Personas que gastan constantemente en garrafones, buscan soluciones económicas e interesadas en sustentabilidad
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Beneficios Principales</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '💰', title: 'Económico', desc: 'Reduce gasto en agua embotellada', color: 'blue' },
              { icon: '🧬', title: 'Salud', desc: 'Mejora calidad del agua', color: 'green' },
              { icon: '🌍', title: 'Ambiente', desc: 'Disminuye uso de plástico', color: 'emerald' },
              { icon: '🛠️', title: 'Práctico', desc: 'Fácil de usar y mantener', color: 'sky' },
            ].map((benefit, idx) => {
              const colors = {
                blue: 'from-blue-100 to-blue-50',
                green: 'from-green-100 to-green-50',
                emerald: 'from-emerald-100 to-emerald-50',
                sky: 'from-sky-100 to-sky-50',
              };
              
              return (
                <div key={idx} className={`bg-gradient-to-br ${colors[benefit.color]} rounded-lg p-6 text-center shadow-md hover:shadow-lg transition`}>
                  <div className="text-5xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-3xl font-bold text-blue-600 mb-2">50%</p>
              <p className="text-gray-700">Reducción de gasto en agua</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-3xl font-bold text-green-600 mb-2">99%</p>
              <p className="text-gray-700">Eliminación de impurezas</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-3xl font-bold text-emerald-600 mb-2">12</p>
              <p className="text-gray-700">Meses de vida útil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciador Section */}
      <section id="diferenciador" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">¿Por Qué Nosotros?</h2>
          <p className="section-subtitle text-center">
            No es solo un filtro, es una solución sustentable diseñada para la realidad local
          </p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-100 border-b-2 border-blue-600">
                  <th className="px-6 py-4 font-bold text-gray-900">Alternativa</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Problema</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { alt: 'Garrafones', problem: 'Caros, contaminantes y dependencia continua' },
                  { alt: 'Hervir agua', problem: 'Consume gas/electricidad y tiempo' },
                  { alt: 'Filtros comerciales', problem: 'Muy costosos y difíciles de mantener' },
                ].map((row, idx) => (
                  <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{row.alt}</td>
                    <td className="px-6 py-4 text-gray-700">{row.problem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              '✓ Bajo costo',
              '✓ Tecnología biológica',
              '✓ Fabricación local',
              '✓ Fácil mantenimiento',
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-green-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mantenimiento Section */}
      <section id="mantenimiento" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Mantenimiento Sencillo</h2>
          <p className="section-subtitle text-center">
            Diseñado para ser fácil de mantener sin conocimientos técnicos avanzados
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { freq: 'Cada 3-4 meses', task: 'Cambio de biocapa', icon: '🔄' },
              { freq: 'Cada 4-6 meses', task: 'Cambio de carbón activado', icon: '⚫' },
              { freq: 'Cada 6-12 meses', task: 'Lavado de arena/grava', icon: '🪨' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-lg font-bold text-blue-600 mb-2">{item.freq}</p>
                <p className="text-gray-700 font-semibold">{item.task}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
            <p className="text-center text-lg text-gray-900">
              💡 <span className="font-semibold">Todos los componentes son remplazables y accesibles</span> - No necesitas técnico especializado
            </p>
          </div>
        </div>
      </section>

      {/* Impacto Section */}
      <section id="impacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Nuestro Impacto</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Impacto en Salud</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🏥</span>
                  <div>
                    <p className="font-semibold text-gray-900">Reducción de enfermedades</p>
                    <p className="text-gray-700 text-sm">Menos infecciones gastrointestinales en la familia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">💪</span>
                  <div>
                    <p className="font-semibold text-gray-900">Mejor calidad de vida</p>
                    <p className="text-gray-700 text-sm">Agua segura para beber, cocinar y usar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Impacto Ambiental</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">♻️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Menos residuos plásticos</p>
                    <p className="text-gray-700 text-sm">No necesitas garrafones de plástico constantemente</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🌱</span>
                  <div>
                    <p className="font-semibold text-gray-900">Educación ambiental</p>
                    <p className="text-gray-700 text-sm">Aprende sobre purificación y sostenibilidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ahorro Mensual Estimado</h3>
            <p className="text-6xl font-bold mb-2">30-50%</p>
            <p className="text-xl">en gastos de agua con respecto a garrafones</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empieza tu Viaje Hacia Agua Limpia
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Agua limpia, accesible y sustentable mediante biotecnología al alcance de todos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
              Contactar Ahora
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg">
              Más Información
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-bold mb-2">Email</p>
              <p className="opacity-90">info@filtroh2o.com</p>
            </div>
            <div>
              <p className="font-bold mb-2">Teléfono</p>
              <p className="opacity-90">+XX (XXX) XXX-XXXX</p>
            </div>
            <div>
              <p className="font-bold mb-2">Ubicación</p>
              <p className="opacity-90">Tu Ciudad, País</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2026 Filtro Biotecnológico H2O. Agua limpia para todos.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition">Privacidad</a>
            <a href="#" className="hover:text-blue-400 transition">Términos</a>
            <a href="#" className="hover:text-blue-400 transition">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
