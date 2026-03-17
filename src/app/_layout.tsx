import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { initializeAuth } from '../stores/auth'

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = initializeAuth()
    return unsubscribe
  }, [])

  return <Slot />
}
