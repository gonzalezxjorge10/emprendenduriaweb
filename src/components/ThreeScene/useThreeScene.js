import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { makeMaterialSet, findRegisteredAncestor, lerp } from '../../utils/threeUtils';

export const useThree = (containerRef, options = {}) => {
  const {
    isCompact = false,
    isOpen = true,
    onExpand = null,
    onComponentSelect = null,
  } = options;

  // Refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const composerRef = useRef(null);
  const animationIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  
  // State
  const [isReady, setIsReady] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [cameraFocus, setCameraFocus] = useState(null);
  const [metrics, setMetrics] = useState({
    status: 'SISTEMA LISTO',
    flow: '0.0 L/M',
    turbIn: '0 NTU',
    turbOut: '0 NTU'
  });

  const hasInitializedRef = useRef(false);
  const isExplodedRef = useRef(isExploded);
  const isFilteringRef = useRef(isFiltering);
  const autoRotateRef = useRef(autoRotate);
  const hoveredObjectRef = useRef(hoveredObject);
  const cameraFocusRef = useRef(cameraFocus);
  const metricsRef = useRef(metrics);
  const onComponentSelectRef = useRef(onComponentSelect);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    isFilteringRef.current = isFiltering;
  }, [isFiltering]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    hoveredObjectRef.current = hoveredObject;
  }, [hoveredObject]);

  useEffect(() => {
    cameraFocusRef.current = cameraFocus;
  }, [cameraFocus]);

  useEffect(() => {
    metricsRef.current = metrics;
  }, [metrics]);

  useEffect(() => {
    onComponentSelectRef.current = onComponentSelect;
  }, [onComponentSelect]);

  // Referencias internas
  const explodableObjects = useRef([]);
  const waterParticles = useRef([]);
  const splashes = useRef([]);
  const registeredObjects = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());

  const DEFAULT_CAM_POS = new THREE.Vector3(38, 22, 52);
  const DEFAULT_TARGET = new THREE.Vector3(0, 9, 0);

  // Inicialización de la escena
  const initScene = useCallback(() => {
    if (!containerRef.current || hasInitializedRef.current || rendererRef.current) return () => {};

    hasInitializedRef.current = true;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);
    scene.fog = new THREE.FogExp2(0x060a14, 0.0095);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 500);
    camera.position.copy(DEFAULT_CAM_POS);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.035).texture;
    pmremGenerator.dispose();

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 14;
    controls.maxDistance = 120;
    controls.maxPolarAngle = Math.PI / 2 + 0.08;
    controls.target.copy(DEFAULT_TARGET);
    controls.zoomSpeed = 0.9;
    controls.rotateSpeed = 0.65;
    controls.panSpeed = 0.8;
    controls.screenSpacePanning = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.55, 0.4, 0.86
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());
    composerRef.current = composer;

    // Lighting
    setupLighting(scene);

    // Build the filter
    buildIndustrialFilter(scene, renderer);

    // Event listeners
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    setIsReady(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (composer) {
        composer.passes?.forEach((pass) => {
          if (pass.dispose) pass.dispose();
        });
      }
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      composerRef.current = null;
      hasInitializedRef.current = false;
    };
  }, [containerRef]);

  // Configuración de iluminación
  const setupLighting = useCallback((scene) => {
    const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x0b0f18, 0.55);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfff3e0, 2.6);
    key.position.set(24, 42, 26);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 110;
    key.shadow.camera.left = -30;
    key.shadow.camera.right = 30;
    key.shadow.camera.top = 30;
    key.shadow.camera.bottom = -30;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 4;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x4fd8ff, 0.5);
    rim.position.set(-30, 18, -20);
    scene.add(rim);

    const blueAccent = new THREE.PointLight(0x38bdf8, 6, 40, 2);
    blueAccent.position.set(-14, 9, -13);
    scene.add(blueAccent);

    const greenAccent = new THREE.PointLight(0x10e08a, 3, 30, 2);
    greenAccent.position.set(11, 4, 11);
    scene.add(greenAccent);
  }, []);

  // Registro de partes para desglose
  const registerPart = useCallback((mesh, explOffset, title, desc) => {
    if (!mesh.userData.assembledPos) {
      mesh.userData.assembledPos = mesh.position.clone();
    }
    if (!mesh.userData.explodedPos) {
      mesh.userData.explodedPos = mesh.position.clone().add(explOffset);
    }
    
    mesh.userData.title = title;
    mesh.userData.desc = desc;
    mesh.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    registeredObjects.current.push(mesh);
    return mesh;
  }, []);

  // Construcción del filtro industrial
  const buildIndustrialFilter = useCallback((scene, renderer) => {
    // Materiales PBR
    const pvcSet = makeMaterialSet({
      base: '#e9edf1',
      speckles: ['#ffffff', '#d7dee5'],
      density: 1800,
      minR: 0.6,
      maxR: 1.8,
      repeat: 2,
      bumpStrength: 0.5
    });
    const pvcMat = new THREE.MeshPhysicalMaterial({
      color: 0xf3f6f9,
      roughness: 0.32,
      metalness: 0.05,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      map: pvcSet.map,
      normalMap: pvcSet.normalMap,
      normalScale: new THREE.Vector2(0.25, 0.25)
    });

    const darkPvcSet = makeMaterialSet({
      base: '#1b1f27',
      speckles: ['#2a2f3a', '#0d0f14'],
      density: 2200,
      minR: 0.5,
      maxR: 1.6,
      repeat: 2,
      bumpStrength: 0.6
    });
    const darkPvcMat = new THREE.MeshPhysicalMaterial({
      color: 0x24272f,
      roughness: 0.42,
      metalness: 0.25,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      map: darkPvcSet.map,
      normalMap: darkPvcSet.normalMap,
      normalScale: new THREE.Vector2(0.3, 0.3)
    });

    const brassSet = makeMaterialSet({
      base: '#c9a35d',
      speckles: ['#e6c583', '#8a6a35'],
      density: 900,
      minR: 1,
      maxR: 3,
      repeat: 3,
      bumpStrength: 0.35
    });
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0aa66,
      metalness: 0.95,
      roughness: 0.28,
      clearcoat: 0.2,
      map: brassSet.map,
      normalMap: brassSet.normalMap,
      normalScale: new THREE.Vector2(0.15, 0.15)
    });

    const acrylicMat = new THREE.MeshPhysicalMaterial({
      color: 0xeaf7ff,
      metalness: 0.0,
      roughness: 0.045,
      ior: 1.49,
      transmission: 0.94,
      thickness: 0.9,
      transparent: true,
      opacity: 1,
      attenuationColor: new THREE.Color(0xbfe9ff),
      attenuationDistance: 6,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide,
      envMapIntensity: 1.2
    });

    // Base fija
    const baseMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(6.1, 6.3, 1, 96),
      darkPvcMat.clone()
    );
    baseMesh.position.y = -0.5;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);

    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x555b66,
      metalness: 0.9,
      roughness: 0.35
    });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.3, 12),
        boltMat
      );
      bolt.position.set(Math.cos(a) * 6.05, -0.15, Math.sin(a) * 6.05);
      bolt.castShadow = true;
      scene.add(bolt);
    }

    // Carcasa acrílica
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.2, 16, 128, 1, true),
      acrylicMat
    );
    tube.position.y = 8;
    tube.castShadow = false;
    tube.receiveShadow = false;
    scene.add(tube);

    const rimMat = darkPvcMat.clone();
    const rimTop = new THREE.Mesh(
      new THREE.TorusGeometry(4.22, 0.22, 16, 96),
      rimMat
    );
    rimTop.rotation.x = Math.PI / 2;
    rimTop.position.y = 8;
    rimTop.castShadow = true;
    const rimBottom = rimTop.clone();
    rimBottom.position.y = -8;
    tube.add(rimTop, rimBottom);

    registerPart(tube, new THREE.Vector3(0, 0, -12),
      "Carcasa de Acrílico",
      "Soporta presión y permite monitoreo visual del proceso"
    );

    // Capas filtrantes
    const r = 4.0;

    const poliSet = makeMaterialSet({
      base: '#f5f8fb',
      speckles: ['#ffffff', '#dfe6ec'],
      density: 5000,
      minR: 0.3,
      maxR: 1.1,
      repeat: 3,
      bumpStrength: 0.5
    });
    const poliMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.85,
      map: poliSet.map,
      normalMap: poliSet.normalMap,
      normalScale: new THREE.Vector2(0.4, 0.4)
    });
    const poliMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 1.5, 64),
      poliMat
    );
    poliMesh.position.y = 1.5;
    scene.add(poliMesh);
    registerPart(poliMesh, new THREE.Vector3(0, 0, 0),
      "Filtro Polipropileno (5µm)",
      "Filtración micro-física final antes de la salida"
    );

    const gacSet = makeMaterialSet({
      base: '#0c0c0e',
      speckles: ['#2a2a2e', '#000000'],
      density: 9000,
      minR: 0.5,
      maxR: 2.4,
      repeat: 3,
      bumpStrength: 1.8
    });
    const gacMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1c,
      roughness: 1,
      map: gacSet.map,
      normalMap: gacSet.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9)
    });
    const gacMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 3.5, 64),
      gacMat
    );
    gacMesh.position.y = 4;
    scene.add(gacMesh);
    registerPart(gacMesh, new THREE.Vector3(0, 2.5, 0),
      "Carbón Activado Granular",
      "Adsorción de metales pesados, cloro y orgánicos"
    );

    const sandFSet = makeMaterialSet({
      base: '#d9b98a',
      speckles: ['#efd7ad', '#a8834f'],
      density: 14000,
      minR: 0.4,
      maxR: 1.4,
      repeat: 3,
      bumpStrength: 1.0
    });
    const sandFMat = new THREE.MeshStandardMaterial({
      color: 0xd4b483,
      roughness: 0.82,
      map: sandFSet.map,
      normalMap: sandFSet.normalMap,
      normalScale: new THREE.Vector2(0.7, 0.7)
    });
    const sandFMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 3, 64),
      sandFMat
    );
    sandFMesh.position.y = 7.25;
    scene.add(sandFMesh);
    registerPart(sandFMesh, new THREE.Vector3(0, 5, 0),
      "Arena Sílica Fina",
      "Retención de sólidos suspendidos de tamaño medio"
    );

    const sandGSet = makeMaterialSet({
      base: '#bf8d5f',
      speckles: ['#e0ac72', '#6c4a30'],
      density: 9000,
      minR: 0.6,
      maxR: 2.0,
      repeat: 3,
      bumpStrength: 1.3
    });
    const sandGMat = new THREE.MeshStandardMaterial({
      color: 0xbc8a5f,
      roughness: 0.88,
      map: sandGSet.map,
      normalMap: sandGSet.normalMap,
      normalScale: new THREE.Vector2(0.8, 0.8)
    });
    const sandGMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 3, 64),
      sandGMat
    );
    sandGMesh.position.y = 10.25;
    scene.add(sandGMesh);
    registerPart(sandGMesh, new THREE.Vector3(0, 7.5, 0),
      "Arena Sílica Gruesa",
      "Capa de soporte y pre-filtrado mecánico"
    );

    const gravelSet = makeMaterialSet({
      base: '#767d85',
      speckles: ['#9aa1a8', '#3a4047'],
      density: 5500,
      minR: 1,
      maxR: 3.2,
      repeat: 3,
      bumpStrength: 2.0
    });
    const gravelMat = new THREE.MeshStandardMaterial({
      color: 0x737a82,
      roughness: 0.95,
      map: gravelSet.map,
      normalMap: gravelSet.normalMap,
      normalScale: new THREE.Vector2(1.1, 1.1)
    });
    const gravelMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 3, 64),
      gravelMat
    );
    gravelMesh.position.y = 13.25;
    scene.add(gravelMesh);
    registerPart(gravelMesh, new THREE.Vector3(0, 10, 0),
      "Grava de Cuarzo",
      "Retención de sedimentos pesados y distribución de flujo"
    );

    // Módulo de entrada
    const inGroup = new THREE.Group();
    const pipeIn = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 8, 48),
      pvcMat.clone()
    );
    pipeIn.rotation.z = Math.PI / 2;
    pipeIn.position.set(-4, 0, 0);
    pipeIn.castShadow = true;
    inGroup.add(pipeIn);

    const ultraBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.5, 1.5),
      darkPvcMat.clone()
    );
    ultraBody.position.set(-7, 1.5, 0);
    ultraBody.castShadow = true;
    inGroup.add(ultraBody);

    const turbInBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 2, 48),
      darkPvcMat.clone()
    );
    turbInBody.rotation.z = Math.PI / 2;
    turbInBody.position.set(-3, 0, 0);
    turbInBody.castShadow = true;
    inGroup.add(turbInBody);

    inGroup.position.y = 18;
    scene.add(inGroup);
    registerPart(inGroup, new THREE.Vector3(-4, 4, 0),
      "Módulo de Entrada (Sensores)",
      "Ultrasónico de nivel y turbidímetro inicial"
    );

    // Módulo de salida
    const outGroup = new THREE.Group();
    const pipeOut = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 8, 48),
      pvcMat.clone()
    );
    pipeOut.rotation.z = Math.PI / 2;
    pipeOut.position.set(4, 0, 0);
    pipeOut.castShadow = true;
    outGroup.add(pipeOut);

    const turbOutBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 2, 48),
      darkPvcMat.clone()
    );
    turbOutBody.rotation.z = Math.PI / 2;
    turbOutBody.position.set(2.5, 0, 0);
    turbOutBody.castShadow = true;
    outGroup.add(turbOutBody);

    const flowSensor = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 2.5, 48),
      brassMat.clone()
    );
    flowSensor.rotation.x = Math.PI / 2;
    flowSensor.position.set(6, 0, 0);
    flowSensor.castShadow = true;
    outGroup.add(flowSensor);

    outGroup.position.y = 1;
    scene.add(outGroup);
    registerPart(outGroup, new THREE.Vector3(4, -0.2, 0),
      "Módulo de Salida (Monitoreo)",
      "Caudalímetro YF-S201 y turbidímetro de pureza"
    );

    // Ground
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c111c,
      roughness: 0.78,
      metalness: 0.08
    });
    const groundSet = makeMaterialSet({
      base: '#0c111c',
      speckles: ['#141d2e', '#080b12', '#1b2740'],
      density: 3500,
      minR: 1,
      maxR: 4,
      repeat: 10,
      bumpStrength: 0.8
    });
    groundMat.map = groundSet.map;
    groundMat.normalMap = groundSet.normalMap;
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(70, 96),
      groundMat
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.05;
    ground.receiveShadow = true;
    scene.add(ground);
  }, [registerPart]);

  // Efecto de hover
  const handlePointerMove = useCallback((event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
    const hits = raycasterRef.current.intersectObjects(
      registeredObjects.current,
      true
    );
    const hit = hits.length
      ? findRegisteredAncestor(hits[0].object, registeredObjects.current)
      : null;
    setHoveredObject(hit);
  }, []);

  // Click para seleccionar
  const handleClick = useCallback(() => {
    const hovered = hoveredObjectRef.current;
    if (hovered && hovered.userData.title) {
      setSelectedObject(hovered);
      const onComponentSelect = onComponentSelectRef.current;
      if (onComponentSelect) {
        onComponentSelect({
          title: hovered.userData.title,
          desc: hovered.userData.desc
        });
      }
    }
  }, []);

  // Toggle explode
  const toggleExplode = useCallback(() => {
    const nextExploded = !isExplodedRef.current;
    setIsExploded(nextExploded);
    isExplodedRef.current = nextExploded;

    if (isFilteringRef.current) {
      setIsFiltering(false);
      isFilteringRef.current = false;
    }
    setSelectedObject(null);
    
    // Ajustar cámara
    if (!nextExploded) {
      setCameraFocus({
        pos: new THREE.Vector3(45, 28, 55),
        target: new THREE.Vector3(0, 14, 0)
      });
    } else {
      setCameraFocus({
        pos: DEFAULT_CAM_POS.clone(),
        target: DEFAULT_TARGET.clone()
      });
    }
  }, []);

  // Toggle simulación
  const toggleSimulation = useCallback(() => {
    if (isExplodedRef.current) {
      return { error: 'Ensambla el hardware primero' };
    }

    const nextFiltering = !isFilteringRef.current;
    setIsFiltering(nextFiltering);
    isFilteringRef.current = nextFiltering;

    if (nextFiltering) {
      setMetrics({
        status: 'FILTRANDO',
        flow: '0.0 L/M',
        turbIn: '480 NTU',
        turbOut: '0 NTU'
      });
      setTimeout(() => {
        if (isFilteringRef.current) {
          setMetrics(prev => ({
            ...prev,
            turbOut: '12 NTU',
            flow: '3.2 L/M'
          }));
        }
      }, 3500);
    } else {
      setMetrics({
        status: 'SISTEMA LISTO',
        flow: '0.0 L/M',
        turbIn: '0 NTU',
        turbOut: '0 NTU'
      });
    }
  }, []);

  // Toggle auto rotate
  const toggleAutoRotate = useCallback(() => {
    setAutoRotate(prev => {
      const next = !prev;
      autoRotateRef.current = next;
      return next;
    });
  }, []);

  // Emitir partículas de agua
  const emitWaterParticles = useCallback((isDirty, startPos) => {
    if (!sceneRef.current) return;

    const mat = new THREE.MeshPhysicalMaterial({
      color: isDirty ? 0x7a5a34 : 0x2fd8ff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      ior: 1.33,
      roughness: 0.04,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      attenuationColor: isDirty ? new THREE.Color(0x5a4020) : new THREE.Color(0xaef2ff),
      attenuationDistance: 1.5,
      envMapIntensity: 1.4
    });
    const geo = new THREE.SphereGeometry(0.11 + Math.random() * 0.05, 12, 12);
    const drop = new THREE.Mesh(geo, mat);
    drop.position.set(
      startPos.x + (Math.random() - 0.5) * 0.8,
      startPos.y,
      startPos.z + (Math.random() - 0.5) * 0.8
    );
    drop.userData.vy = 0;
    sceneRef.current.add(drop);
    waterParticles.current.push({ mesh: drop, isDirty });
  }, []);

  // Animar
  const animate = useCallback(() => {
    if (!rendererRef.current) return;
    animationIdRef.current = requestAnimationFrame(animate);

    const delta = clockRef.current.getDelta();

    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotateRef.current;
      controlsRef.current.update();
    }

    // Camera focus animation
    const focus = cameraFocusRef.current;
    if (focus && cameraRef.current && controlsRef.current) {
      const t = 0.055;
      cameraRef.current.position.lerp(focus.pos, t);
      controlsRef.current.target.lerp(focus.target, t);
      if (cameraRef.current.position.distanceTo(focus.pos) < 0.12 &&
          controlsRef.current.target.distanceTo(focus.target) < 0.12) {
        setCameraFocus(null);
      }
    }

    // Explode animation
    registeredObjects.current.forEach(obj => {
      const target = isExplodedRef.current ? obj.userData.explodedPos : obj.userData.assembledPos;
      if (target) {
        obj.position.x = lerp(obj.position.x, target.x, 0.055);
        obj.position.y = lerp(obj.position.y, target.y, 0.055);
        obj.position.z = lerp(obj.position.z, target.z, 0.055);
      }
    });

    // Water particles
    if (isFilteringRef.current && !isExplodedRef.current && sceneRef.current) {
      if (Math.random() > 0.15) {
        emitWaterParticles(true, new THREE.Vector3(-1.5, 18, 0));
      }
      if (metricsRef.current.flow !== "0.0 L/M" && Math.random() > 0.25) {
        emitWaterParticles(false, new THREE.Vector3(2, 1, 0));
      }
    }

    // Update water particles
    for (let i = waterParticles.current.length - 1; i >= 0; i--) {
      const p = waterParticles.current[i].mesh;
      const isDirty = waterParticles.current[i].isDirty;
      if (isDirty) {
        p.userData.vy = (p.userData.vy || 0) - 0.012;
        p.position.y += p.userData.vy;
        if (p.position.x < 0) p.position.x += 0.05;
        p.rotation.x += 0.02;
        if (p.position.y < 14 && sceneRef.current) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.15, 0.03, 8, 24),
            new THREE.MeshBasicMaterial({
              color: 0x8a6a3a,
              transparent: true,
              opacity: 0.8
            })
          );
          ring.position.copy(new THREE.Vector3(p.position.x, 14, p.position.z));
          ring.rotation.x = Math.PI / 2;
          sceneRef.current.add(ring);
          splashes.current.push({ mesh: ring, life: 0 });
          sceneRef.current.remove(p);
          waterParticles.current.splice(i, 1);
        }
      } else {
        p.position.x += 0.16;
        p.position.y -= 0.008;
        if (p.position.x > 9 && sceneRef.current) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.15, 0.03, 8, 24),
            new THREE.MeshBasicMaterial({
              color: 0x4fe8ff,
              transparent: true,
              opacity: 0.8
            })
          );
          ring.position.copy(new THREE.Vector3(9, p.position.y, p.position.z));
          ring.rotation.x = Math.PI / 2;
          sceneRef.current.add(ring);
          splashes.current.push({ mesh: ring, life: 0 });
          sceneRef.current.remove(p);
          waterParticles.current.splice(i, 1);
        }
      }
    }

    // Update splashes
    for (let i = splashes.current.length - 1; i >= 0; i--) {
      const s = splashes.current[i];
      s.life += delta * 2.2;
      s.mesh.scale.setScalar(1 + s.life * 3);
      s.mesh.material.opacity = Math.max(0, 0.8 - s.life);
      if (s.life > 0.8 && sceneRef.current) {
        sceneRef.current.remove(s.mesh);
        splashes.current.splice(i, 1);
      }
    }

    // Render
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, [emitWaterParticles]);

  // Inicializar
  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      return;
    }

    const cleanup = initScene();
    animate();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('click', handleClick);
    }

    return () => {
      if (cleanup) cleanup();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('click', handleClick);
      }
      registeredObjects.current = [];
      waterParticles.current = [];
      splashes.current = [];
    };
  }, [isOpen, initScene, animate, handlePointerMove, handleClick]);

  return {
    isReady,
    isExploded,
    isFiltering,
    autoRotate,
    selectedObject,
    hoveredObject,
    metrics,
    toggleExplode,
    toggleSimulation,
    toggleAutoRotate,
    setSelectedObject,
    setCameraFocus,
    explodableObjects: registeredObjects.current,
  };
};

export default useThree;