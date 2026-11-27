import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import partnerLogos from '../data/partnerLogos.json'

/**
 * Interactive 3D extruded spinning partner logo powered by Three.js.
 * Falls back to a static image on WebGL failure or prefers-reduced-motion.
 */
export default function PartnerLogo3D({ logoIndex = 0, alt = 'Partner logo' }) {
  const logoData = partnerLogos[logoIndex]
  const canvasRef = useRef(null)
  const [fallback, setFallback] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!logoData || fallback || !canvasRef.current) return undefined

    const canvas = canvasRef.current
    let renderer = null
    let geometry = null
    let capMat = null
    let sideMat = null
    let texture = null
    let rafId = 0
    let isVisible = true
    let observer = null

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
      camera.position.z = 8

      scene.add(new THREE.AmbientLight(0xffffff, 0.72))
      const keyLight = new THREE.DirectionalLight(0xffffff, 0.92)
      keyLight.position.set(2, 3, 5)
      scene.add(keyLight)
      const backLight = new THREE.DirectionalLight(0xffffff, 0.62)
      backLight.position.set(-2, 2, -5)
      scene.add(backLight)

      const W = logoData.w
      const H = logoData.h
      const toVecs = (arr) => {
        const res = []
        for (let i = 0; i < arr.length; i += 2) {
          res.push(new THREE.Vector2(arr[i], H - arr[i + 1]))
        }
        return res
      }

      const shapes = logoData.s.map((sh) => {
        const shape = new THREE.Shape(toVecs(sh.o))
        if (Array.isArray(sh.h)) {
          sh.h.forEach((hole) => shape.holes.push(new THREE.Path(toVecs(hole))))
        }
        return shape
      })

      const depth = Math.max(W, H) * 0.05
      geometry = new THREE.ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: false,
        curveSegments: 1,
      })

      const uv = geometry.attributes.uv
      const pos = geometry.attributes.position
      const nor = geometry.attributes.normal
      for (let i = 0; i < pos.count; i += 1) {
        let u = pos.getX(i) / W
        if (nor.getZ(i) < -0.5) u = 1 - u
        uv.setXY(i, u, pos.getY(i) / H)
      }
      geometry.translate(-W / 2, -H / 2, -depth / 2)

      texture = new THREE.TextureLoader().load(logoData.t)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy?.() || 4)

      capMat = new THREE.MeshStandardMaterial({
        map: texture,
        emissiveMap: texture,
        emissive: 0xffffff,
        emissiveIntensity: 0.6,
        roughness: 0.5,
        metalness: 0.1,
      })
      sideMat = new THREE.MeshStandardMaterial({
        color: logoData.sc,
        roughness: 0.4,
        metalness: 0.35,
      })

      const mesh = new THREE.Mesh(geometry, [capMat, sideMat])
      mesh.scale.setScalar(3.35 / Math.max(W, H))
      scene.add(mesh)

      let targetX = 0
      let targetY = 0
      let hovering = false
      let lastWidth = 0

      const onPointerMove = (e) => {
        hovering = true
        const rect = canvas.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 0.45
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * 0.28
      }

      const onPointerReset = () => {
        hovering = false
        targetX = 0
        targetY = 0
      }

      canvas.addEventListener('pointermove', onPointerMove, { passive: true })
      canvas.addEventListener('pointerleave', onPointerReset)
      canvas.addEventListener('pointercancel', onPointerReset)

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            isVisible = entries[0]?.isIntersecting ?? true
          },
          { threshold: 0.05 },
        )
        observer.observe(canvas)
      }

      const renderFrame = (time) => {
        rafId = requestAnimationFrame(renderFrame)
        if (!isVisible) return

        const w = canvas.clientWidth
        if (w > 0 && lastWidth !== w) {
          lastWidth = w
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          renderer.setPixelRatio(dpr)
          renderer.setSize(w, w, false)
        }

        const idleY = hovering ? targetX : Math.sin(time * 0.0011 + logoIndex * 1.4) * 0.28
        const idleX = hovering ? targetY : Math.cos(time * 0.0009 + logoIndex) * 0.08
        mesh.rotation.y += (idleY - mesh.rotation.y) * 0.08
        mesh.rotation.x += (idleX - mesh.rotation.x) * 0.08

        renderer.render(scene, camera)
      }

      rafId = requestAnimationFrame(renderFrame)

      return () => {
        if (rafId) cancelAnimationFrame(rafId)
        if (observer) observer.disconnect()
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerleave', onPointerReset)
        canvas.removeEventListener('pointercancel', onPointerReset)
        geometry?.dispose()
        capMat?.dispose()
        sideMat?.dispose()
        texture?.dispose()
        renderer?.dispose()
      }
    } catch {
      setFallback(true)
      return undefined
    }
  }, [logoData, logoIndex, fallback])

  if (!logoData) return null

  if (fallback) {
    return (
      <img
        className="partner-logo-fallback"
        src={logoData.t}
        alt={alt}
        loading="lazy"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="partner-logo-canvas"
      aria-label={alt}
    />
  )
}
