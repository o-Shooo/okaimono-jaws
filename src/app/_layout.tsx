import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { initializeAuth, useAuthStore } from '../stores/auth'

export default function RootLayout() {
  const { session, loading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = initializeAuth()
    return unsubscribe
  }, [])

  if (loading) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  )
}
