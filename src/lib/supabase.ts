import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
const supabaseUrl = 'https://gxveenzmpajohzilaspj.supabase.co' 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface UserData {
  id?: string
  email: string
  chart_data: any
  created_at?: string
  updated_at?: string
}

export const saveUserData = async (email: string, chartData: any) => {
  const { data, error } = await supabase
    .from('user_analytics')
    .upsert({ 
      email, 
      chart_data: chartData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    })
    .select()
  
  if (error) throw error
  return data
}

export const getUserData = async (email: string) => {
  const { data, error } = await supabase
    .from('user_analytics')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}