import * as THREE from 'three';

// Genera textura de grano procedural
export const grainCanvas = ({ size = 512, base, speckles = [], density = 6000, minR = 0.4, maxR = 2.2 }) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  
  for (let i = 0; i < density; i++) {
    const c = speckles[Math.floor(Math.random() * speckles.length)];
    ctx.globalAlpha = 0.35 + Math.random() * 0.5;
    ctx.fillStyle = c;
    const x = Math.random() * size, y = Math.random() * size;
    const r = minR + Math.random() * (maxR - minR);
    ctx.beginPath(); 
    ctx.arc(x, y, r, 0, Math.PI * 2); 
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
  const grad = ctx.createRadialGradient(size/2, size/2, size*0.1, size/2, size/2, size*0.7);
  grad.addColorStop(0, 'rgba(255,255,255,0.04)');
  grad.addColorStop(1, 'rgba(0,0,0,0.06)');
  ctx.fillStyle = grad; 
  ctx.fillRect(0,0,size,size);
  return canvas;
};

// Convierte canvas a mapa de normales
export const canvasToNormalMap = (canvas, strength = 1.6) => {
  const size = canvas.width;
  const ctx = canvas.getContext('2d');
  const src = ctx.getImageData(0, 0, size, size).data;
  const out = document.createElement('canvas');
  out.width = out.height = size;
  const octx = out.getContext('2d');
  const img = octx.createImageData(size, size);
  const lum = (i) => (src[i] + src[i+1] + src[i+2]) / 3;
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const xm = ((x - 1 + size) % size), xp = ((x + 1) % size);
      const ym = ((y - 1 + size) % size), yp = ((y + 1) % size);
      const l = (xx, yy) => lum((yy * size + xx) * 4);
      const dx = (l(xp, y) - l(xm, y)) * strength;
      const dy = (l(x, yp) - l(x, ym)) * strength;
      let nx = -dx, ny = -dy, nz = 255;
      const len = Math.sqrt(nx*nx + ny*ny + nz*nz);
      nx = (nx/len)*0.5+0.5; 
      ny = (ny/len)*0.5+0.5; 
      nz = (nz/len)*0.5+0.5;
      const idx = (y*size+x)*4;
      img.data[idx] = nx*255; 
      img.data[idx+1] = ny*255; 
      img.data[idx+2] = nz*255; 
      img.data[idx+3]=255;
    }
  }
  octx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(out);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
};

// Crea un set completo de materiales PBR
export const makeMaterialSet = ({ base, speckles, density, minR, maxR, repeat = 4, bumpStrength = 1.4 }) => {
  const diffCanvas = grainCanvas({ base, speckles, density, minR, maxR });
  const diffTex = new THREE.CanvasTexture(diffCanvas);
  diffTex.colorSpace = THREE.SRGBColorSpace;
  diffTex.wrapS = diffTex.wrapT = THREE.RepeatWrapping;
  diffTex.repeat.set(repeat, repeat);

  const normalTex = canvasToNormalMap(diffCanvas, bumpStrength);
  normalTex.repeat.set(repeat, repeat);

  return { map: diffTex, normalMap: normalTex };
};

// Interpolación lineal
export const lerp = (a, b, t) => (1 - t) * a + t * b;

// Encuentra el objeto registrado más cercano en el árbol
export const findRegisteredAncestor = (obj, registeredObjects) => {
  let o = obj;
  while (o) {
    if (registeredObjects.includes(o)) return o;
    o = o.parent;
  }
  return null;
};