import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * TREVIORA INDUSTRY — Reusable Global Motion Architecture
 * Orchestrates 4 bespoke signature transition personalities, 3D kinetic typography,
 * masked scroll reveals, and hardware-conscious 60fps cleanup.
 */

export const ROUTE_ORDER = {
  '/': 0,
  '/about': 1,
  '/services': 2,
  '/work': 3,
  '/projects': 3,
  '/pricing': 4,
  '/team': 5,
  '/profile': 5,
  '/contact': 6,
  '/connect': 6,
  '/admin': 7,
}

export function getRouteIndex(pathname, services = [], people = []) {
  if (pathname in ROUTE_ORDER) return ROUTE_ORDER[pathname]
  if (services.some((s) => `/${s.slug}` === pathname) || pathname === '/ppt' || pathname === '/video') return 2
  if (pathname.startsWith('/team/') || people.some((p) => p.route === pathname)) return 5
  return 8
}

export function isNavPathActive(navPath, currentPath, services = [], people = []) {
  if (navPath === '/') return currentPath === '/'
  if (navPath === '/services') {
    return (
      currentPath === '/services' ||
      services.some((s) => `/${s.slug}` === currentPath) ||
      currentPath === '/ppt' ||
      currentPath === '/video'
    )
  }
  if (navPath === '/work') return currentPath === '/work' || currentPath === '/projects'
  if (navPath === '/team') {
    return (
      currentPath === '/team' ||
      currentPath === '/profile' ||
      currentPath.startsWith('/team/') ||
      people.some((p) => p.route === currentPath)
    )
  }
  if (navPath === '/contact') return currentPath === '/contact' || currentPath === '/connect'
  return currentPath === navPath
}

export function getTransitionPersonality(pathname, services = [], people = []) {
  if (
    pathname === '/services' ||
    services.some((s) => `/${s.slug}` === pathname) ||
    pathname === '/ppt' ||
    pathname === '/video'
  ) {
    return 'shutter'
  }
  if (pathname === '/work' || pathname === '/projects' || pathname === '/pricing') {
    return 'portal'
  }
  if (
    pathname === '/team' ||
    pathname === '/profile' ||
    pathname.startsWith('/team/') ||
    people.some((p) => p.route === pathname)
  ) {
    return 'editorial'
  }
  return 'horizon'
}

function resolveRefEl(maybeRef) {
  return maybeRef && 'current' in maybeRef ? maybeRef.current : maybeRef
}

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
}

/**
 * Custom TREVIORA Multi-Variant Route Exit:
 * Mobile uses pure GPU transform+opacity (~180ms) for zero lag;
 * Desktop uses personality clip-path aperture + warp zoom (~260ms).
 */
export function runSignatureTransitionOut(stageEl, curtainRefs, dir, nextPath, services, people, onSwap) {
  const stage = resolveRefEl(stageEl)
  const root = resolveRefEl(curtainRefs?.root)
  const line = resolveRefEl(curtainRefs?.line)
  const panel = resolveRefEl(curtainRefs?.panel)
  const crest = resolveRefEl(curtainRefs?.crest)
  const sweep = resolveRefEl(curtainRefs?.sweep)

  if (!stage || !root || !panel) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    onSwap()
    return null
  }

  const mobile = isMobileViewport()
  const personality = getTransitionPersonality(nextPath, services, people)
  gsap.killTweensOf([stage, root, line, panel, crest, sweep].filter(Boolean))

  const tl = gsap.timeline({
    onComplete: () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      onSwap()
    },
  })

  if (mobile) {
    tl.set(root, { autoAlpha: 1 })
      .set(panel, { clipPath: 'none', opacity: 0, force3D: true })
      .set(line, { scaleX: 0, opacity: 1, force3D: true })
      .set(crest, { opacity: 0, scale: 0.92, force3D: true })

    tl.to(stage, {
      opacity: 0,
      x: -dir * 16,
      scale: 0.97,
      force3D: true,
      duration: 0.16,
      ease: 'power2.in',
    }, 0)
      .to(panel, {
        opacity: 0.96,
        duration: 0.15,
        ease: 'power2.out',
      }, 0)
      .to(line, {
        scaleX: 1,
        duration: 0.13,
        ease: 'power3.out',
      }, 0)
      .to(crest, {
        opacity: 1,
        scale: 1,
        duration: 0.12,
        ease: 'power2.out',
      }, 0.04)

    return tl
  }

  const startClip =
    personality === 'portal'
      ? 'circle(0% at 50% 50%)'
      : personality === 'editorial'
        ? (dir >= 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)')
        : 'inset(50% 0% 50% 0%)'

  const fullClip =
    personality === 'portal' ? 'circle(125% at 50% 50%)' : 'inset(0% 0% 0% 0%)'

  tl.set(root, { autoAlpha: 1 })
    .set(panel, { clipPath: startClip, opacity: 1, force3D: true })
    .set(line, { scaleX: 0, opacity: 1, force3D: true })
    .set(crest, { opacity: 0, scale: 0.88, force3D: true })
    .set(sweep, { xPercent: -115, opacity: 0.95, force3D: true })

  tl.to(stage, {
    opacity: 0.1,
    x: -dir * (personality === 'editorial' ? 32 : 22),
    scale: personality === 'portal' ? 0.955 : 0.98,
    force3D: true,
    duration: 0.24,
    ease: 'power2.in',
  }, 0)

  tl.to(line, {
    scaleX: 1,
    duration: 0.17,
    ease: 'power3.out',
  }, 0)

  tl.to(panel, {
    clipPath: fullClip,
    duration: 0.24,
    ease: 'power3.inOut',
  }, 0.04)

  tl.to(line, {
    opacity: 0,
    duration: 0.12,
  }, 0.16)

  tl.to(crest, {
    opacity: 1,
    scale: 1,
    duration: 0.16,
    ease: 'power2.out',
  }, 0.12)

  tl.to(sweep, {
    xPercent: 125,
    duration: 0.26,
    ease: 'power2.inOut',
  }, 0.08)

  return tl
}

/**
 * Custom TREVIORA Route Reveal:
 * Mobile uses fast GPU transform+opacity (~220ms);
 * Desktop uses personality clip-path reveal + warp settle (~420ms).
 */
export function runSignatureTransitionIn(stageEl, curtainRefs, dir, currentPath, services, people, onSettled) {
  const stage = resolveRefEl(stageEl)
  const root = resolveRefEl(curtainRefs?.root)
  const panel = resolveRefEl(curtainRefs?.panel)
  const crest = resolveRefEl(curtainRefs?.crest)
  const line = resolveRefEl(curtainRefs?.line)
  if (!stage) return null

  const mobile = isMobileViewport()
  const personality = getTransitionPersonality(currentPath, services, people)

  const tl = gsap.timeline({
    onComplete: () => {
      if (root) gsap.set(root, { autoAlpha: 0 })
      if (onSettled) onSettled()
    },
  })

  if (mobile) {
    if (root && panel && crest) {
      tl.to([crest, line].filter(Boolean), {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.in',
      }, 0)
        .to(panel, {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.out',
        }, 0.02)
    }

    tl.fromTo(
      stage,
      {
        opacity: 0.08,
        x: dir * 16,
        scale: 1.02,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        force3D: true,
        duration: 0.24,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      },
      0.04
    )

    return tl
  }

  const exitClip =
    personality === 'portal'
      ? 'circle(0% at 50% 50%)'
      : personality === 'editorial'
        ? (dir >= 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)')
        : personality === 'shutter'
          ? 'inset(0% 0% 100% 0%)'
          : 'inset(100% 0% 0% 0%)'

  if (root && panel && crest) {
    tl.to(crest, {
      opacity: 0,
      scale: 1.06,
      duration: 0.16,
      ease: 'power2.in',
    }, 0)
    .to(panel, {
      clipPath: exitClip,
      duration: 0.36,
      ease: 'expo.inOut',
    }, 0.03)
  }

  tl.fromTo(
    stage,
    {
      opacity: 0.12,
      x: dir * (personality === 'editorial' ? 30 : 22),
      scale: personality === 'portal' ? 1.024 : 1.014,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      force3D: true,
      duration: 0.42,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    },
    0.06
  )

  return tl
}

/**
 * Hero Grand Cinematic Experience ("/"):
 * 3D character perspective movie-title entrance + metric cascade + 3D emblem settle.
 */
export function playHeroCinematicSequence(heroElement) {
  if (!heroElement) return
  const heroChars = heroElement.querySelectorAll('.hero-copy h1 .text-reveal-char')
  const heroWords = heroElement.querySelectorAll('.hero-copy h1 .text-reveal-word')
  const heroTargets = heroChars.length ? heroChars : heroWords
  const heroTagline = heroElement.querySelectorAll('.hero-tagline-classy, .hero-tagline')
  const heroParagraph = heroElement.querySelectorAll('.hero-intro')
  const heroButtons = heroElement.querySelectorAll('.hero-actions .button')
  const heroPills = heroElement.querySelectorAll('.hero-pill-badge')
  const heroArt = heroElement.querySelectorAll('.hero-art')
  const heroCaps = heroElement.querySelectorAll('.hero-capabilities .capability-item')

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (heroTargets.length) {
    heroTl.fromTo(
      heroTargets,
      {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 36,
        rotateX: 38,
        opacity: 0.25,
        filter: 'blur(4px)',
        transformPerspective: 900,
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.66,
        stagger: heroChars.length ? 0.022 : 0.05,
        clearProps: 'clipPath,transform,opacity,filter',
      }
    )
  }

  if (heroTagline.length) {
    heroTl.fromTo(
      heroTagline,
      { y: 14, opacity: 0.45, letterSpacing: '0.04em' },
      { y: 0, opacity: 1, letterSpacing: '0.01em', duration: 0.56, clearProps: 'transform,opacity,letterSpacing' },
      '-=0.42'
    )
  }
  if (heroParagraph.length) {
    heroTl.fromTo(
      heroParagraph,
      { y: 14, opacity: 0.5 },
      { y: 0, opacity: 1, duration: 0.54, clearProps: 'transform,opacity' },
      '-=0.38'
    )
  }
  if (heroButtons.length) {
    heroTl.fromTo(
      heroButtons,
      { y: 14, opacity: 0.55, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.48, stagger: 0.08, clearProps: 'transform,opacity' },
      '-=0.36'
    )
  }
  if (heroPills.length) {
    heroTl.fromTo(
      heroPills,
      { y: 10, opacity: 0.6 },
      { y: 0, opacity: 1, duration: 0.42, stagger: 0.06, clearProps: 'transform,opacity' },
      '-=0.3'
    )
  }
  if (heroArt.length) {
    heroTl.fromTo(
      heroArt,
      { opacity: 0.65, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.78, ease: 'expo.out', clearProps: 'opacity,transform' },
      0.08
    )
  }
  if (heroCaps.length) {
    heroTl.fromTo(
      heroCaps,
      { y: 16, opacity: 0.75 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.045, clearProps: 'transform,opacity' },
      '-=0.45'
    )
  }
}

/**
 * Unique Subpage Personality Sequences for Services, Work, Team, Contact, About & Pricing.
 */
export function playSubHeroCinematicSequence(subHero, pathname = '', services = [], people = []) {
  if (!subHero) return
  const personality = getTransitionPersonality(pathname, services, people)

  const subChars = subHero.querySelectorAll('.page-hero-inner h1 .text-reveal-char')
  const subWords = subHero.querySelectorAll('.page-hero-inner h1 .text-reveal-word')
  const subTargets = subChars.length ? subChars : subWords
  const subParagraph = subHero.querySelectorAll('.page-hero-inner > p')
  const subButtons = subHero.querySelectorAll('.page-hero-actions .button')
  const subVisualCard = subHero.querySelector('.page-hero-card')
  const subVisualImg = subHero.querySelector('.page-hero-image-frame img')

  const subTl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } })

  if (subTargets.length) {
    subTl.fromTo(
      subTargets,
      {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: personality === 'editorial' ? 24 : 32,
        rotateX: personality === 'portal' ? 28 : 40,
        opacity: 0.35,
        filter: 'blur(3.5px)',
        transformPerspective: 900,
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: personality === 'editorial' ? 0.7 : 0.62,
        stagger: subChars.length ? 0.018 : 0.045,
        clearProps: 'clipPath,transform,opacity,filter',
      }
    )
  }

  if (subParagraph.length) {
    subTl.fromTo(
      subParagraph,
      { y: 14, opacity: 0.55 },
      { y: 0, opacity: 1, duration: 0.52, clearProps: 'opacity,transform' },
      '-=0.42'
    )
  }

  if (subButtons.length) {
    subTl.fromTo(
      subButtons,
      { y: 12, opacity: 0.6, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.48, stagger: 0.08, clearProps: 'opacity,transform' },
      '-=0.36'
    )
  }

  if (subVisualCard) {
    const visualFrom =
      personality === 'portal'
        ? { clipPath: 'circle(24% at 50% 50%)', scale: 0.9, opacity: 0.6 }
        : personality === 'editorial'
          ? { clipPath: 'inset(0% 0% 14% 0% round 22px)', y: 24, scale: 0.95, opacity: 0.65 }
          : {
              clipPath: 'inset(10% 0% 10% 0% round 22px)',
              x: 24,
              scale: 0.94,
              rotateY: 6,
              opacity: 0.65,
              transformPerspective: 1100,
            }

    subTl.fromTo(
      subVisualCard,
      visualFrom,
      {
        clipPath: 'inset(0% 0% 0% 0% round 22px)',
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        opacity: 1,
        duration: 0.84,
        ease: 'expo.out',
        clearProps: 'clipPath,opacity,transform',
      },
      0.08
    )
  }

  if (subVisualImg) {
    subTl.fromTo(
      subVisualImg,
      { scale: 1.1 },
      { scale: 1, duration: 1.1, ease: 'power2.out', clearProps: 'transform' },
      0.08
    )
  }
}
