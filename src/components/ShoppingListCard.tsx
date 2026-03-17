import { StyleSheet, Text, View } from 'react-native'
import type { ShoppingListItem } from '../hooks/useShoppingList'

type Props = {
  item: ShoppingListItem
}

export function ShoppingListCard({ item }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.products?.name}</Text>
      <Text style={styles.meta}>
        {item.quantity}個
        {item.products?.unit_size ? `（${item.products.unit_size}${item.products.unit_type}）` : ''}
      </Text>
      {item.planned_date && <Text style={styles.sub}>予定日: {item.planned_date}</Text>}
      {item.stores && <Text style={styles.sub}>店舗: {item.stores.name}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  sub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
})
