import React, { useRef, useState, useEffect } from 'react';
import useThree from './useThreeScene';
import './styles.css';

const ThreeModal = ({ isOpen, onClose }) => {
  const containerRef = useRef(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const {
    isReady,
    isExploded,
    isFiltering,
    autoRotate,
    metrics,
    toggleExplode,
    toggleSimulation,
    toggleAutoRotate,
    setSelectedObject,
  } = useThree(containerRef, {
    isCompact: false,
    isOpen,
    onComponentSelect: (info) => setSelectedInfo(info),
  });

  // Cerrar info al hacer click fuera
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="three-modal-overlay" onClick={onClose}>
      <div className="three-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="three-modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Contenedor 3D */}
        <div
          ref={containerRef}
          className="three-viewer-container"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            minHeight: 'unset',
          }}
        />

        {/* Métricas */}
        {isReady && (
          <div className="three-metrics">
            <div className="metric">
              <span>Estado</span>
              <span className="value accent">{metrics.status}</span>
            </div>
            <div className="metric">
              <span>Flujo</span>
              <span className="value success">{metrics.flow}</span>
            </div>
            <div className="metric">
              <span>Turbidez IN</span>
              <span className="value">{metrics.turbIn}</span>
            </div>
            <div className="metric">
              <span>Turbidez OUT</span>
              <span className="value">{metrics.turbOut}</span>
            </div>
          </div>
        )}

        {/* Panel de información */}
        <div className={`three-modal-info ${selectedInfo ? 'visible' : ''}`}>
          <button className="close" onClick={() => {
            setSelectedInfo(null);
            setSelectedObject(null);
          }}>✕</button>
          <div className="tag">Componente</div>
          <h3>{selectedInfo?.title || '—'}</h3>
          <p>{selectedInfo?.desc || 'Selecciona una pieza en modo desglose para ver el detalle.'}</p>
        </div>

        {/* Controles */}
        <div className="three-modal-controls">
          <button
            className={`explode ${isExploded ? 'active' : ''}`}
            onClick={toggleExplode}
          >
            {isExploded ? '⛶ Ensamblar' : '⛶ Desglose'}
          </button>
          <button
            className={isFiltering ? 'active' : ''}
            onClick={toggleSimulation}
          >
            {isFiltering ? '⏸ Detener' : '▶ Simular flujo'}
          </button>
          <button
            className={`ghost ${autoRotate ? 'active' : ''}`}
            onClick={toggleAutoRotate}
          >
            ⟲ Auto-rotar
          </button>
          <button
            className="ghost"
            onClick={() => {
              // Reset view
              const container = containerRef.current;
              if (container) {
                // El hook maneja el reset via cameraFocus
              }
            }}
          >
            ⌖ Reset vista
          </button>
        </div>

        {/* Instrucciones */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '20px',
          zIndex: 12,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          padding: '8px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.5px',
          pointerEvents: 'none',
        }}>
          🖱️ Arrastrar: Rotar · Scroll: Zoom · Click: Inspeccionar
        </div>
      </div>
    </div>
  );
};

export default ThreeModal;