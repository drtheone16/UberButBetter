import type { Tweet, User } from '../types'

export const users: User[] = [
  { id: 'u_alex', username: 'alex', displayName: 'Alex Morgan', bio: 'Frontend enjoyer', accentColor: '#1d9bf0' },
  { id: 'u_bailey', username: 'bailey', displayName: 'Bailey Chen', bio: 'TypeScript all day', accentColor: '#f91880' },
  { id: 'u_cairo', username: 'cairo', displayName: 'Cairo Patel', bio: 'Coffee + code', accentColor: '#7856ff' },
  { id: 'u_devon', username: 'devon', displayName: 'Devon Lee', bio: 'UX + UI', accentColor: '#00ba7c' },
  { id: 'u_riley', username: 'riley', displayName: 'Riley Park', bio: 'Product thinker', accentColor: '#ffd400' },
]

// Simple seed tweets
export const seedTweets: Tweet[] = [
  { id: 't1', userId: 'u_alex', content: 'Building an offline Twitter replica today. Wish me luck!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 't2', userId: 'u_bailey', content: 'Types make refactors feel safe. TS ❤️', createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
  { id: 't3', userId: 'u_cairo', content: 'Third cup of coffee. No regrets.', createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
  { id: 't4', userId: 'u_devon', content: 'Micro-interactions matter.', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 't5', userId: 'u_riley', content: 'A clear roadmap beats a perfect plan.', createdAt: new Date(Date.now() - 1000 * 30).toISOString() },
]

export function getUserByUsername(username: string): User | undefined {
  return users.find(u => u.username.toLowerCase() === username.toLowerCase())
}

export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId)
}