import { useEffect, useState } from "react"

//<T> generics means whatever generic type was set while first using the useLocalStorage hook.
//Go to ShoppingCartContext to see
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
