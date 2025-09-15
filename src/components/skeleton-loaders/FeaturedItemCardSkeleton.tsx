import Card from "../ui/Card";

function FeaturedItemCardSkeleton({key} : Props) {
  return (
    <Card key={key} skeleton className="w-130 h-70 animate-pulse bg-gray-200" />
  );
}

interface Props {
  key: number;
}


export default FeaturedItemCardSkeleton;
