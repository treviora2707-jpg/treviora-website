import { useCallback, useEffect, useRef, useState } from 'react'

const WORD_LETTERS = 'TREVIORA'.split('')

/**
 * Full-screen warp-starfield cinematic startup intro for TREVIORA.
 * Replaces the previous intro; responsive across desktop and mobile viewports.
 */
export default function CinematicIntro({ onComplete }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.location.pathname.startsWith('/admin')
  })
  const [open, setOpen] = useState(false)

  const canvasRef = useRef(null)
  const doneRef = useRef(false)
  const mountedRef = useRef(true)
  const autoTimerRef = useRef(0)
  const unmountTimerRef = useRef(0)

  const handleOpen = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current)
      autoTimerRef.current = 0
    }
    setOpen(true)
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    unmountTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return
      document.documentElement.classList.remove('tv-lock')
      try {
        sessionStorage.setItem('tv-intro', '1')
      } catch { /* ignore */ }
      document.dispatchEvent(new Event('tv:intro-done'))
      setVisible(false)
      if (onComplete) onComplete()
    }, rm ? 120 : 1600)
  }, [onComplete])

  useEffect(() => {
    if (!visible) return undefined
    mountedRef.current = true
    doneRef.current = false
    document.documentElement.classList.add('tv-lock')

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    autoTimerRef.current = window.setTimeout(handleOpen, rm ? 600 : 7300)

    let rafId = 0
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

      const count = window.innerWidth < 640 ? 90 : 140
      for (let i = 0; i < count; i += 1) {
        particles.push({
          a: Math.random() * 6.283,
          d: Math.random() * 0.6,
          z: (Math.random() * 1.2 + 0.4) * dpr,
        })
      }

      const t0 = performance.now()
      const draw = () => {
        if (!mountedRef.current || doneRef.current || !ctx) return
        const t = (performance.now() - t0) / 1000
        const sp = Math.max(0.0015, 0.05 * Math.exp(-t * 1.1))
        const cx = W / 2
        const cy = H * 0.46
        const maxR = Math.hypot(W, H) / 2

        ctx.fillStyle = 'rgba(1,3,16,.28)'
        ctx.fillRect(0, 0, W, H)

        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i]
          let d0 = p.d
          p.d += sp * (0.3 + p.d * 2.2)
          if (p.d > 1.05) {
            p.d = Math.random() * 0.05
            p.a = Math.random() * 6.283
            d0 = p.d
          }
          const ca = Math.cos(p.a)
          const sa = Math.sin(p.a)
          ctx.strokeStyle = `rgba(${(110 + p.z * 50) | 0},160,255,${Math.min(p.d * 1.4, 0.9)})`
          ctx.lineWidth = p.z
          ctx.beginPath()
          ctx.moveTo(cx + ca * d0 * maxR, cy + sa * d0 * maxR)
          ctx.lineTo(cx + ca * p.d * maxR, cy + sa * p.d * maxR)
          ctx.stroke()
        }
        rafId = requestAnimationFrame(draw)
      }
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      mountedRef.current = false
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current)
      if (rafId) cancelAnimationFrame(rafId)
      if (onResize) window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('tv-lock')
    }
  }, [visible, handleOpen])

  if (!visible) return null

  return (
    <>
      <div
        className={`tv2-intro${open ? ' open' : ''}`}
        role="status"
        aria-label="Loading Treviora"
      >
        <canvas ref={canvasRef} className="tv2-canvas" aria-hidden="true" />
        <div className="tv2-vig" aria-hidden="true" />
        <div className="tv2-flare" aria-hidden="true" />
        <div className="tv2-shock" aria-hidden="true" />

        <div className="tv2-cam">
          <div className="tv2-stage">
            <div className="tv2-v" />
            <div className="tv2-r" />
            <div className="tv2-shine" />
          </div>

          <div className="tv2-word" aria-label="Treviora">
            {WORD_LETTERS.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                aria-hidden="true"
                className={i === 2 ? 'tv2-e' : undefined}
                style={{ animationDelay: `${(4.3 + i * 0.09).toFixed(2)}s` }}
              >
                {ch}
              </span>
            ))}
          </div>

          <div className="tv2-tag">ENGINEERING TOMORROW, EMPOWERING HUMANITY</div>
        </div>
      </div>

      {!open && (
        <button type="button" className="tv2-skip" onClick={handleOpen}>
          Skip intro
        </button>
      )}
    </>
  )
}
