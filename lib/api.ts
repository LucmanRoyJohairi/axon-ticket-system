import { AuthToken } from "@/types";

const USE_MOCK = true
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

// Auth helpers

function getToken(): string | null{
    if(typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

function authHeaders(): HeadersInit {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}`} : {} 
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T>{
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders(),
            ...options?.headers,
        },
    })

    if(!res.ok){
        const err = await res.json().catch(()=>{ detail: res.statusText})
        throw new Error(err.detail ?? 'Request failed')
    }
    return res.json();
}


// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<AuthToken> {
  if (USE_MOCK) {
    // Fake a 500ms network delay so it feels real
     await new Promise(resolve => setTimeout(resolve, 500));
    return {
      access_token: 'mock-token-abc123',
      token_type: 'bearer',
      user: { id: 'usr_01', email, full_name: 'Zero', is_admin: true, created_at: '' },
    }
  }
  return apiFetch<AuthToken>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}