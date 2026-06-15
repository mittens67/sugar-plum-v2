import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error("DATABASE_URL is not defined in environment variables")
  }

  // Strip query parameters to prevent conflicts with manual SSL config
  // Supabase connection strings often include ?sslmode=require which 
  // can override rejectUnauthorized: false in some pg versions.
  const connectionString = url.split('?')[0]

  const pool = new pg.Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const adapter = new PrismaPg(pool, {
    schema: undefined
  })
  
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma