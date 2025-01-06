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

interface QuizzNavigationCardProps {
  label: string;
  description: string;
  icon: JSX.Element;
  data: { label: string; url: string }[];
}

const QuizzNavigationCard = ({
  label,
  description,
  icon,
  data,
}: QuizzNavigationCardProps) => {
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
          {data.map((d) => (
            <li
              key={d.label}
              onClick={() => router.push(`/quizz/${d.url}`)}
              className="p-2 hover:cursor-pointer hover:bg-zinc-100"
            >
              {d.label}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-lg flex justify-center items-center "></CardFooter>
    </Card>
  );
};

export default QuizzNavigationCard;
