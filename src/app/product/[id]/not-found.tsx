import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <Section className="bg-background min-h-screen pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 border border-primary/20 rounded-full p-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif italic text-plum">
            Product not found
          </h1>
          <p className="text-plum/60 text-sm md:text-base">
            This delightful creation seems to have disappeared from our shelves.
            Let's find you something sweet instead.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/menu" className="flex-1">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-plum font-bold rounded-full"
            >
              Browse Menu
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary/20 text-plum/60 hover:text-plum font-bold rounded-full"
            >
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
