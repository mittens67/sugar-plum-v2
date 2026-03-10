import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center min-h-[60vh]">
      {/* Icon: Updated to Antique Gold with a soft glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <PackageSearch className="relative h-20 w-20 text-primary/60 stroke-[1.5]" />
      </div>

      {/* Message: Updated to Deep Plum Serif */}
      <h2 className="text-3xl sm:text-4xl font-serif italic text-plum">
        A Missing Treat...
      </h2>
      <p className="text-plum/60 mt-4 max-w-md italic">
        It seems this particular creation has vanished from our oven. 
        Perhaps it’s being reimagined?
      </p>

      {/* Actions: Buttons will now automatically use your new Gold/Plum styles */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/menu">
          <Button variant="default" size="lg">Browse the Menu</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductNotFound;