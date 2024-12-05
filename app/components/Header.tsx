import React from "react";
import { Leaf } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils/style";
import { Button } from "@/components/ui/button";

const navigationData = [
  {
    label: <Leaf />,
    url: "/",
  },
  {
    label: "encyclopédie",
    url: "/encyclopedia",
  },
  {
    label: "recherche",
    url: "/search",
  },
  {
    label: "assistant",
    url: "/assistant",
  },
  {
    label: "flore",
    url: "/flore",
  },
  {
    label: "quizz",
    url: "/quizz",
  },
];

export default function Header() {
  return (
    <header className="flex justify-center space-x-20 p-4 sticky top-0 w-full h-16 z-50 bg-white">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationData.map((d) => (
            <NavigationMenuItem key={d.url}>
              <Link href={d.url} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle())}
                >
                  {d.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button>Sign up</Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Button variant="ghost">Log in</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
