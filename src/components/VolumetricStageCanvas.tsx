import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VolumetricStageCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  className?: string;
}

export const VolumetricStageCanvas: React.FC<VolumetricStageCanvasProps> = ({
  scrollProgressRef,
  mouseRef,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

          // Parallax shift from pointer
          vec2 m = uMouse * 0.08;

          // Overhead architectural softbox light beam cones
          float coneCenter = abs(p.x - m.x * 0.8);
          float beamY = clamp(1.0 - uv.y, 0.0, 1.0);
          float spotlight = exp(-coneCenter * coneCenter * (3.2 + uScroll * 1.4)) * smoothstep(0.0, 0.85, uv.y);

          // Left & right angled softbox beams matching studio stage
          float leftBeam = exp(-pow((p.x + 0.42 - m.x * 0.4) - (1.0 - uv.y) * 0.25, 2.0) * 18.0) * smoothstep(0.1, 0.95, uv.y);
          float rightBeam = exp(-pow((p.x - 0.42 - m.x * 0.4) + (1.0 - uv.y) * 0.25, 2.0) * 18.0) * smoothstep(0.1, 0.95, uv.y);

          // Subtle low-lying stage mist / hearth warmth near floor
          float n1 = noise(vec2(p.x * 2.4 + uTime * 0.06, uv.y * 3.0 - uTime * 0.04));
          float n2 = noise(vec2(p.x * 5.0 - uTime * 0.08, uv.y * 6.0 + uTime * 0.03));
          float mist = (n1 * 0.65 + n2 * 0.35) * smoothstep(0.58, 0.04, uv.y);

          vec3 coolStudio = vec3(0.76, 0.82, 0.90) * (spotlight * 0.18 + (leftBeam + rightBeam) * 0.14);
          vec3 warmHearth = vec3(0.78, 0.58, 0.32) * (mist * 0.16 + spotlight * 0.06);

          vec3 color = coolStudio + warmHearth;
          float alpha = clamp(length(color) * 1.35, 0.0, 0.55);

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;
      uniforms.uScroll.value += (scrollProgressRef.current - uniforms.uScroll.value) * 0.08;
      uniforms.uMouse.value.x += (mouseRef.current.x - uniforms.uMouse.value.x) * 0.08;
      uniforms.uMouse.value.y += (mouseRef.current.y - uniforms.uMouse.value.y) * 0.08;

      renderer.render(scene, camera);
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef, mouseRef]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};
