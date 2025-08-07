import { createContext, useContext, useMemo, useState } from 'react'
import type React from 'react'
import type { Tweet } from '../types'
import { seedTweets, users } from '../data/mock'
import { loadSet, saveSet, load, save } from '../utils/storage'

interface AppActions {
  toggleFollow: (userId: string) => void
  toggleLike: (tweetId: string) => void
  composeTweet: (content: string) => void
}

interface AppContextValue extends AppActions {
  currentUserId: string
  followingUserIds: Set<string>
  likedTweetIds: Set<string>
  allTweets: Tweet[]
}

const AppStateContext = createContext<AppContextValue | undefined>(undefined)

const CURRENT_USER_ID = 'u_alex'
const FOLLOWING_KEY = 'following.v1'
const LIKES_KEY = 'likes.v1'
const CUSTOM_TWEETS_KEY = 'customTweets.v1'

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [followingUserIds, setFollowingUserIds] = useState<Set<string>>(() => {
    const set = loadSet(FOLLOWING_KEY)
    // Default follow a couple of people on first run
    if (set.size === 0) {
      set.add('u_bailey')
      set.add('u_devon')
    }
    return new Set(set)
  })

  const [likedTweetIds, setLikedTweetIds] = useState<Set<string>>(() => loadSet(LIKES_KEY))

  const [customTweets, setCustomTweets] = useState<Tweet[]>(() => load<Tweet[]>(CUSTOM_TWEETS_KEY, []))

  const allTweets: Tweet[] = useMemo(() => {
    return [...seedTweets, ...customTweets].sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  }, [customTweets])

  function toggleFollow(userId: string) {
    setFollowingUserIds(prev => {
      const next = new Set(prev)
      if (next.has(userId)) next.delete(userId)
      else next.add(userId)
      saveSet(FOLLOWING_KEY, next)
      return next
    })
  }

  function toggleLike(tweetId: string) {
    setLikedTweetIds(prev => {
      const next = new Set(prev)
      if (next.has(tweetId)) next.delete(tweetId)
      else next.add(tweetId)
      saveSet(LIKES_KEY, next)
      return next
    })
  }

  function composeTweet(content: string) {
    const newTweet: Tweet = {
      id: `t_${Date.now()}`,
      userId: CURRENT_USER_ID,
      content: content.slice(0, 280),
      createdAt: new Date().toISOString(),
    }
    setCustomTweets(prev => {
      const next = [newTweet, ...prev]
      save<Tweet[]>(CUSTOM_TWEETS_KEY, next)
      return next
    })
  }

  const value: AppContextValue = {
    currentUserId: CURRENT_USER_ID,
    followingUserIds,
    likedTweetIds,
    allTweets,
    toggleFollow,
    toggleLike,
    composeTweet,
  }

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  )
}

export function useAppState(): AppContextValue {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}

export function useTimelineTweets(): Tweet[] {
  const { allTweets, currentUserId, followingUserIds } = useAppState()
  const allowedUserIds = new Set<string>([currentUserId, ...Array.from(followingUserIds)])
  return allTweets.filter(t => allowedUserIds.has(t.userId))
}

export function useUserTweets(userId: string): Tweet[] {
  const { allTweets } = useAppState()
  return allTweets.filter(t => t.userId === userId)
}

export { users }