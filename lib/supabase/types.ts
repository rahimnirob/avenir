export interface WaitlistEntry {
  id: string
  email: string
  name: string | null
  access_code: string
  discovered_archive: boolean | null
  referral_count: number | null
  created_at: string | null
  updated_at: string | null
}

export interface WaitlistAnalytics {
  id: string
  waitlist_id: string
  event_type: 'signup' | 'verification' | 'referral' | 'share'
  event_data: Record<string, any>
  created_at: string
}