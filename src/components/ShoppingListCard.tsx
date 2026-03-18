import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { Pressable, Text, TextInput } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  FadeInLeft,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { colors, elevation, fontSize, iconSize, layout, radius, spacing } from '../constants/theme'
import type { ShoppingListItem } from '../hooks/useShoppingList'

type Props = {
  item: ShoppingListItem
  checked: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => Promise<void>
  onEdit: (id: string, name: string) => Promise<void>
}

const SWIPE_THRESHOLD = 80
const SCREEN_WIDTH = 500

export function ShoppingListCard({ item, checked, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(item.name)
  const editInputRef = useRef<TextInput>(null)

  const iconScale = useSharedValue(1)
  const textOpacity = useSharedValue(checked ? 0.4 : 1)
  const translateX = useSharedValue(0)
  const cardOpacity = useSharedValue(1)

  useEffect(() => {
    iconScale.value = withSpring(1.2, { damping: 10, stiffness: 300 }, () => {
      iconScale.value = withSpring(1, { damping: 12, stiffness: 300 })
    })
    textOpacity.value = withTiming(checked ? 0.4 : 1, { duration: 200 })
  }, [checked, textOpacity, iconScale])

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }))

  const textAnimStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }))

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: cardOpacity.value,
  }))

  function handleLongPress() {
    setEditText(item.name)
    setIsEditing(true)
    setTimeout(() => editInputRef.current?.focus(), 50)
  }

  async function handleEditSubmit() {
    const name = editText.trim()
    if (name && name !== item.name) {
      await onEdit(item.id, name)
    }
    setIsEditing(false)
  }

  function handleEditBlur() {
    setIsEditing(false)
    setEditText(item.name)
  }

  const panGesture = Gesture.Pan()
    .enabled(!isEditing)
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((e) => {
      translateX.value = e.translationX
      cardOpacity.value = 1 - Math.min(Math.abs(e.translationX) / (SWIPE_THRESHOLD * 2), 0.5)
    })
    .onEnd((e) => {
      const shouldDelete = Math.abs(e.translationX) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > 800
      if (shouldDelete) {
        const flyTo = e.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH
        translateX.value = withTiming(flyTo, { duration: 200 })
        cardOpacity.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(onDelete)(item.id)
        })
      } else {
        translateX.value = withSpring(0)
        cardOpacity.value = withTiming(1)
      }
    })

  return (
    <Animated.View entering={FadeInLeft} layout={LinearTransition}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimStyle}>
          <Pressable
            style={{
              backgroundColor: colors.surface,
              borderRadius: radius.card,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
              boxShadow: elevation.card,
              minHeight: layout.minTouchTarget,
            }}
            onPress={() => !isEditing && onToggle(item.id)}
            onLongPress={handleLongPress}
            delayLongPress={400}
          >
            <Animated.View style={iconAnimStyle}>
              <Ionicons
                name={checked ? 'checkmark-circle' : 'ellipse-outline'}
                size={iconSize.lg}
                color={checked ? colors.success : colors.textMuted}
              />
            </Animated.View>

            {isEditing ? (
              <TextInput
                ref={editInputRef}
                style={{
                  flex: 1,
                  fontSize: fontSize.callout,
                  fontWeight: '500',
                  color: colors.textPrimary,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.primary,
                  paddingVertical: 2,
                }}
                value={editText}
                onChangeText={setEditText}
                returnKeyType="done"
                onSubmitEditing={handleEditSubmit}
                onBlur={handleEditBlur}
                selectTextOnFocus
              />
            ) : (
              <Animated.View style={[{ flex: 1 }, textAnimStyle]}>
                <Text
                  style={{
                    fontSize: fontSize.callout,
                    color: colors.textPrimary,
                    textDecorationLine: checked ? 'line-through' : 'none',
                    fontWeight: '500',
                  }}
                >
                  {item.name}
                </Text>
              </Animated.View>
            )}
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  )
}
