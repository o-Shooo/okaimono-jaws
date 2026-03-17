import { Tabs } from 'expo-router'

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: '買い物リスト' }} />
      <Tabs.Screen name="history" options={{ title: '購入履歴' }} />
    </Tabs>
  )
}
