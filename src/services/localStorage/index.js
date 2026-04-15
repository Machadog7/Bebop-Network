export * from './users.js'
export * from './posts.js'
export * from './gigs.js'
export * from './marketplace.js'
export * from './battles.js'
export * from './lives.js'

import { seedUsers } from './users.js'
import { seedPosts } from './posts.js'
import { seedVenues, seedGigs } from './gigs.js'
import { seedMarketplace } from './marketplace.js'
import { seedBattles } from './battles.js'
import { seedLives } from './lives.js'

export function seedAll() {
  seedUsers()
  seedPosts()
  seedVenues()
  seedGigs()
  seedMarketplace()
  seedBattles()
  seedLives()
}
