import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error("DATABASE_URL is not defined in environment variables")
  }

  // Use URL constructor for safer parsing and manipulation
  let connectionString = url
  try {
    const dbUrl = new URL(url)
    // Supabase pooler often requires SSL. rejectUnauthorized: false allows the connection
    // to work with Supabase's self-signed certificates in serverless environments.
    // We remove sslmode from the URL if present to avoid conflicts with explicit SSL config.
    dbUrl.searchParams.delete('sslmode')
    connectionString = dbUrl.toString()
  } catch (e) {
    // If it's not a valid URL (e.g. some complex connection strings), 
    // we fallback to the raw URL but it's risky.
    console.warn("Invalid DATABASE_URL format, using raw string")
  }

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
