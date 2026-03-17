import type { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { supabase } from '../lib/supabase'

type AuthStore = {
  session: Session | null
  loading: boolean
}

export const useAuthStore = create<AuthStore>(() => ({
  session: null,
  loading: true,
}))

export function initializeAuth() {
  supabase.auth.getSession().then(({ data: { session } }) => {
    useAuthStore.setState({ session, loading: false })
  })

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({ session })
  })

  return () => subscription.unsubscribe()
}
