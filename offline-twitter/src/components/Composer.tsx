import { useMemo, useState } from 'react'
import type React from 'react'
import { useAppState } from '../context/AppState'
import { users } from '../data/mock'
import { Avatar } from './Avatar'

const MAX_LEN = 280

export const Composer: React.FC = () => {
  const { composeTweet, currentUserId } = useAppState()
  const me = useMemo(() => users.find(u => u.id === currentUserId)!, [currentUserId])
  const [text, setText] = useState('')

  const remaining = MAX_LEN - text.length
  const canTweet = text.trim().length > 0 && text.length <= MAX_LEN

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canTweet) return
    composeTweet(text.trim())
    setText('')
  }

  return (
    <form className="composer" onSubmit={onSubmit}>
      <div className="composer-avatar"><Avatar user={me} /></div>
      <div className="composer-body">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What is happening?!"
          maxLength={MAX_LEN}
        />
        <div className="composer-actions">
          <span className={remaining < 20 ? 'counter warn' : 'counter'}>{remaining}</span>
          <button type="submit" disabled={!canTweet}>Tweet</button>
        </div>
      </div>
    </form>
  )
}