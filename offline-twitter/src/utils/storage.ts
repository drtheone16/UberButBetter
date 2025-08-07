const NAMESPACE = 'offlineTwitter'

function namespaced(key: string): string {
  return `${NAMESPACE}.${key}`
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(namespaced(key))
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(namespaced(key), JSON.stringify(value))
  } catch {
    // ignore persistence errors
  }
}

export function loadSet(key: string): Set<string> {
  const arr = load<string[]>(key, [])
  return new Set(arr)
}

export function saveSet(key: string, set: Set<string>): void {
  save<string[]>(key, Array.from(set))
}