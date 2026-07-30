export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side instrumentation (Node.js runtime)
    // Use this hook for initializing logging, tracing, error tracking
    // Example patterns:
    // - Initialize Sentry, DataDog, New Relic
    // - Setup custom error handlers
    // - Configure structured logging
    // - Initialize APM (Application Performance Monitoring)

    console.log("🎯 Instrumentation initialized (Node.js runtime)");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime instrumentation
    // Limited to what's available in Edge Runtime (Cloudflare Workers, Vercel Edge)
    // Example:
    // - Lightweight telemetry
    // - Request tracing headers

    console.log("⚡ Instrumentation initialized (Edge runtime)");
  }
}
