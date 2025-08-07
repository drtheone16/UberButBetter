import type React from 'react'
import type { Tweet } from '../types'
import { users } from '../data/mock'
import { Avatar } from './Avatar'
import { formatRelativeTime } from '../utils/time'
import { useAppState } from '../context/AppState'
import { Link } from 'react-router-dom'

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const author = users.find(u => u.id === tweet.userId)!
  const { likedTweetIds, toggleLike } = useAppState()
  const liked = likedTweetIds.has(tweet.id)

  return (
    <article className="tweet-card">
      <Link to={`/profile/${author.username}`} className="tweet-avatar">
        <Avatar user={author} />
      </Link>
      <div className="tweet-body">
        <div className="tweet-header">
          <Link to={`/profile/${author.username}`} className="tweet-author">
            <strong>{author.displayName}</strong>
            <span className="muted">@{author.username}</span>
          </Link>
          <span className="muted">· {formatRelativeTime(tweet.createdAt)}</span>
        </div>
        <div className="tweet-content">{tweet.content}</div>
        <div className="tweet-actions">
          <button className={liked ? 'like liked' : 'like'} onClick={() => toggleLike(tweet.id)} aria-pressed={liked}>
            {liked ? '♥ Liked' : '♡ Like'}
          </button>
        </div>
      </div>
    </article>
  )
}