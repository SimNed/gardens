"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/shadcn-ui/card";
import { Separator } from "@/app/components/shadcn-ui/separator";
import { useRouter } from "next/navigation";

interface QuizzMenuProps {
  label: string;
  description: string;
  icon: JSX.Element;
  elements: { label: string; url: string }[];
}

export default function QuizzMenu({
  label,
  description,
  icon,
  elements,
}: QuizzMenuProps) {
  const router = useRouter();

  return (
    <Card key={label} className="shadow-sm rounded-none">
      <CardHeader className="flex items-center">
        <div className="flex flex-row items-center">
          <div className="rounded-full bg-zinc-800 m-2 p-2 [&>*]:text-white">
            {icon}
          </div>
          <CardTitle className="text-lg">{label}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="w-full p-0">
        <ul className="p-2">
          {elements.map((element) => (
            <li
              key={element.label}
              onClick={() => router.push(`/quizz/${element.url}`)}
              className="p-2 hover:cursor-pointer hover:bg-zinc-100"
            >
              {element.label}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-lg flex justify-center items-center "></CardFooter>
    </Card>
  );
}
