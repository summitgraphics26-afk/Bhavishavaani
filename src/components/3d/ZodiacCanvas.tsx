import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ZODIAC_SIGNS, NAVAGRAHAS } from '../../data/astrologyData';
import { Compass, RotateCw, Eye, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

// Pre-allocated math objects to prevent garbage collection in render loop
const _vec3 = new THREE.Vector3();
const _targetCameraPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3(0, 0, 0);
const _currentLookAt = new THREE.Vector3(0, 0, 0);

interface ZodiacCanvasProps {
  onSelectZodiac?: (signId: string) => void;
  selectedZodiacId?: string;
}

export const ZodiacCanvas: React.FC<ZodiacCanvasProps> = ({
  onSelectZodiac,
  selectedZodiacId
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraView, setCameraView] = useState<'cinematic' | 'zenith' | 'horizon'>('cinematic');
  const [activeSignIndex, setActiveSignIndex] = useState<number>(0);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mutable refs for Three.js scene instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const zodiacWheelGroupRef = useRef<THREE.Group | null>(null);
  const planetsGroupRef = useRef<THREE.Group | null>(null);
  const planetMeshesRef = useRef<{ mesh: THREE.Group; speed: number; radius: number; angle: number }[]>([]);
  const targetRotationYRef = useRef(0);
  const currentRotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseXRef = useRef(0);

  // Keep autoRotate state ref for render loop without re-triggering effect
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const cameraViewRef = useRef(cameraView);
  cameraViewRef.current = cameraView;

  // Generate procedural high-resolution Zodiac Ring Texture
  const createZodiacTexture = useCallback((): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const cx = 1024;
    const cy = 1024;

    // Dark celestial background
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle cosmic radial gradient
    const bgRad = ctx.createRadialGradient(cx, cy, 300, cx, cy, 1000);
    bgRad.addColorStop(0, '#0c102c');
    bgRad.addColorStop(0.6, '#080a1c');
    bgRad.addColorStop(1, '#03040a');
    ctx.fillStyle = bgRad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Helper: draw concentric circles
    const drawRing = (r: number, color: string, width: number, dash: number[] = []) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Draw intricate concentric gold rings
    drawRing(980, 'rgba(212, 175, 55, 0.4)', 2);
    drawRing(950, 'rgba(212, 175, 55, 0.85)', 5);
    drawRing(925, 'rgba(212, 175, 55, 0.3)', 1.5);
    drawRing(720, 'rgba(212, 175, 55, 0.7)', 3);
    drawRing(700, 'rgba(212, 175, 55, 0.3)', 1, [4, 4]);
    drawRing(450, 'rgba(212, 175, 55, 0.5)', 2);
    drawRing(430, 'rgba(139, 92, 246, 0.4)', 1.5);
    drawRing(300, 'rgba(212, 175, 55, 0.6)', 2);

    // Degree tick marks (360 degrees around rim)
    for (let deg = 0; deg < 360; deg++) {
      const rad = (deg * Math.PI) / 180;
      const isMajor = deg % 30 === 0;
      const isMedium = deg % 10 === 0;
      const isMinor = deg % 2 === 0;

      if (!isMajor && !isMedium && !isMinor) continue;

      const innerR = isMajor ? 915 : isMedium ? 930 : 940;
      const outerR = 950;
      const x1 = cx + Math.cos(rad) * innerR;
      const y1 = cy + Math.sin(rad) * innerR;
      const x2 = cx + Math.cos(rad) * outerR;
      const y2 = cy + Math.sin(rad) * outerR;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isMajor
        ? 'rgba(254, 240, 138, 0.95)'
        : isMedium
        ? 'rgba(212, 175, 55, 0.7)'
        : 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = isMajor ? 3 : isMedium ? 1.5 : 0.8;
      ctx.stroke();
    }

    // 12 Astrological Houses / Rashis Section Dividers & Text
    for (let i = 0; i < 12; i++) {
      const startAngle = (i * 30 * Math.PI) / 180;
      const midAngle = ((i * 30 + 15) * Math.PI) / 180;

      // Division radial lines from inner to outer ring
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(startAngle) * 450, cy + Math.sin(startAngle) * 450);
      ctx.lineTo(cx + Math.cos(startAngle) * 950, cy + Math.sin(startAngle) * 950);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const sign = ZODIAC_SIGNS[i];

      // Draw Zodiac Symbol (Large Golden Glyph)
      const symbolRadius = 835;
      const sx = cx + Math.cos(midAngle) * symbolRadius;
      const sy = cy + Math.sin(midAngle) * symbolRadius;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(midAngle + Math.PI / 2);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 44px "Cinzel", "Apple Color Emoji", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fillText(sign.symbol, 0, 0);
      ctx.restore();

      // Draw Sanskrit Name & English Name
      const textRadius = 780;
      const tx = cx + Math.cos(midAngle) * textRadius;
      const ty = cy + Math.sin(midAngle) * textRadius;

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(midAngle + Math.PI / 2);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '600 20px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sign.name.toUpperCase(), 0, -10);

      ctx.fillStyle = '#d4af37';
      ctx.font = '16px "Cormorant Garamond", serif';
      const sanskritShort = sign.sanskritName.split(' ')[0];
      ctx.fillText(sanskritShort, 0, 12);
      ctx.restore();

      // Draw inner house degree indication
      const innerTextRadius = 490;
      const ix = cx + Math.cos(midAngle) * innerTextRadius;
      const iy = cy + Math.sin(midAngle) * innerTextRadius;
      ctx.save();
      ctx.translate(ix, iy);
      ctx.rotate(midAngle + Math.PI / 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.55)';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i * 30}°`, 0, 0);
      ctx.restore();
    }

    // Sacred Vedic Octagram / 12-Star sacred geometry in center
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 12; i++) {
      const a1 = (i * 30 * Math.PI) / 180;
      const a2 = (((i + 4) % 12) * 30 * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a1) * 440, cy + Math.sin(a1) * 440);
      ctx.lineTo(cx + Math.cos(a2) * 440, cy + Math.sin(a2) * 440);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js skill instructions
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene & Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04050d);
    scene.fog = new THREE.FogExp2(0x04050d, 0.022);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 12, 17);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Studio Environment map via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 2. Studio Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(0xffecc4, 2.8);
    warmKeyLight.position.set(12, 18, 10);
    scene.add(warmKeyLight);

    const coolFillLight = new THREE.DirectionalLight(0x7dd3fc, 1.2);
    coolFillLight.position.set(-12, 10, -10);
    scene.add(coolFillLight);

    const royalPurpleRim = new THREE.PointLight(0xa855f7, 3.5, 30);
    royalPurpleRim.position.set(0, -6, -4);
    scene.add(royalPurpleRim);

    const hemiLight = new THREE.HemisphereLight(0xbfdbfe, 0x1e1b4b, 0.8);
    scene.add(hemiLight);

    // 3. Central Solar Core (Surya - Radiant Star)
    const sunGroup = new THREE.Group();
    
    // Core glowing sphere
    const sunGeo = new THREE.SphereGeometry(1.35, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xffaa22,
      emissive: 0xff7700,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.1
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Warm solar corona halo rings
    const sunCoronaGeo = new THREE.RingGeometry(1.4, 2.3, 48);
    const sunCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xffb84d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sunCoronaMesh = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
    sunCoronaMesh.rotation.x = Math.PI / 2;
    sunGroup.add(sunCoronaMesh);

    scene.add(sunGroup);

    // 4. Astrological Zodiac Wheel Disc
    const zodiacWheelGroup = new THREE.Group();
    zodiacWheelGroupRef.current = zodiacWheelGroup;

    const zodiacTexture = createZodiacTexture();
    zodiacTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Upper Zodiac Plane with procedural high-res texture
    const discRadius = 9.2;
    const discGeo = new THREE.CylinderGeometry(discRadius, discRadius, 0.18, 96);
    
    const brassEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.2,
      envMapIntensity: 1.5
    });

    const discTopMat = new THREE.MeshStandardMaterial({
      map: zodiacTexture,
      roughness: 0.35,
      metalness: 0.65,
      bumpScale: 0.05
    });

    const discBottomMat = new THREE.MeshStandardMaterial({
      color: 0x090b16,
      roughness: 0.8,
      metalness: 0.3
    });

    // Cylinder material array: [side, top, bottom]
    const discMesh = new THREE.Mesh(discGeo, [brassEdgeMat, discTopMat, discBottomMat]);
    zodiacWheelGroup.add(discMesh);

    // Outer Beveled Brass Frame Rings
    const outerRingGeo = new THREE.TorusGeometry(discRadius + 0.1, 0.14, 16, 120);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    zodiacWheelGroup.add(outerRingMesh);

    // Mid Sacred Geometry Wire Ring
    const midTorusGeo = new THREE.TorusGeometry(4.35, 0.06, 16, 96);
    const midTorusMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      metalness: 0.9,
      roughness: 0.2
    });
    const midTorusMesh = new THREE.Mesh(midTorusGeo, midTorusMat);
    midTorusMesh.rotation.x = Math.PI / 2;
    midTorusMesh.position.y = 0.1;
    zodiacWheelGroup.add(midTorusMesh);

    scene.add(zodiacWheelGroup);

    // 5. Planetary Orbits & Floating 3D Planets (Navagrahas)
    const planetsGroup = new THREE.Group();
    planetsGroupRef.current = planetsGroup;
    scene.add(planetsGroup);

    const planetMeshes: { mesh: THREE.Group; speed: number; radius: number; angle: number }[] = [];

    // Filter planets (excluding Sun which is center)
    const planetsToRender = NAVAGRAHAS.filter(p => p.id !== 'sun');

    planetsToRender.forEach((p, idx) => {
      const pGroup = new THREE.Group();

      // Orbital track ring
      const orbitTrackGeo = new THREE.BufferGeometry();
      const pointsCount = 96;
      const trackPoints: number[] = [];
      for (let i = 0; i <= pointsCount; i++) {
        const theta = (i / pointsCount) * Math.PI * 2;
        trackPoints.push(Math.cos(theta) * p.orbitRadius, 0, Math.sin(theta) * p.orbitRadius);
      }
      orbitTrackGeo.setAttribute('position', new THREE.Float32BufferAttribute(trackPoints, 3));
      const orbitTrackMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(p.color).multiplyScalar(0.7),
        transparent: true,
        opacity: 0.28
      });
      const orbitLine = new THREE.Line(orbitTrackGeo, orbitTrackMat);
      orbitLine.position.y = 0.35 + idx * 0.12;
      planetsGroup.add(orbitLine);

      // Planet Sphere
      const sphereGeo = new THREE.SphereGeometry(p.size, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(p.color),
        roughness: 0.35,
        metalness: 0.45,
        emissive: new THREE.Color(p.color),
        emissiveIntensity: 0.25
      });
      const planetSphere = new THREE.Mesh(sphereGeo, sphereMat);
      pGroup.add(planetSphere);

      // Special Saturn Rings
      if (p.id === 'saturn') {
        const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.3, 36);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0x93c5fd,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          roughness: 0.3,
          metalness: 0.5
        });
        const saturnRing = new THREE.Mesh(ringGeo, ringMat);
        saturnRing.rotation.x = Math.PI / 2.6;
        saturnRing.rotation.y = Math.PI / 8;
        pGroup.add(saturnRing);
      }

      // Moon for Earth / Chandra
      if (p.id === 'moon') {
        const moonGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(0.75, 0.2, 0);
        pGroup.add(moonMesh);
      }

      // Soft glow sprite beneath planet
      const glowGeo = new THREE.PlaneGeometry(p.size * 2.6, p.size * 2.6);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(p.color),
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.rotation.x = -Math.PI / 2;
      glowMesh.position.y = -p.size * 0.5;
      pGroup.add(glowMesh);

      planetsGroup.add(pGroup);

      const initialAngle = (idx * (Math.PI * 2)) / planetsToRender.length;
      planetMeshes.push({
        mesh: pGroup,
        speed: p.orbitSpeed * 0.008,
        radius: p.orbitRadius,
        angle: initialAngle
      });
    });

    planetMeshesRef.current = planetMeshes;

    // 6. Deep Cosmic Starfield & Stardust Particles
    const starCount = isSoftwareGl ? 800 : 2200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const paletteColors = [
      new THREE.Color(0xfef08a), // gold
      new THREE.Color(0xffffff), // white
      new THREE.Color(0x93c5fd), // celestial blue
      new THREE.Color(0xc084fc), // royal purple
      new THREE.Color(0xfca5a5)  // cosmic coral
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 18 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // slightly flattened galaxy
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = paletteColors[Math.floor(Math.random() * paletteColors.length)];
      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Ground contact shadow disc beneath zodiac wheel
    const contactShadowGeo = new THREE.CircleGeometry(discRadius * 1.1, 48);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x020307,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadowMesh.rotation.x = -Math.PI / 2;
    contactShadowMesh.position.y = -0.15;
    scene.add(contactShadowMesh);

    // 7. Interactive Drag Handlers for rotation
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      previousMouseXRef.current = clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - previousMouseXRef.current;
      previousMouseXRef.current = clientX;
      // Drag rotates wheel directly
      targetRotationYRef.current += deltaX * 0.006;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto rotation of Zodiac wheel if enabled and not currently dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotationYRef.current += delta * 0.12;
      }

      // Smooth exponential damping on Zodiac wheel rotation
      currentRotationYRef.current = THREE.MathUtils.damp(
        currentRotationYRef.current,
        targetRotationYRef.current,
        6.0,
        delta
      );

      if (zodiacWheelGroupRef.current) {
        zodiacWheelGroupRef.current.rotation.y = currentRotationYRef.current;
      }

      // Orbit planets
      planetMeshesRef.current.forEach(p => {
        p.angle += p.speed;
        const x = Math.cos(p.angle) * p.radius;
        const z = Math.sin(p.angle) * p.radius;
        p.mesh.position.set(x, 0.35, z);
        p.mesh.rotation.y += delta * 0.8;
      });

      // Slowly rotate celestial starfield for cosmic parallax
      starField.rotation.y += delta * 0.015;

      // Update camera position based on selected camera view
      if (cameraRef.current) {
        const view = cameraViewRef.current;
        if (view === 'cinematic') {
          _targetCameraPos.set(0, 11.5, 16.5);
          _targetLookAt.set(0, 0, 0);
        } else if (view === 'zenith') {
          _targetCameraPos.set(0, 20.5, 0.01);
          _targetLookAt.set(0, 0, 0);
        } else if (view === 'horizon') {
          _targetCameraPos.set(0, 3.8, 14.5);
          _targetLookAt.set(0, 0.5, 0);
        }

        cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, _targetCameraPos.x, 3.5, delta);
        cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, _targetCameraPos.y, 3.5, delta);
        cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, _targetCameraPos.z, 3.5, delta);

        _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 4.0, delta);
        _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 4.0, delta);
        _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 4.0, delta);

        cameraRef.current.lookAt(_currentLookAt);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      // Dispose Three.js objects
      zodiacTexture.dispose();
      discGeo.dispose();
      outerRingGeo.dispose();
      midTorusGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      renderer.dispose();
    };
  }, [createZodiacTexture]);

  // Handle focus on specific Zodiac sign
  const handleSelectSign = (index: number) => {
    setActiveSignIndex(index);
    const sign = ZODIAC_SIGNS[index];
    if (onSelectZodiac) onSelectZodiac(sign.id);

    // Rotate wheel so the selected sign points forward toward camera (-Z or +Z alignment)
    // 12 signs = 30 deg each
    const targetRad = -((index * 30 + 15) * Math.PI) / 180 + Math.PI / 2;
    targetRotationYRef.current = targetRad;
  };

  const activeSign = ZODIAC_SIGNS[activeSignIndex];

  return (
    <div 
      className="relative w-full h-[400px] min-[390px]:h-[450px] sm:h-[560px] md:h-[680px] lg:h-[760px] overflow-hidden select-none touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full touch-pan-y"
      />

      {/* Top subtle vignette overlays for seamless blend into cosmic background */}
      <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#03040a] via-[#03040a]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#03040a] via-[#03040a]/80 to-transparent pointer-events-none" />

      {/* Left/Right subtle vignette to keep attention focused on celestial wheel */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-[#03040a] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-[#03040a] to-transparent pointer-events-none" />

      {/* Minimal drag hint badge (top-right, non-obstructive) */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c1024]/80 border border-[#d4af37]/30 text-xs text-[#d4af37]">
        <Compass className="w-3.5 h-3.5 text-[#fef08a]" />
        <span>Drag to rotate celestial sphere</span>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Following Three.js skill directives: zero viewport occlusion) */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 w-[96%] sm:w-[92%] max-w-2xl flex flex-col items-center">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsDockCollapsed(!isDockCollapsed)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 mb-1 rounded-t-lg bg-[#0b0e24]/90 border-t border-x border-[#d4af37]/40 text-[10px] min-[360px]:text-xs text-[#e2e8f0] hover:text-[#fef08a] transition-colors backdrop-blur-md cursor-pointer shrink-0"
          title={isDockCollapsed ? 'Show 3D Controls' : 'Hide 3D Controls for Cinema View'}
        >
          {isDockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]" />
              <span>Explore Zodiac Signs & Camera Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]" />
              <span>Collapse Controls (Cinema View)</span>
            </>
          )}
        </button>

        {/* The Bottom Dock Container */}
        {!isDockCollapsed && (
          <div className="w-full p-2.5 min-[360px]:p-3 sm:p-4 rounded-xl bg-[#080b1e]/95 border border-[#d4af37]/35 shadow-2xl backdrop-blur-md transition-all">
            {/* Top row: Active Zodiac Sign Highlights */}
            <div className="flex flex-col min-[480px]:flex-row items-start min-[480px]:items-center justify-between gap-2 min-[360px]:gap-2.5 pb-2.5 border-b border-[#2a2b48] min-w-0">
              <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#a855f7]/20 border border-[#d4af37]/50 flex items-center justify-center text-base sm:text-xl text-[#fef08a] font-bold shrink-0">
                  {activeSign.symbol}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#f8fafc] tracking-wide truncate">
                      {activeSign.name}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#d4af37] font-cormorant font-semibold shrink-0">
                      {activeSign.sanskritName}
                    </span>
                  </div>
                  <div className="text-[10px] min-[360px]:text-[11px] text-[#94a3b8] flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                    <span>Graha: <strong className="text-[#fef08a]">{activeSign.rulingPlanet.split(' ')[0]}</strong></span>
                    <span>•</span>
                    <span>Tattva: <strong className="text-[#38bdf8]">{activeSign.element.split(' ')[0]}</strong></span>
                  </div>
                </div>
              </div>

              {/* View & Rotation Mode Toggles */}
              <div className="flex items-center gap-1.5 self-end min-[480px]:self-center shrink-0">
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2 py-1 rounded-lg border text-[10px] min-[360px]:text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                    autoRotate
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fef08a]'
                      : 'bg-[#131733] border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle celestial rotation"
                >
                  <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{autoRotate ? 'Orbiting' : 'Paused'}</span>
                </button>

                {/* Camera View Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-[#0e122b] border border-slate-700 text-[10px] min-[360px]:text-xs">
                  <button
                    onClick={() => setCameraView('cinematic')}
                    className={`px-1.5 min-[360px]:px-2 py-0.5 min-[360px]:py-1 rounded-md transition-colors cursor-pointer ${
                      cameraView === 'cinematic'
                        ? 'bg-[#d4af37] text-[#080a14] font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Angled
                  </button>
                  <button
                    onClick={() => setCameraView('zenith')}
                    className={`px-1.5 min-[360px]:px-2 py-0.5 min-[360px]:py-1 rounded-md transition-colors cursor-pointer ${
                      cameraView === 'zenith'
                        ? 'bg-[#d4af37] text-[#080a14] font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Top
                  </button>
                  <button
                    onClick={() => setCameraView('horizon')}
                    className={`px-1.5 min-[360px]:px-2 py-0.5 min-[360px]:py-1 rounded-md transition-colors cursor-pointer ${
                      cameraView === 'horizon'
                        ? 'bg-[#d4af37] text-[#080a14] font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Horizon
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom row: 12 Zodiac Sign Selector Badges */}
            <div className="pt-2 flex items-center gap-1 min-[360px]:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              {ZODIAC_SIGNS.map((sign, idx) => {
                const isSelected = activeSignIndex === idx;
                return (
                  <button
                    key={sign.id}
                    onClick={() => handleSelectSign(idx)}
                    className={`shrink-0 flex items-center gap-1 px-2 min-[360px]:px-2.5 py-0.5 min-[360px]:py-1 rounded-md text-[10px] min-[360px]:text-xs transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#080a14] font-bold border-[#fef08a] shadow-md shadow-[#d4af37]/30 scale-105'
                        : 'bg-[#0f1430] text-slate-300 border-slate-800 hover:border-[#d4af37]/50 hover:text-[#fef08a]'
                    }`}
                  >
                    <span>{sign.symbol}</span>
                    <span className="hidden sm:inline font-cinzel">{sign.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
