import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type Purchase = {
  id: string
  quantity: number
  unit_price: number
  purchased_at: string
  products: {
    name: string
    unit_size: number | null
    unit_type: string | null
  } | null
  stores: {
    name: string
  } | null
}

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    supabase
      .from('purchases')
      .select(
        'id, quantity, unit_price, purchased_at, products(name, unit_size, unit_type), stores(name)',
      )
      .order('purchased_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPurchases(data as Purchase[])
      })
  }, [])

  return { purchases }
}
