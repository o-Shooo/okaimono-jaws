import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  colors,
  fontSize,
  fontWeight,
  iconSize,
  layout,
  opacity,
  radius,
  spacing,
} from '../../constants/theme'
import { commonStyles } from '../../constants/styles'
import { supabase } from '../../lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('メールアドレスまたはパスワードが違います')
    setLoading(false)
  }

  async function handleSignUp() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError('アカウント登録に失敗しました。もう一度お試しください')
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: spacing.xl,
          gap: spacing.md,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl }}>
          <View
            style={{
              width: layout.logoSize,
              height: layout.logoSize,
              borderRadius: radius.card,
              backgroundColor: colors.primaryLight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="cart" size={iconSize.logo} color={colors.primary} />
          </View>
          <Text style={{ fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.textPrimary }}>
            おかいものじょーず
          </Text>
          <Text style={{ fontSize: fontSize.footnote, color: colors.textSecondary }}>
            日々の食材・日用品の買い物をスムーズに
          </Text>
        </View>

        <View style={{ gap: spacing.xs }}>
          <Text style={{ fontSize: fontSize.footnote, fontWeight: fontWeight.semibold, color: colors.textSecondary }}>
            メールアドレス
          </Text>
          <View style={commonStyles.inputRow}>
            <Ionicons name="mail-outline" size={iconSize.sm} color={colors.textMuted} />
            <TextInput
              style={{ flex: 1, fontSize: fontSize.callout, color: colors.textPrimary }}
              placeholder="example@email.com"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>
        </View>

        <View style={{ gap: spacing.xs }}>
          <Text style={{ fontSize: fontSize.footnote, fontWeight: fontWeight.semibold, color: colors.textSecondary }}>
            パスワード
          </Text>
          <View style={commonStyles.inputRow}>
            <Ionicons name="lock-closed-outline" size={iconSize.sm} color={colors.textMuted} />
            <TextInput
              style={{ flex: 1, fontSize: fontSize.callout, color: colors.textPrimary }}
              placeholder="パスワードを入力"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>
        </View>

        {error && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Ionicons name="alert-circle-outline" size={iconSize.sm} color={colors.danger} />
            <Text style={{ fontSize: fontSize.footnote, color: colors.danger, flex: 1 }}>
              {error}
            </Text>
          </View>
        )}

        <Pressable
          style={[commonStyles.primaryButton, { marginTop: spacing.sm, opacity: loading ? opacity.disabled : 1 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={{ color: colors.white, fontSize: fontSize.callout, fontWeight: fontWeight.bold }}>
            {loading ? 'ログイン中...' : 'はじめる'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSignUp}
          disabled={loading}
          style={{ alignItems: 'center', padding: spacing.sm }}
        >
          <Text style={{ fontSize: fontSize.footnote, color: colors.textSecondary }}>
            はじめての方は{' '}
            <Text style={{ color: colors.primary, fontWeight: fontWeight.semibold }}>アカウントを作る</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
