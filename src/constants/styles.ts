import { StyleSheet } from 'react-native'
import { colors, elevation, layout, radius, spacing } from './theme'

export const commonStyles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    minHeight: layout.minTouchTarget,
    boxShadow: elevation.card,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    boxShadow: elevation.card,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.buttonHeight,
  },
})
