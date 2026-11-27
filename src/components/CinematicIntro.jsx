import { useEffect, useRef, useState } from 'react'

const WORD_LETTERS = 'TREVIORA'.split('')

/**
 * Full-screen cinematic startup intro for TREVIORA.
 * Plays on initial website launch with responsive desktop & mobile scaling.
 */
export default function CinematicIntro({ onComplete }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.location.pathname.startsWith('/admin')
  })
  const [done, setDone] = useState(false)
  const [pct, setPct] = useState(0)
  const [progress, setProgress] = useState(0)

  const canvasRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    if (!visible) return undefined
    mountedRef.current = true

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = rm ? 1200 : 5200

    document.documentElement.classList.add('tv-lock')

    let particleRaf = 0
    let onResize = null

    if (!rm && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      let W = 0
      let H = 0
      const particles = []

      const resize = () => {
        W = canvas.width = Math.floor(window.innerWidth * dpr)
        H = canvas.height = Math.floor(window.innerHeight * dpr)
      }
      resize()
      onResize = resize
      window.addEventListener('resize', resize, { passive: true })

      const count = window.innerWidth < 600 ? 30 : 56
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (Math.random() * 1.4 + 0.4) * dpr,
          vx: (Math.random() - 0.5) * 0.3 * dpr,
          vy: (Math.random() - 0.5) * 0.3 * dpr,
        })
      }

      const draw = () => {
        if (!mountedRef.current || !ctx) return
        ctx.clearRect(0, 0, W, H)
        const lim = (window.innerWidth < 600 ? 95 : 130) * dpr
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i]
          p.x = (p.x + p.vx + W) % W
          p.y = (p.y + p.vy + H) % H
          ctx.fillStyle = 'rgba(170,200,255,.7)'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, 6.283)
          ctx.fill()
          for (let j = i + 1; j < particles.length; j += 1) {
            const q = particles[j]
            const dx = p.x - q.x
            const dy = p.y - q.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < lim) {
              ctx.strokeStyle = `rgba(90,140,255,${(1 - dist / lim) * 0.25})`
              ctx.lineWidth = dpr
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.stroke()
            }
          }
        }
        particleRaf = requestAnimationFrame(draw)
      }
      particleRaf = requestAnimationFrame(draw)
    }

    const t0 = performance.now()
    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    if (!loaded) window.addEventListener('load', onLoad, { once: true })

    let tickRaf = 0
    let t1 = 0
    let t2 = 0
    let finished = false

    const finish = () => {
      finished = true
      setProgress(1)
      setPct(100)
      t1 = window.setTimeout(() => {
        if (!mountedRef.current) return
        setDone(true)
        t2 = window.setTimeout(() => {
          if (!mountedRef.current) return
          document.documentElement.classList.remove('tv-lock')
          try {
            sessionStorage.setItem('tv-intro', '1')
          } catch { /* ignore */ }
          document.dispatchEvent(new Event('tv:intro-done'))
          setVisible(false)
          if (onComplete) onComplete()
        }, rm ? 350 : 2000)
      }, rm ? 150 : 500)
    }

    const tick = (now) => {
      if (!mountedRef.current) return
      const k = Math.min((now - t0) / minMs, 1)
      if (!finished) {
        const eased = Math.min(0.99, 1 - Math.pow(1 - k, 2))
        setProgress(eased)
        setPct(Math.round(eased * 100))
      }
      if (k >= 1 && loaded) {
        if (!finished) finish()
        return
      }
      tickRaf = requestAnimationFrame(tick)
    }
    tickRaf = requestAnimationFrame(tick)

    return () => {
      mountedRef.current = false
      if (particleRaf) cancelAnimationFrame(particleRaf)
      if (tickRaf) cancelAnimationFrame(tickRaf)
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)
      if (onResize) window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
      document.documentElement.classList.remove('tv-lock')
    }
  }, [visible, onComplete])

  if (!visible) return null

  const statusText =
    pct < 35
      ? 'Initializing core'
      : pct < 70
        ? 'Loading modules'
        : pct < 100
          ? 'Calibrating systems'
          : 'Ready'

  return (
    <div
      id="tv-splash"
      className={done ? 'done' : ''}
      role="status"
      aria-label="Loading Treviora"
    >
      <div className="tv-grid" aria-hidden="true" />
      <canvas ref={canvasRef} id="tv-canvas" aria-hidden="true" />
      <div className="tv-vig" aria-hidden="true" />
      <i className="tv-c tl" aria-hidden="true" />
      <i className="tv-c tr" aria-hidden="true" />
      <i className="tv-c bl" aria-hidden="true" />
      <i className="tv-c br" aria-hidden="true" />

      <div className="tv-stage">
        <div className="tv-mark">
          <div className="tv-flash" aria-hidden="true" />
          <img className="tv-ring" src="/images/tv-ring.png" alt="" />
          <img className="tv-body" src="/images/tv-body.png" alt="TREVIORA" />
          <div className="tv-scanline" aria-hidden="true" />
          <div className="tv-shock" aria-hidden="true" />
          <div className="tv-streak" aria-hidden="true" />
          <div className="tv-streak b" aria-hidden="true" />
        </div>

        <div className="tv-word" id="tv-word" aria-label="Treviora">
          {WORD_LETTERS.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              aria-hidden="true"
              style={{ animationDelay: `${(2.9 + i * 0.07).toFixed(2)}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

        <p className="tv-tag">Engineering Tomorrow. Empowering Humanity.</p>
      </div>

      <div className="tv-hud">
        <span id="tv-status">{statusText}</span>
        <div className="tv-line">
          <i id="tv-fill" style={{ '--p': progress }} />
        </div>
        <span id="tv-pct">{pct}%</span>
      </div>
    </div>
  )
}
