/**
 * Frontend input sanitization, XSS URL validation, and client-side rate limiting.
 */

export function sanitizeText(value, maxLength = 500) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeMultilineText(value, maxLength = 2500) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeUrl(rawUrl, fallback = '') {
  const trimmed = String(rawUrl ?? '').trim()
  if (!trimmed) return fallback
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed
  }
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString()
    }
  } catch {
    return fallback
  }
  return fallback
}

export function isValidEmail(email) {
  const clean = String(email ?? '').trim()
  return clean.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)
}

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function validateImageFile(file) {
  if (!file) return { ok: false, error: 'No file selected.' }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { ok: false, error: 'Only JPEG, PNG, WebP, or GIF images are allowed.' }
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: 'Image must be 5 MB or smaller.' }
  }
  return { ok: true }
}

const rateBuckets = new Map()

export function checkRateLimit(bucketKey, maxAttempts, windowMs) {
  const now = Date.now()
  const history = (rateBuckets.get(bucketKey) || []).filter((ts) => now - ts < windowMs)
  if (history.length >= maxAttempts) {
    const retryAfterSec = Math.ceil((windowMs - (now - history[0])) / 1000)
    rateBuckets.set(bucketKey, history)
    return { allowed: false, retryAfterSec }
  }
  history.push(now)
  rateBuckets.set(bucketKey, history)
  return { allowed: true, retryAfterSec: 0 }
}

export function resetRateLimit(bucketKey) {
  rateBuckets.delete(bucketKey)
}
