import { useMemo } from 'react'
import type React from 'react'
import { useParams } from 'react-router-dom'
import { getUserByUsername } from '../data/mock'
import { Avatar } from '../components/Avatar'
import { useAppState, useUserTweets } from '../context/AppState'

const Profile: React.FC = () => {
  const { username = '' } = useParams()
  const user = useMemo(() => getUserByUsername(username), [username])
  const { currentUserId, followingUserIds, toggleFollow } = useAppState()

  if (!user) {
    return <div className="page"><h2>User not found</h2></div>
  }

  const isMe = user.id === currentUserId
  const isFollowing = followingUserIds.has(user.id)
  const tweets = useUserTweets(user.id)

  return (
    <div className="page">
      <div className="profile-header">
        <Avatar user={user} size={64} />
        <div className="profile-meta">
          <h2>{user.displayName}</h2>
          <div className="muted">@{user.username}</div>
          {user.bio && <p className="bio">{user.bio}</p>}
        </div>
        {!isMe && (
          <div className="profile-actions">
            <button className={isFollowing ? 'btn secondary' : 'btn primary'} onClick={() => toggleFollow(user.id)}>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
      <h3>Tweets</h3>
      <div>
        {tweets.length === 0 ? (
          <div className="empty">No tweets yet.</div>
        ) : (
          // reusing TweetList adds padding above composer; inline render here to keep tight
          tweets.map(t => (
            <div key={t.id} className="profile-tweet-row">
              {/* lightweight import to avoid circular */}
              {/* Using dynamic import would be overkill; duplicate minimal */}
              <div className="tweet-card">
                <div className="tweet-avatar"><Avatar user={user} /></div>
                <div className="tweet-body">
                  <div className="tweet-header">
                    <strong>{user.displayName}</strong>
                    <span className="muted">@{user.username}</span>
                  </div>
                  <div className="tweet-content">{t.content}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile