import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface JoinWaitlistData {
  name: string
  email: string
  referralCode?: string
  utmSource?: string
  utmCampaign?: string
}

export interface WaitlistResponse {
  success: boolean
  founder_code?: string  // Keep this name for frontend compatibility
  position?: number
  referral_link?: string
  error?: string
}

export interface WaitlistStats {
  total: number
  todayCount: number
}

const SAFE_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"

const generateAccessCode = (): string => {
  let code = "AV-"
  for (let i = 0; i < 6; i++) {
    code += SAFE_CHARS.charAt(Math.floor(Math.random() * SAFE_CHARS.length))
  }
  return code
}

export const waitlistService = {
  async joinWaitlist(data: JoinWaitlistData): Promise<WaitlistResponse> {
    try {
      // 1. Check if email exists
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('access_code, id, created_at')
        .eq('email', data.email)
        .single()

      if (existingUser && !checkError) {
        // Calculate position for existing user
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
          .lt('created_at', existingUser.created_at)
        
        return {
          success: false,
          error: "Email already registered",
          founder_code: existingUser.access_code, // Map access_code to founder_code for frontend
          position: (count || 0) + 1
        }
      }

      // 2. Generate unique access code
      let accessCode = generateAccessCode()
      let attempts = 0
      while (attempts < 10) {
        const { data: codeCheck } = await supabase
          .from('waitlist')
          .select('id')
          .eq('access_code', accessCode)
          .single()
        if (!codeCheck) break
        accessCode = generateAccessCode()
        attempts++
      }

      // 3. Calculate position (count of existing entries + 1)
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      const position = (count || 0) + 1

      // 4. Handle referral (increment referral_count for referrer)
      if (data.referralCode) {
        const { data: referrer } = await supabase
          .from('waitlist')
          .select('id, referral_count')
          .eq('access_code', data.referralCode)
          .single()

        if (referrer) {
          // Increment referral_count for the referrer
          await supabase
            .from('waitlist')
            .update({ referral_count: (referrer.referral_count || 0) + 1 })
            .eq('id', referrer.id)
        }
      }

      // 5. Insert into waitlist (only with columns that exist in your table)
      const { data: newEntry, error: insertError } = await supabase
        .from('waitlist')
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          access_code: accessCode,
          // Note: discovered_archive and referral_count have defaults, so we don't need to specify them
          // Note: created_at and updated_at have defaults, so we don't need to specify them
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert error full:', insertError)
        console.error('Insert error details:', insertError.details)
        console.error('Insert error code:', insertError.code)
        console.error('Insert error message:', insertError.message)
        return {
          success: false,
          error: insertError.message || "Failed to join waitlist. Please try again."
        }
      }

      // 6. Generate referral link
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
      
      const referralLink = `${baseUrl}/waitlist?ref=${accessCode}`

      return {
        success: true,
        founder_code: accessCode, // Map access_code to founder_code for frontend compatibility
        position,
        referral_link: referralLink
      }

    } catch (error) {
      console.error('Waitlist join error:', error)
      return {
        success: false,
        error: "An unexpected error occurred. Please try again."
      }
    }
  },

  async getWaitlistStats(): Promise<WaitlistStats> {
    try {
      const { count: total } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      const today = new Date().toISOString().split('T')[0]
      const { count: todayCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`)

      return {
        total: total || 0,
        todayCount: todayCount || 0
      }
    } catch (error) {
      console.error('Stats error:', error)
      return { total: 0, todayCount: 0 }
    }
  },

  async verifyEmail(founderCode: string): Promise<boolean> {
    try {
      // Since your table doesn't have status/verified_at columns,
      // you might want to add a 'verified' boolean column or use discovered_archive
      // For now, we'll update discovered_archive to true as a verification marker
      const { error } = await supabase
        .from('waitlist')
        .update({ 
          discovered_archive: true,
          updated_at: new Date().toISOString() 
        })
        .eq('access_code', founderCode) // Use access_code instead of founder_code

      return !error
    } catch (error) {
      console.error('Verification error:', error)
      return false
    }
  }
}