import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import Badge from '../Badge'
import { formatDate, formatNumber } from '../../../utils/formatters.js'
import { likePost, sharePost, addComment } from '../../../services/localStorage/posts.js'
import { useAuth } from '../../../hooks/useAuth.js'

export default function PostCard({ post, user, onUpdate }) {
  const { user: currentUser, isAuthenticated } = useAuth()
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likes || 0)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(post?.comments || [])

  if (!post) return null

  const displayUser = user || { name: 'Músico', username: 'musico' }

  const handleLike = () => {
    if (!liked) {
      likePost(post.id)
      setLikesCount((c) => c + 1)
      setLiked(true)
    }
  }

  const handleShare = () => {
    sharePost(post.id)
    navigator.clipboard?.writeText(window.location.origin + `/profile/${displayUser.username}`)
      .catch(() => {})
  }

  const handleComment = () => {
    if (!commentText.trim() || !isAuthenticated) return
    const updated = addComment(post.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      text: commentText.trim(),
    })
    if (updated) {
      setComments(updated.comments)
      setCommentText('')
    }
  }

  const cardStyle = {
    background: '#12121a', border: '1px solid #1e1e2e',
    borderRadius: '12px', marginBottom: '16px', overflow: 'hidden',
  }
  const headerStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '16px', borderBottom: '1px solid #1e1e2e',
  }
  const contentStyle = { padding: '16px', color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }
  const actionsStyle = {
    display: 'flex', gap: '8px', padding: '12px 16px',
    borderTop: '1px solid #1e1e2e',
  }
  const actionBtn = (active) => ({
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'none', border: 'none',
    color: active ? '#f59e0b' : '#94a3b8',
    cursor: 'pointer', fontSize: '0.85rem', padding: '6px 10px',
    borderRadius: '8px', transition: 'all 0.2s',
  })

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <Link to={`/profile/${displayUser.username}`}>
          <Avatar src={displayUser.profilePicture} name={displayUser.name} size="sm" />
        </Link>
        <div style={{ flex: 1 }}>
          <Link to={`/profile/${displayUser.username}`} style={{ color: '#e2e8f0', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
            {displayUser.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#475569', fontSize: '0.8rem' }}>@{displayUser.username}</span>
            <span style={{ color: '#475569', fontSize: '0.75rem' }}>· {formatDate(post.createdAt)}</span>
          </div>
        </div>
        {post.monetized && <Badge label="💰 Monetizado" color="gold" size="sm" />}
      </div>

      <div style={contentStyle}>
        <p style={{ margin: 0 }}>{post.content}</p>
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ color: '#f59e0b', fontSize: '0.82rem' }}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div style={actionsStyle}>
        <button style={actionBtn(liked)} onClick={handleLike}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          {liked ? '❤️' : '🤍'} {formatNumber(likesCount)}
        </button>
        <button style={actionBtn(false)} onClick={() => setShowComments((s) => !s)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(148,163,184,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          💬 {comments.length}
        </button>
        <button style={actionBtn(false)} onClick={handleShare}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(148,163,184,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          🔗 {formatNumber(post.shares || 0)}
        </button>
      </div>

      {showComments && (
        <div style={{ borderTop: '1px solid #1e1e2e', padding: '12px 16px' }}>
          {comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '0.85rem' }}>
              <Avatar name={c.userName} size="xs" />
              <div style={{ background: '#1a1a26', borderRadius: '8px', padding: '8px 12px', flex: 1 }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{c.userName}</span>
                <p style={{ margin: '2px 0 0', color: '#94a3b8' }}>{c.text}</p>
              </div>
            </div>
          ))}
          {isAuthenticated && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Adicionar comentário..."
                style={{ flex: 1, background: '#1a1a26', border: '1px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '8px 12px', fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none' }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleComment() }}
              />
              <button onClick={handleComment} style={{ background: '#f59e0b', border: 'none', borderRadius: '8px', color: '#0a0a0f', padding: '8px 14px', cursor: 'pointer', fontWeight: 600 }}>→</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
