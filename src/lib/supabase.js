/**
 * Lightweight Supabase PostgREST, RPC & Storage client for TREVIORA INDUSTRY.
 * Reads strictly from Vite environment variables (no hardcoded keys in source).
 */
import { sanitizeMultilineText, sanitizeText, sanitizeUrl, validateImageFile } from './security'

const SUPABASE_URL = String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const SUPABASE_KEY = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '')

function assertSupabaseConfigured() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Backend configuration is missing.')
  }
}

function getHeaders(extra = {}) {
  assertSupabaseConfigured()
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

async function callRpc(fnName, params) {
  assertSupabaseConfigured()
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const errBody = await res.json()
      if (errBody?.message) detail = errBody.message
    } catch { /* ignore */ }
    const err = new Error(detail)
    err.status = res.status
    throw err
  }
  return res.json()
}

export async function fetchPublishedProjects() {
  assertSupabaseConfigured()
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=id,title,slug,category,description,image_url,tags,project_url,featured,status,created_at&status=eq.published&order=created_at.desc`,
    { headers: getHeaders() }
  )
  if (!res.ok) throw new Error(`Projects fetch failed (${res.status})`)
  return res.json()
}

export async function fetchActiveServices() {
  assertSupabaseConfigured()
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/services?select=id,slug,number,icon,title,description,page_title,subtitle,image_url,starting_price,timeline&is_active=eq.true&order=sort_order.asc`,
    { headers: getHeaders() }
  )
  if (!res.ok) throw new Error(`Services fetch failed (${res.status})`)
  return res.json()
}

export async function submitContactInquiry({
  full_name,
  email,
  subject,
  message,
  service_interest = null,
}) {
  assertSupabaseConfigured()
  const cleanPayload = {
    full_name: sanitizeText(full_name, 120),
    email: sanitizeText(email, 254),
    subject: sanitizeText(subject, 200),
    message: sanitizeMultilineText(message, 2500),
    service_interest: service_interest ? sanitizeText(service_interest, 120) : null,
    status: 'new',
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
    method: 'POST',
    headers: getHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify(cleanPayload),
  })
  if (!res.ok) throw new Error(`Inquiry submit failed (${res.status})`)
  return true
}

export async function uploadProjectImage(file) {
  assertSupabaseConfigured()
  const validation = validateImageFile(file)
  if (!validation.ok) {
    throw new Error(validation.error)
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80)
  const objectPath = `projects/${Date.now()}-${safeName}`
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/project-images/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type,
      'x-upsert': 'false',
    },
    body: file,
  })
  if (!res.ok) {
    let msg = `Image upload failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.message) msg = data.message
    } catch { /* ignore */ }
    throw new Error(msg)
  }
  return `${SUPABASE_URL}/storage/v1/object/public/project-images/${objectPath}`
}

export async function verifyAdminCredentials(username, password) {
  const valid = await callRpc('verify_admin_credentials', {
    p_username: sanitizeText(username, 64),
    p_password: String(password ?? '').slice(0, 128),
  })
  return Boolean(valid)
}

export async function adminListProjects(username, password) {
  return callRpc('admin_list_projects', {
    p_username: sanitizeText(username, 64),
    p_password: String(password ?? '').slice(0, 128),
  })
}

export async function adminUpsertProject(username, password, project) {
  return callRpc('admin_upsert_project', {
    p_username: sanitizeText(username, 64),
    p_password: String(password ?? '').slice(0, 128),
    p_id: project.id || null,
    p_title: sanitizeText(project.title, 160),
    p_slug: sanitizeText(project.slug, 64),
    p_category: sanitizeText(project.category, 120),
    p_description: sanitizeMultilineText(project.description, 2000),
    p_image_url: sanitizeUrl(project.image_url, '/images/service-web-development.webp'),
    p_tags: (project.tags || []).map((t) => sanitizeText(t, 40)).filter(Boolean).slice(0, 12),
    p_project_url: sanitizeUrl(project.project_url, '') || null,
    p_status: project.status === 'draft' ? 'draft' : 'published',
    p_featured: Boolean(project.featured ?? true),
  })
}

export async function adminDeleteProject(username, password, id) {
  return callRpc('admin_delete_project', {
    p_username: sanitizeText(username, 64),
    p_password: String(password ?? '').slice(0, 128),
    p_id: id,
  })
}

export async function adminListInquiries(username, password) {
  return callRpc('admin_list_inquiries', {
    p_username: sanitizeText(username, 64),
    p_password: String(password ?? '').slice(0, 128),
  })
}
