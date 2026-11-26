import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Lightweight lazy-loaded Three.js WebGL atmospheric depth layer:
 * subtle 3D floating particle dust, delicate cyan/violet geometric orbit rings,
 * and gentle pointer/scroll parallax. Auto-pauses when tab is hidden and disposes cleanly.
 */
export default function CinematicBackdrop3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.innerWidth < 768) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
    } catch {
      return undefined
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 18

    // Subtle 3D Particle Starfield
    const count = 140
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#00e5ff')
    const violet = new THREE.Color('#8b5cf6')
    const silver = new THREE.Color('#dbe4f0')

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      positions[idx] = (Math.random() - 0.5) * 34
      positions[idx + 1] = (Math.random() - 0.5) * 22
      positions[idx + 2] = (Math.random() - 0.5) * 16 - 4

      const pick = i % 5 === 0 ? cyan : i % 7 === 0 ? violet : silver
      colors[idx] = pick.r
      colors[idx + 1] = pick.g
      colors[idx + 2] = pick.b
    }

    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // Delicate Futuristic Orbital Geometry (Far Background Depth)
    const rigGroup = new THREE.Group()
    rigGroup.position.set(4.5, 0.4, -7)
    scene.add(rigGroup)

    const outerRingGeo = new THREE.TorusGeometry(6.4, 0.022, 12, 96)
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: '#13b9f5',
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    })
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat)
    outerRing.rotation.x = Math.PI * 0.36
    outerRing.rotation.y = Math.PI * 0.18
    rigGroup.add(outerRing)

    const innerRingGeo = new THREE.TorusGeometry(4.6, 0.018, 10, 84)
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: '#8b5cf6',
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    })
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat)
    innerRing.rotation.x = -Math.PI * 0.28
    innerRing.rotation.y = Math.PI * 0.42
    rigGroup.add(innerRing)

    const coreIcoGeo = new THREE.IcosahedronGeometry(2.1, 1)
    const coreWireGeo = new THREE.WireframeGeometry(coreIcoGeo)
    const coreWireMat = new THREE.LineBasicMaterial({
      color: '#00e5ff',
      transparent: true,
      opacity: 0.075,
    })
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat)
    rigGroup.add(coreWire)

    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0
    let scrollFactor = 0

    const onPointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollFactor = window.scrollY / maxScroll
    }

    const onResize = () => {
      const nextW = window.innerWidth
      const nextH = window.innerHeight
      camera.aspect = nextW / nextH
      camera.updateProjectionMatrix()
      renderer.setSize(nextW, nextH)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    let rafId = null
    let lastTime = performance.now()

    const renderFrame = (now) => {
      if (document.hidden) {
        rafId = null
        return
      }
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      currentMouseX += (targetMouseX - currentMouseX) * 0.04
      currentMouseY += (targetMouseY - currentMouseY) * 0.04

      starField.rotation.y += dt * 0.018
      starField.rotation.x = currentMouseY * 0.08 + scrollFactor * 0.14
      starField.position.x = -currentMouseX * 0.65

      outerRing.rotation.z += dt * 0.08
      innerRing.rotation.z -= dt * 0.11
      coreWire.rotation.y += dt * 0.09
      coreWire.rotation.x += dt * 0.05

      rigGroup.position.y = 0.4 - scrollFactor * 2.4 - currentMouseY * 0.45
      rigGroup.position.x = 4.5 + currentMouseX * 0.6

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(renderFrame)
    }

    const startLoop = () => {
      if (!rafId && !document.hidden) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(renderFrame)
      }
    }

    const onVisChange = () => {
      if (!document.hidden) startLoop()
    }
    document.addEventListener('visibilitychange', onVisChange)

    startLoop()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisChange)

      starGeo.dispose()
      starMat.dispose()
      outerRingGeo.dispose()
      outerRingMat.dispose()
      innerRingGeo.dispose()
      innerRingMat.dispose()
      coreIcoGeo.dispose()
      coreWireGeo.dispose()
      coreWireMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="treviora-webgl-backdrop" aria-hidden="true" />
}
