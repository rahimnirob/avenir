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
  founder_code?: string
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
      console.log('🔵 Starting waitlist join process...', { email: data.email, referralCode: data.referralCode })

      // 1. Check if email exists
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('access_code, id, created_at')
        .eq('email', data.email)
        .maybeSingle() // Changed from .single() to .maybeSingle()

      console.log('🔍 Existing user check:', { existingUser, checkError })

      if (existingUser && !checkError) {
        // Calculate position for existing user
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
          .lt('created_at', existingUser.created_at)
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                       (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
        
        return {
          success: false,
          error: "Email already registered",
          founder_code: existingUser.access_code,
          position: (count || 0) + 1,
          referral_link: `${baseUrl}/waitlist?ref=${existingUser.access_code}`
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
          .maybeSingle() // Changed from .single()
        
        if (!codeCheck) break
        accessCode = generateAccessCode()
        attempts++
      }

      console.log('🎫 Generated access code:', accessCode)

      // 3. Calculate position (count of existing entries + 1)
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      const position = (count || 0) + 1

      console.log('📊 Current position:', position)

      // 4. Handle referral (increment referral_count for referrer)
      if (data.referralCode) {
        console.log('🔗 Processing referral code:', data.referralCode)
        
        const { data: referrer, error: referrerError } = await supabase
          .from('waitlist')
          .select('id, referral_count')
          .eq('access_code', data.referralCode)
          .maybeSingle() // Changed from .single()

        console.log('👤 Referrer found:', { referrer, referrerError })

        if (referrer && !referrerError) {
          const { error: updateError } = await supabase
            .from('waitlist')
            .update({ referral_count: (referrer.referral_count || 0) + 1 })
            .eq('id', referrer.id)

          if (updateError) {
            console.error('⚠️ Failed to update referrer count:', updateError)
          } else {
            console.log('✅ Referrer count updated successfully')
          }
        } else {
          console.warn('⚠️ Referral code not found or invalid:', data.referralCode)
        }
      }

      // 5. Insert into waitlist
      console.log('💾 Inserting new user...')
      
      const { data: newEntry, error: insertError } = await supabase
        .from('waitlist')
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          access_code: accessCode,
        })
        .select()
        .single()

      if (insertError) {
        console.error('❌ Insert error:', {
          message: insertError.message,
          details: insertError.details,
          code: insertError.code,
          hint: insertError.hint
        })
        return {
          success: false,
          error: insertError.message || "Failed to join waitlist. Please try again."
        }
      }

      console.log('✅ User inserted successfully:', newEntry)

      // 6. Generate referral link
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
      
      const referralLink = `${baseUrl}/waitlist?ref=${accessCode}`

      console.log('🎉 Waitlist join complete:', { accessCode, position, referralLink })

      return {
        success: true,
        founder_code: accessCode,
        position,
        referral_link: referralLink
      }

    } catch (error) {
      console.error('❌ Waitlist join error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      }
    }
  },

  async getWaitlistStats(): Promise<WaitlistStats> {
    try {
      const { count: total, error: totalError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      if (totalError) {
        console.error('Stats total error:', totalError)
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayISO = today.toISOString()

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowISO = tomorrow.toISOString()

      const { count: todayCount, error: todayError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayISO)
        .lt('created_at', tomorrowISO)

      if (todayError) {
        console.error('Stats today error:', todayError)
      }

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
      const { error } = await supabase
        .from('waitlist')
        .update({ 
          discovered_archive: true,
          updated_at: new Date().toISOString() 
        })
        .eq('access_code', founderCode)

      if (error) {
        console.error('Verification error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Verification error:', error)
      return false
    }
  }
}