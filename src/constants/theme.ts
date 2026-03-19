// https://developer.apple.com/design/human-interface-guidelines
export const colors = {
  primary: '#1E3932',
  primaryLight: '#D4E9E2',

  background: '#F2F0EB',
  surface: '#FDFAF5',

  success: '#00704A',
  danger: '#C23B22',

  textPrimary: '#1E3932',
  textSecondary: '#5C4033',
  textMuted: '#9E8E7E',

  border: '#E0D8CE',
  placeholder: '#B5A99A',

  white: '#ffffff',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
}

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  xl: 32,
  xxl: 48,
}

export const radius = {
  card: 16,
  pill: 9999,
}

export const fontSize = {
  caption: 12,
  footnote: 14,
  callout: 16,
  title: 28,
}

export const fontWeight = {
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
}

export const layout = {
  minTouchTarget: 44,
  tabBarHeight: 64,
  logoSize: 80,
  buttonHeight: 52,
}

export const iconSize = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 26,
  tab: 28,
  logo: 40,
  hero: 64,
}

export const opacity = {
  disabled: 0.7,
  checked: 0.4,
}

export const borderWidth = {
  thin: 1,
}

export const elevation = {
  card: '0 1px 4px rgba(0, 0, 0, 0.08)',
  float: '0 4px 12px rgba(0, 0, 0, 0.10)',
}
