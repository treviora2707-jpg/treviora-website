import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const INTRO_SESSION_KEY = 'treviora_intro_seen'

/**
 * Signature once-per-session opening cinematic sequence on "/":
 * 1) Dark navy stage + tiny cyan center spark expanding into dual energy rings
 * 2) Refractive light reveal of the TREVIORA symbol emblem
 * 3) Kinetic brand wordmark reveal ("TREVIORA INDUSTRY")
 * 4) Cyan-violet wave sweep -> smooth portal dissolution into the live site
 */
export default function CinematicIntro({ onComplete }) {
  const { pathname } = useLocation()
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (window.location.pathname !== '/') return false
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== '1'
    } catch {
      return false
    }
  })

  const rootRef = useRef(null)
  const sparkRef = useRef(null)
  const ringOuterRef = useRef(null)
  const ringInnerRef = useRef(null)
  const logoWrapRef = useRef(null)
  const logoGlowRef = useRef(null)
  const brandCharsRef = useRef([])
  const subtitleRef = useRef(null)
  const waveRef = useRef(null)
  const tlRef = useRef(null)

  const finishIntro = (immediate = false) => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1')
    } catch { /* ignore */ }

    if (tlRef.current && immediate) {
      tlRef.current.kill()
    }

    const root = rootRef.current
    if (!root || immediate) {
      if (root) {
        gsap.to(root, {
          opacity: 0,
          duration: 0.28,
          ease: 'power2.out',
          onComplete: () => {
            setActive(false)
            if (onComplete) onComplete()
          },
        })
      } else {
        setActive(false)
        if (onComplete) onComplete()
      }
      return
    }

    setActive(false)
    if (onComplete) onComplete()
  }

  useEffect(() => {
    if (pathname !== '/' && active) {
      finishIntro(true)
    }
  }, [pathname, active])

  useEffect(() => {
    if (!active) return undefined

    const root = rootRef.current
    const spark = sparkRef.current
    const ringOuter = ringOuterRef.current
    const ringInner = ringInnerRef.current
    const logoWrap = logoWrapRef.current
    const logoGlow = logoGlowRef.current
    const chars = brandCharsRef.current.filter(Boolean)
    const subtitle = subtitleRef.current
    const wave = waveRef.current
    if (!root || !spark || !ringOuter || !ringInner || !logoWrap) return undefined

    const tl = gsap.timeline({
      onComplete: () => finishIntro(false),
    })
    tlRef.current = tl

    tl.set(root, { clipPath: 'circle(100% at 50% 50%)', opacity: 1 })
      .set(spark, { scale: 0, opacity: 1 })
      .set([ringOuter, ringInner], { scale: 0.15, opacity: 0, rotation: 0 })
      .set(logoWrap, { clipPath: 'inset(50% 0% 50% 0%)', scale: 0.84, opacity: 0 })
      .set(logoGlow, { opacity: 0, scale: 0.7 })
      .set(chars, { y: 18, opacity: 0, filter: 'blur(4px)' })
      .set(subtitle, { y: 10, opacity: 0, letterSpacing: '0.45em' })
      .set(wave, { xPercent: -120, opacity: 0.85 })

    // 1. Center cyan spark ignites
    tl.to(spark, { scale: 1.4, duration: 0.34, ease: 'power3.out' })
      .to(spark, { scale: 0.2, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0.36)

    // 2. Concentric cyan & violet energy rings expand
    tl.to(ringOuter, { scale: 1, opacity: 0.85, rotation: 48, duration: 0.65, ease: 'expo.out' }, 0.24)
      .to(ringInner, { scale: 1, opacity: 0.75, rotation: -64, duration: 0.6, ease: 'expo.out' }, 0.3)

    // 3. TREVIORA emblem light-refraction reveal
    tl.to(logoGlow, { opacity: 0.9, scale: 1.15, duration: 0.55, ease: 'power2.out' }, 0.42)
      .to(logoWrap, {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        opacity: 1,
        duration: 0.62,
        ease: 'expo.out',
      }, 0.46)

    // 4. Kinetic character typography reveal
    tl.to(chars, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.42,
      stagger: 0.032,
      ease: 'power3.out',
    }, 0.78)
      .to(subtitle, {
        y: 0,
        opacity: 1,
        letterSpacing: '0.28em',
        duration: 0.46,
        ease: 'power2.out',
      }, 0.98)

    // 5. Cyan-violet energy wave sweep + seamless iris reveal into homepage
    tl.to(wave, { xPercent: 125, duration: 0.65, ease: 'power2.inOut' }, 1.25)
      .to(root, {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0.2,
        duration: 0.56,
        ease: 'expo.inOut',
      }, 1.56)

    return () => {
      tl.kill()
    }
  }, [active])

  if (!active) return null

  const brandLetters = 'TREVIORA INDUSTRY'.split('')

  return (
    <div
      ref={rootRef}
      className="treviora-cinematic-intro"
      role="dialog"
      aria-label="TREVIORA Opening Experience"
    >
      <div className="intro-radial-mist" aria-hidden="true" />
      <div ref={waveRef} className="intro-energy-wave" aria-hidden="true" />

      <div className="intro-center-stage">
        <div className="intro-emblem-rig">
          <div ref={sparkRef} className="intro-core-spark" aria-hidden="true" />
          <div ref={ringOuterRef} className="intro-energy-ring outer" aria-hidden="true" />
          <div ref={ringInnerRef} className="intro-energy-ring inner" aria-hidden="true" />
          <div ref={logoGlowRef} className="intro-logo-refraction" aria-hidden="true" />

          <div ref={logoWrapRef} className="intro-logo-frame">
            <img src="/images/treviora-symbol.png" alt="TREVIORA Logo" />
          </div>
        </div>

        <div className="intro-wordmark" aria-label="TREVIORA INDUSTRY">
          {brandLetters.map((char, idx) => (
            <span
              key={idx}
              ref={(el) => { brandCharsRef.current[idx] = el }}
              className={`intro-char${char === ' ' ? ' is-space' : idx >= 9 ? ' is-cyan' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        <p ref={subtitleRef} className="intro-subtitle">TURNING IDEAS INTO DIGITAL SOLUTIONS</p>
      </div>

      <button
        type="button"
        className="intro-skip-btn"
        onClick={() => finishIntro(true)}
      >
        Skip Intro <span>↗</span>
      </button>
    </div>
  )
}
