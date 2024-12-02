"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface QuizzNavigationCardProps {
  label: string;
  url: string;
  description: string;
  icon: JSX.Element;
}

const QuizzNavigationCard = ({
  label,
  url,
  description,
  icon,
}: QuizzNavigationCardProps) => {
  const router = useRouter();

  return (
    <Card
      key={label}
      onClick={() => router.push(`/quizz${url}`)}
      className="hover:cursor-pointer hover:bg-zinc-100 grid grid-rows-[2fr_3fr_1fr] shadow-sm"
    >
      <CardHeader className="p-8">
        <CardTitle className="text-lg">{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="rounded-full bg-zinc-800 p-4 [&>*]:w-16 [&>*]:h-16 [&>*]:text-white">
          {icon}
        </div>
      </CardContent>
      <CardFooter className="text-lg flex justify-center items-center "></CardFooter>
    </Card>
  );
};

export default QuizzNavigationCard;
