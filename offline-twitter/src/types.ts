export interface User {
  id: string
  username: string
  displayName: string
  bio?: string
  accentColor?: string
}

export interface Tweet {
  id: string
  userId: string
  content: string
  createdAt: string
}

export interface AppState {
  currentUserId: string
  followingUserIds: Set<string>
  likedTweetIds: Set<string>
}