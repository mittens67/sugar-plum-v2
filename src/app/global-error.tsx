"use client";

import { AlertCircle } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-background text-plum">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-500/10 border border-red-500/20 rounded-full p-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-serif italic">
                Something went wrong
              </h1>
              <p className="text-plum/60 text-sm md:text-base">
                An unexpected error occurred. Please try refreshing the page.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && error.message && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-left">
                <p className="text-xs text-red-600/70 font-mono break-words">
                  {error.message}
                </p>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full bg-primary hover:bg-primary/90 text-plum font-bold py-3 px-6 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
