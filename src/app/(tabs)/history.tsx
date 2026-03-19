import { Text, View } from 'react-native'
import { colors, fontSize } from '../../constants/theme'

export default function HistoryScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontSize: fontSize.callout, color: colors.textMuted }}>購入履歴</Text>
    </View>
  )
}
