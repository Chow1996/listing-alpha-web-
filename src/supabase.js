// Supabase client — anon key 通过 Vite env 注入,源码不硬编码
// .env(本地) / Vercel Project Settings(线上) 都需要配:
//   VITE_SUPABASE_URL=https://xxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=<anon key from Supabase dashboard>
// RLS 保证 anon 只能 select,后端写库走 service_role 在 backend .env 里

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars");
}

const H = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };

async function get(path) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: H });
  if (!r.ok) return null;
  return r.json();
}

// /index.json -> la_index 单行
export async function fetchIndex() {
  const data = await get("la_index?id=eq.current&select=payload");
  return data?.[0]?.payload || null;
}

// /days/{date}.json -> la_days
export async function fetchDay(date) {
  const data = await get(`la_days?date=eq.${date}&select=payload`);
  return data?.[0]?.payload || null;
}

// /targets/index.json -> la_targets 列表(只取 id/name/kind/aliases/thesis)
export async function fetchTargetsList() {
  const data = await get("la_targets?select=id,name,kind,aliases,thesis&order=id");
  return data || [];
}

// /targets/{id}/profile.json -> la_targets.profile
export async function fetchTargetProfile(id) {
  const data = await get(`la_targets?id=eq.${id}&select=profile`);
  return data?.[0]?.profile || null;
}

// /targets/{id}/thesis.json -> la_targets.thesis_full
export async function fetchTargetThesis(id) {
  const data = await get(`la_targets?id=eq.${id}&select=thesis_full`);
  return data?.[0]?.thesis_full || null;
}

// /targets/{id}/meta.json -> la_targets.meta
export async function fetchTargetMeta(id) {
  const data = await get(`la_targets?id=eq.${id}&select=meta`);
  return data?.[0]?.meta || null;
}

// /targets/{id}/feed.jsonl -> la_targets.feed (已存为 array)
export async function fetchTargetFeed(id) {
  const data = await get(`la_targets?id=eq.${id}&select=feed`);
  return data?.[0]?.feed || [];
}

// /targets/{id}/digest/{date}.json -> la_target_digests
export async function fetchTargetDigest(id, date) {
  const data = await get(`la_target_digests?target_id=eq.${id}&date=eq.${date}&select=payload`);
  return data?.[0]?.payload || null;
}
