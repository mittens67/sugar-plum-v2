import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error("DATABASE_URL is not defined in environment variables")
  }

  const pool = new pg.Pool({ 
    connectionString: url,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma