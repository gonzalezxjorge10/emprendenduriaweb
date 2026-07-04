import React, { useRef, useState } from 'react';
import useThree from './useThreeScene';
import './styles.css';

const ThreeCompact = ({ onExpand }) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const {
    isReady,
    isExploded,
    isFiltering,
    autoRotate,
    metrics,
    toggleExplode,
    toggleSimulation,
    toggleAutoRotate,
  } = useThree(containerRef, {
    isCompact: true,
    onExpand: onExpand,
  });

  const handleContainerClick = () => {
    if (onExpand) {
      onExpand();
    }
  };

  return (
    <div
      ref={containerRef}
      className="three-viewer-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleContainerClick}
      style={{ minHeight: '400px', cursor: 'pointer' }}
    >
      {/* Badge de interacción */}
      <div className="three-interact-badge">
        🔄 Click para explorar en 3D
      </div>

      {/* Overlay de expandir */}
      <div className="three-expand-overlay">
        <span>🔍 Expandir vista 3D</span>
      </div>

      {/* Estado de carga */}
      {!isReady && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px',
          letterSpacing: '2px',
        }}>
          Cargando modelo 3D...
        </div>
      )}

      {/* Mini controles (solo visibles en hover) */}
      {isReady && isHovering && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          padding: '8px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
            {autoRotate ? '⟳ Rotación auto' : '🖱️ Arrastrar para rotar'}
          </span>
        </div>
      )}

      {/* Métricas mini */}
      {isReady && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.7)',
          pointerEvents: 'none',
        }}>
          <div>Estado: <span style={{ color: '#4fd8ff' }}>{metrics.status}</span></div>
          <div>Flujo: <span style={{ color: '#22c58a' }}>{metrics.flow}</span></div>
        </div>
      )}
    </div>
  );
};

export default ThreeCompact;