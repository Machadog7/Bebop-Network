import { useState, useEffect, useCallback } from 'react'
import { getPosts } from '../services/localStorage/posts.js'
import { getUserById } from '../services/localStorage/users.js'

export function useFeed(filter = 'all') {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const loadPosts = useCallback(() => {
    let all = getPosts()
    if (filter === 'monetized') all = all.filter((p) => p.monetized)
    else if (filter !== 'all') all = all.filter((p) => p.mediaType === filter)
    const enriched = all.map((post) => ({
      ...post,
      user: getUserById(post.userId),
    }))
    setPosts(enriched)
  }, [filter])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const paginated = posts.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < posts.length

  const loadMore = () => setPage((p) => p + 1)
  const refresh = loadPosts

  return { posts: paginated, hasMore, loadMore, refresh, total: posts.length }
}
