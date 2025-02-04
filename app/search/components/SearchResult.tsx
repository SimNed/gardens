import { AspectRatio } from "@/app/components/shadcn-ui/aspect-ratio";
import { PlantSearchResultType } from "@/types/search";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  results: PlantSearchResultType[];
}

export default function SearchResult({ results }: SearchResultProps) {
  const router = useRouter();

  return (
    <ul className="grid grid-cols-5 p-4 gap-4 flex-wrap justify-start ">
      {results &&
        results.length > 0 &&
        results.map((result: PlantSearchResultType) => (
          <li
            key={result.commonName}
            className="bg-zinc-800 text-white hover:cursor-pointer hover:[&>div>div>div>img]:brightness-50 hover:bg-zinc-800"
            onClick={() => router.push(`/encyclopedia/plants/${result.id}`)}
          >
            <h1 className="p-2">{result.commonName}</h1>
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={result.imageUrl}
                  alt={`illustration de ${result.commonName}`}
                  fill
                  priority
                  className="object-cover"
                />
              </AspectRatio>
            </div>
          </li>
        ))}
    </ul>
  );
}
