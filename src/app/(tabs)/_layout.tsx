import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { colors, iconSize, layout } from '../../constants/theme'
import { supabase } from '../../lib/supabase'

export const unstable_settings = {
  anchor: 'shopping-list',
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: layout.tabBarHeight,
        },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        headerRight: () => (
          <Pressable onPress={() => supabase.auth.signOut()} style={{ paddingHorizontal: 16 }}>
            <Ionicons name="log-out-outline" size={iconSize.md} color={colors.textMuted} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: 'おかいもの',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={iconSize.tab} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '価格チェック',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'receipt' : 'receipt-outline'}
              size={iconSize.lg}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
