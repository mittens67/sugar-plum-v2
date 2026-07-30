function validateEnv() {
  const required = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    // Public variables
    NEXT_PUBLIC_SUPABASE_URL: required.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: required.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://sugarplum.local",

    // Server-only variables
    SUPABASE_SERVICE_ROLE_KEY: required.SUPABASE_SERVICE_ROLE_KEY!,
    DATABASE_URL: required.DATABASE_URL!,

    // Meta
    NODE_ENV: (process.env.NODE_ENV || "development") as "development" | "production" | "test",
  };
}

const validatedEnv = validateEnv();

export const env = {
  // Public (safe to expose to client)
  supabaseUrl: validatedEnv.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: validatedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  baseUrl: validatedEnv.NEXT_PUBLIC_BASE_URL,

  // Server-only (never expose to client)
  supabaseServiceRoleKey: validatedEnv.SUPABASE_SERVICE_ROLE_KEY,
  databaseUrl: validatedEnv.DATABASE_URL,

  // Meta
  nodeEnv: validatedEnv.NODE_ENV,
  isDevelopment: validatedEnv.NODE_ENV === "development",
  isProduction: validatedEnv.NODE_ENV === "production",
};

export type Env = typeof env;
