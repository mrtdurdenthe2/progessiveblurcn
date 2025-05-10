'use client'

import { useEffect, useRef } from 'react'

interface ProgressiveBlurProps {
  /** Absolute URL or path to the image that will be blurred */
  imageSrc: string
  /** Width of the canvas in CSS pixels */
  width: number
  /** Height of the canvas in CSS pixels */
  height: number
  /** Optional CSS className for positioning */
  className?: string
}

/**
 * Renders a WebGL-powered progressive blur effect that fades out as we move downwards.
 * The component uses the lightweight `ogl` library together with a custom GLSL shader inspired by
 * Jorge Toloza's tutorial on Codrops (https://tympanus.net/codrops/2024/07/02/progressive-blur-effect-using-webgl-with-ogl-and-glsl-shaders/).
 */
export default function ProgressiveBlur({ imageSrc, width, height, className }: ProgressiveBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let animationFrameId: number
    let cleanup: (() => void) | undefined

    // Dynamically import to avoid SSR issues
    import('ogl').then((ogl) => {
      const { Renderer, Camera, Transform, Plane, Program, Texture, Mesh } = ogl as any
      const canvas = canvasRef.current
      if (!canvas) return

      // Initialise renderer
      const renderer = new Renderer({ canvas, alpha: true, antialias: true })
      const gl = renderer.gl as WebGLRenderingContext
      // Use an orthographic camera so 1 unit == 1 pixel (simpler mapping)
      const camera = new Camera(gl)
      camera.fov = 15
      camera.position.z = 2

      const scene = new Transform()
      const geometry = new Plane(gl)

      // ----- Texture -------------------------------------------------------
      const texture = new Texture(gl)
      const image = new Image()
      image.src = imageSrc
      image.onload = () => {
        texture.image = image
      }

      // ----- Shader program ------------------------------------------------
      const program = new Program(gl, {
        vertex: `
          precision highp float;

          attribute vec3 position;
          attribute vec2 uv;

          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;

          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragment: `
          precision highp float;

          uniform sampler2D tMap;
          uniform float uTime;
          varying vec2 vUv;

          float rand(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }

          vec3 sampleImage(vec2 uv) {
            return texture2D(tMap, uv).rgb;
          }

          // Simple radial blur (reduced sample count for mobile performance)
          vec3 blur(vec2 uv, float amount) {
            vec3 acc = vec3(0.0);
            const float SAMPLES = 20.0;
            for (float i = 0.0; i < SAMPLES; i++) {
              float angle = 6.28318530718 * (i / SAMPLES);
              vec2 dir = vec2(cos(angle), sin(angle));
              vec2 offset = dir * (rand(vec2(i, uTime)) + amount) * amount;
              acc += sampleImage(uv + offset);
            }
            return acc / SAMPLES;
          }

          void main() {
            // Create a vertical gradient that is 1.0 at the very top (vUv.y≈1.0) and fades to 0 around 70% height.
            float gradient = smoothstep(1.0, 0.7, vUv.y);
            // Blend between sharp and blurred based on gradient.
            vec3 sharp = sampleImage(vUv);
            vec3 blurred = blur(vUv, 0.015);
            vec3 color = mix(sharp, blurred, gradient);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
          tMap: { value: texture },
          uTime: { value: 0 },
        },
        transparent: true,
      })

      const mesh = new Mesh(gl, { geometry, program })
      // Scale plane to match canvas dimensions so one fragment maps to one pixel.
      mesh.scale.set(2, 2 * (height / width), 1)
      scene.addChild(mesh)

      // Handle resize — since the parent dictates canvas size we just update renderer;
      const handleResize = () => {
        renderer.setSize(width, height)
      }
      handleResize()

      // Render loop ---------------------------------------------------------
      const update = () => {
        program.uniforms.uTime.value += 0.02
        renderer.render({ scene, camera })
        animationFrameId = requestAnimationFrame(update)
      }
      update()

      // Cleanup -------------------------------------------------------------
      cleanup = () => {
        cancelAnimationFrame(animationFrameId)
        program.destroy?.()
        mesh.destroy?.()
        renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext()
      }
    })

    return () => {
      cleanup?.()
    }
  }, [imageSrc, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pointer-events-none ${className ?? ''}`}
    />
  )
}
