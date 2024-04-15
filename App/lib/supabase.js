import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gxkqcqydvefzkfynhwuy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a3FjcXlkdmVmemtmeW5od3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MzgzNjksImV4cCI6MjAxNTExNDM2OX0.eyuH8ypABU5xIAQxb32LrJLWGF0OOw4qF99gwq9EZfM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})