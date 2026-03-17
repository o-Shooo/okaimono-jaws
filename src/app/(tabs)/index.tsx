import { FlatList, StyleSheet } from 'react-native'
import { ShoppingListCard } from '../../components/ShoppingListCard'
import { useShoppingList } from '../../hooks/useShoppingList'

export default function ListScreen() {
  const { items } = useShoppingList()

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <ShoppingListCard item={item} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
})
