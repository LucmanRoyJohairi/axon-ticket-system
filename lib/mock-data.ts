//TODO: write out MOCK_USER, MOCK_TICKETS, MOCK_STATS

import { DashboardStats, Ticket, User } from "@/types"

export const MOCK_USER: User = {
  id: 'usr_001',
  email: 'test@email.com',
  full_name: 'Zero',
  is_admin: true,
  created_at: '2025-01-01T00:00:00Z'
}

export const MOCK_TICKETS: Ticket[] = [
{
    id: 'tkt_01',
    title: 'Password reset email not being delivered',
    description: "I've tried resetting my password three times over the past two days. The reset email never arrives — not in spam either. My account is locked out.",
    status: 'open',
    priority: null,
    category: null,
    ai_summary: 'User is locked out due to password reset emails failing to deliver across multiple attempts.',
    ai_category: 'bug',
    ai_priority: 'high',
    ai_processed: true,
    creator_id: 'usr_02',
    assignee_id: null,
    created_at: '2025-05-07T08:12:00Z',
    updated_at: '2025-05-07T08:14:00Z',
  },
  {
    id: 'tkt_02',
    title: 'Export to CSV includes deleted records',
    description: 'When I export contacts to CSV, deleted contacts are still showing up in the file. This is causing issues with our CRM sync.',
    status: 'in_progress',
    priority: 'high',
    category: 'bug',
    ai_summary: 'CSV export not filtering soft-deleted records, causing data integrity issues downstream.',
    ai_category: 'bug',
    ai_priority: 'high',
    ai_processed: true,
    creator_id: 'usr_03',
    assignee_id: 'usr_01',
    created_at: '2025-05-06T14:30:00Z',
    updated_at: '2025-05-07T09:00:00Z',
  },
  {
    id: 'tkt_03',
    title: 'Request: Dark mode for the dashboard',
    description: "We use the dashboard all day and the bright white interface causes eye strain. Would love a dark mode toggle — even a simple one would go a long way.",
    status: 'open',
    priority: null,
    category: null,
    ai_summary: 'Feature request for dark mode to reduce eye strain for heavy daily users.',
    ai_category: 'feature',
    ai_priority: 'low',
    ai_processed: true,
    creator_id: 'usr_04',
    assignee_id: null,
    created_at: '2025-05-06T11:00:00Z',
    updated_at: '2025-05-06T11:00:00Z',
  },
]

export const MOCK_STATS: DashboardStats = {
total_tickets: 24,
  open_tickets: 14,
  in_progress_tickets: 5,
  resolved_tickets: 5,
  ai_processed_tickets: 21,
  tickets_by_priority: { critical: 2, high: 7, medium: 9, low: 5 },
  tickets_by_category: { bug: 11, feature: 4, billing: 3, support: 4, other: 2 },
}