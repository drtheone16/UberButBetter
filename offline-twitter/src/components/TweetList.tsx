import type React from 'react'
import type { Tweet } from '../types'
import { TweetCard } from './TweetCard'

export const TweetList: React.FC<{ tweets: Tweet[] }> = ({ tweets }) => {
  if (tweets.length === 0) {
    return <div className="empty">No tweets yet.</div>
  }
  return (
    <div className="tweet-list">
      {tweets.map(t => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </div>
  )
}