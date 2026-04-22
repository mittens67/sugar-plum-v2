import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error("DATABASE_URL is not defined in environment variables")
  }

  // Supabase pooler often requires SSL and uses certificates that might not be 
  // in the local trust store. rejectUnauthorized: false allows the connection.
  // We strip the sslmode from the URL to avoid warnings, as we configure 
  // SSL explicitly in the pool options below.
  const connectionString = url.split('?')[0] + '?' + url.split('?')[1]?.replace(/sslmode=[^&]+/, '')

  const pool = new pg.Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
  const adapter = new PrismaPg(pool)

  return new PrismaClient({
    adapter,
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
