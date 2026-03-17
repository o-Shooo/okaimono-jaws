import { Redirect } from 'expo-router'
import { useAuthStore } from '../stores/auth'

export default function Index() {
  const { session, loading } = useAuthStore()

  if (loading) return null
  if (!session) return <Redirect href="/(auth)/login" />
  return <Redirect href="/(tabs)" />
}
