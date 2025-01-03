"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/components/shadcn-ui/breadcrumb";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { SidebarTrigger } from "@/app/components/shadcn-ui/sidebar";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

interface DetailsHeaderProps {
  prevSteps?: { label: string; url: string }[];
  currentStepLabel: string;
}

const EncyclopediaArticleBreadCrumb = ({
  prevSteps,
  currentStepLabel,
}: DetailsHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 w-full items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {prevSteps &&
              prevSteps.map((step) => (
                <Fragment key={step.label}>
                  <BreadcrumbItem
                    key={step.label}
                    className="hidden md:block hover:cursor-pointer"
                  >
                    <BreadcrumbLink onClick={() => router.push(step.url)}>
                      {step.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentStepLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default EncyclopediaArticleBreadCrumb;
