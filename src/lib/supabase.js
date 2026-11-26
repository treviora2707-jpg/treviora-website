/**
 * Lightweight Supabase PostgREST, RPC & Storage client for TREVIORA INDUSTRY.
 * Uses only public URL and publishable/anon key (never any secret key).
 */

const SUPABASE_URL = (
  import.meta.env.VITE_SUPABASE_URL || 'https://gptanjtcmtemalwrvrht.supabase.co'
).replace(/\/$/, '')

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1dkAtHDmxAS0kjyiuEOxuw_BLQVIjCh'

function getHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

async function callRpc(fnName, params) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    let detail = `RPC ${fnName} failed (${res.status})`
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
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=id,title,slug,category,description,image_url,tags,project_url,featured,status,created_at&status=eq.published&order=created_at.desc`,
    { headers: getHeaders() }
  )
  if (!res.ok) throw new Error(`Supabase projects fetch failed (${res.status})`)
  return res.json()
}

export async function fetchActiveServices() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/services?select=id,slug,number,icon,title,description,page_title,subtitle,image_url,starting_price,timeline&is_active=eq.true&order=sort_order.asc`,
    { headers: getHeaders() }
  )
  if (!res.ok) throw new Error(`Supabase services fetch failed (${res.status})`)
  return res.json()
}

export async function submitContactInquiry({
  full_name,
  email,
  subject,
  message,
  service_interest = null,
}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
    method: 'POST',
    headers: getHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify({
      full_name,
      email,
      subject,
      message,
      service_interest,
      status: 'new',
    }),
  })
  if (!res.ok) throw new Error(`Supabase inquiry insert failed (${res.status})`)
  return true
}

export async function uploadProjectImage(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const objectPath = `projects/${Date.now()}-${safeName}`
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/project-images/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type || 'image/webp',
      'x-upsert': 'true',
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
    p_username: username,
    p_password: password,
  })
  return Boolean(valid)
}

export async function adminListProjects(username, password) {
  return callRpc('admin_list_projects', {
    p_username: username,
    p_password: password,
  })
}

export async function adminUpsertProject(username, password, project) {
  return callRpc('admin_upsert_project', {
    p_username: username,
    p_password: password,
    p_id: project.id || null,
    p_title: project.title,
    p_slug: project.slug,
    p_category: project.category,
    p_description: project.description,
    p_image_url: project.image_url,
    p_tags: project.tags || [],
    p_project_url: project.project_url || null,
    p_status: project.status || 'published',
    p_featured: project.featured ?? true,
  })
}

export async function adminDeleteProject(username, password, id) {
  return callRpc('admin_delete_project', {
    p_username: username,
    p_password: password,
    p_id: id,
  })
}

export async function adminListInquiries(username, password) {
  return callRpc('admin_list_inquiries', {
    p_username: username,
    p_password: password,
  })
}
