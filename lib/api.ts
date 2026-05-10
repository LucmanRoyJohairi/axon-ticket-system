import { AuthToken, Ticket, TicketListResponse } from "@/types";
import { MOCK_TICKETS } from "./mock-data";

const USE_MOCK = true
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

// Auth helpers

interface getTicketParams {
  page?: number
  status?: string
  priority?: string
  category?: string
}



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

// ─── Tickets ─────────────────────────────────────────────────────────────────────
export async function getTickets(params?: getTicketParams): Promise<TicketListResponse> {
  if(USE_MOCK){
    await new Promise(resolve => setTimeout(resolve, 300));
    let tickets = [...MOCK_TICKETS]
    if(params?.status) tickets = tickets.filter(t => t.status === params.status)
    if(params?.priority) tickets = tickets.filter(t => t.priority === params.priority)
    if(params?.category) tickets = tickets.filter(t => t.category === params.category)
    return {tickets, total:tickets.length, page: 1, page_size: 20}
  }

  const queryParams = new URLSearchParams(
    Object.entries(params ?? {}).filter(([,v]) => v != null).map(([k,v]) => [k, String(v)])
  ).toString()
  return apiFetch<TicketListResponse>(`/tickets${queryParams ? `?${queryParams}` : ''}`)
}

export async function getTicket(id: string): Promise<Ticket> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const ticket = MOCK_TICKETS.find(t => t.id === id)
    if (!ticket) throw new Error('Ticket not found')
    return ticket
  }
  return apiFetch<Ticket>(`/tickets/${id}`)
}