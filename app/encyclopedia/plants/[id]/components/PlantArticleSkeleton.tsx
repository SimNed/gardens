"use client";
import Section from "@/app/components/Section";
import { Skeleton } from "@/app/components/shadcn-ui/skeleton";

export function PlantArticleSkeleton() {
  return (
    <>
      <div className="flex p-4 justify-start w-full">
        <Skeleton className="h-8 w-32 mb-6" />
      </div>
      <Section variant="lg">
        <div className="container px-4">
          <div className="grid grid-cols-[3fr_2fr] gap-24">
            <div>
              {/* Title and subtitle */}
              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-6" />

              {/* Three sections below subtitle */}
              <Skeleton className="h-52 w-full mb-8" />

              {/* Plant infos */}
              <Skeleton className="h-64 w-full" />
            </div>

            <div>
              {/* Image */}
              <Skeleton className="aspect-[4/3] w-full mb-8" />

              {/* Affinities */}
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
