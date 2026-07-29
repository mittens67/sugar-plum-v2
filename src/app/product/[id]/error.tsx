"use client";

import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <Section className="bg-background min-h-screen pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-full p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif italic text-plum">
            Oops! Something went wrong
          </h1>
          <p className="text-plum/60 text-sm md:text-base">
            We had trouble loading this product. Please try again.
          </p>
        </div>

        {error.message && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-left">
            <p className="text-xs text-red-600/70 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-plum font-bold rounded-full"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-primary/20 text-plum/60 hover:text-plum font-bold rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </Section>
  );
}
