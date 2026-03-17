import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type ShoppingListItem = {
  id: string
  quantity: number
  planned_date: string | null
  products: {
    name: string
    unit_size: number | null
    unit_type: string | null
  } | null
  stores: {
    name: string
  } | null
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>([])

  useEffect(() => {
    supabase
      .from('shopping_list_items')
      .select(
        'id, quantity, planned_date, products(name, unit_size, unit_type), stores:planned_store_id(name)',
      )
      .then(({ data }) => {
        if (data) setItems(data as ShoppingListItem[])
      })
  }, [])

  return { items }
}
