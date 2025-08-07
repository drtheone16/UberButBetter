import type React from 'react'
import type { User } from '../types'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const letters = parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '')
  return letters.join('') || name[0]?.toUpperCase() || '?'
}

export const Avatar: React.FC<{ user: User; size?: number }> = ({ user, size = 40 }) => {
  const initials = getInitials(user.displayName)
  const bg = user.accentColor ?? '#1d9bf0'
  const dimension = `${size}px`
  const fontSize = `${Math.max(12, Math.round(size * 0.4))}px`

  return (
    <div
      className="avatar"
      style={{
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize,
        userSelect: 'none',
        flex: '0 0 auto',
      }}
      aria-label={`${user.displayName} avatar`}
    >
      {initials}
    </div>
  )
}