import { AspectRatio } from "@/app/components/shadcn-ui/aspect-ratio";
import { SearchResultType } from "@/types/filter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  results: SearchResultType[];
}

const SearchResult = ({ results }: SearchResultProps) => {
  const router = useRouter();

  return (
    <ul className="grid grid-cols-5 p-4 gap-4 flex-wrap justify-start ">
      {results &&
        results.length > 0 &&
        results.map((result: SearchResultType) => (
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
            {/* <div className="relative w-[250px] h-[125px]">
              <Image
                src={result.imageUrl}
                alt={"plante mystère"}
                fill
                priority
                sizes="(max-width: 450px) 100vw, (max-width: 200px) 50vw, 33vw"
                className="object-cover"
              />
            </div> */}
          </li>
        ))}
    </ul>
  );
};

export default SearchResult;
