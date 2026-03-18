import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type ShoppingListItem = {
  id: string
  name: string
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>([])

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('shopping_list_items')
      .select('id, name')
      .order('created_at', { ascending: true })
    if (data) setItems(data as ShoppingListItem[])
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  async function addItem(name: string): Promise<void> {
    await supabase.from('shopping_list_items').insert({ name })
  }

  async function deleteItem(id: string): Promise<void> {
    await supabase.from('shopping_list_items').delete().eq('id', id)
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  async function updateItemName(id: string, newName: string): Promise<void> {
    await supabase.from('shopping_list_items').update({ name: newName }).eq('id', id)
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, name: newName } : item)))
  }

  async function deleteAll(): Promise<void> {
    const ids = items.map((item) => item.id)
    if (ids.length === 0) return
    await supabase.from('shopping_list_items').delete().in('id', ids)
    setItems([])
  }

  return { items, addItem, updateItemName, deleteItem, deleteAll, refetch: fetchItems }
}
