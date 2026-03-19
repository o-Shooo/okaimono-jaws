import { Ionicons } from '@expo/vector-icons'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { Alert, Pressable, Text, TextInput, View } from 'react-native'
import Animated, {
  Easing,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { ShoppingListCard } from '../../components/ShoppingListCard'
import {
  colors,
  elevation,
  fontSize,
  fontWeight,
  iconSize,
  layout,
  radius,
  spacing,
} from '../../constants/theme'
import { useShoppingList } from '../../hooks/useShoppingList'

export default function ListScreen() {
  const { items, addItem, updateItemName, deleteItem, deleteAll, refetch } = useShoppingList()
  const [inputText, setInputText] = useState('')
  const [adding, setAdding] = useState(false)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const inputRef = useRef<TextInput>(null)

  const allChecked = items.length > 0 && checkedIds.size >= items.length

  function handleToggle(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleReset() {
    Alert.alert('リストを空にする？', '買い物リストをリセットするよ', [
      { text: 'やめとく', style: 'cancel' },
      {
        text: '空にする',
        style: 'destructive',
        onPress: () => {
          deleteAll()
          setCheckedIds(new Set())
        },
      },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  async function handleSubmit() {
    const name = inputText.trim()
    if (!name || adding) return
    setAdding(true)
    setInputText('')
    await addItem(name)
    await refetch()
    setAdding(false)
    inputRef.current?.focus()
  }

  const canSubmit = !!inputText.trim() && !adding

  const tabBarHeight = useBottomTabBarHeight()
  const keyboard = useAnimatedKeyboard()
  const keyboardStyle = useAnimatedStyle(() => ({
    paddingBottom: Math.max(0, keyboard.height.value - tabBarHeight),
  }))

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Animated.FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        itemLayoutAnimation={LinearTransition}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xxl,
          gap: spacing.sm,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.md,
              paddingTop: spacing.xxl,
            }}
          >
            <Ionicons name="cart-outline" size={iconSize.hero} color={colors.textMuted} />
          </View>
        }
        renderItem={({ item }) => (
          <ShoppingListCard
            item={item}
            checked={checkedIds.has(item.id)}
            onToggle={handleToggle}
            onDelete={deleteItem}
            onEdit={updateItemName}
          />
        )}
      />

      {allChecked && (
        <Animated.View
          entering={SlideInDown.duration(250).easing(Easing.out(Easing.ease))}
          exiting={SlideOutDown.duration(200).easing(Easing.in(Easing.ease))}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            marginHorizontal: spacing.md,
            marginBottom: spacing.sm,
            backgroundColor: colors.primary,
            borderRadius: radius.card,
            gap: spacing.md,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <Ionicons name="checkmark-circle" size={iconSize.xs} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: fontSize.footnote, fontWeight: fontWeight.semibold }}>
              全部買えた！
            </Text>
          </View>
          <Pressable
            onPress={handleReset}
            style={{
              backgroundColor: colors.whiteAlpha20,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,
              borderRadius: radius.pill,
            }}
          >
            <Text style={{ color: colors.white, fontSize: fontSize.caption, fontWeight: fontWeight.semibold }}>
              空にする
            </Text>
          </Pressable>
        </Animated.View>
      )}

      <Animated.View
        style={[
          keyboardStyle,
          {
            paddingHorizontal: spacing.md,
            paddingTop: spacing.sm,
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            paddingHorizontal: spacing.xs,
            paddingVertical: spacing.xs,
            marginBottom: spacing.sm,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            boxShadow: elevation.float,
          }}
        >
          <TextInput
            ref={inputRef}
            style={{
              flex: 1,
              fontSize: fontSize.callout,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              color: colors.textPrimary,
            }}
            autoFocus
            value={inputText}
            onChangeText={setInputText}
            placeholder="何を買おう？"
            placeholderTextColor={colors.placeholder}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            blurOnSubmit={false}
            submitBehavior="submit"
          />
          <Pressable
            style={{
              width: layout.minTouchTarget,
              height: layout.minTouchTarget,
              borderRadius: radius.pill,
              backgroundColor: canSubmit ? colors.primary : colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            <Ionicons name="add" size={iconSize.md} color={colors.white} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}
