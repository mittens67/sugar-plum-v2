import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <PackageSearch className="h-16 w-16 text-gray-400 mb-4" />

      {/* Message */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Product Not Found
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sorry, the product you are looking for doesn’t exist or is unavailable.
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Link href="/menu">
          <Button variant="default">Browse Menu</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductNotFound;
