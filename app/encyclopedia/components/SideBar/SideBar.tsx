"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlantList from "./SideBarLists/PlantList";
import FamilyList from "./SideBarLists/FamilyList";
import GenusList from "./SideBarLists/GenusList";
import { SWRConfig } from "swr";

const swrConfig = {
  // Garde les données en cache même quand la fenêtre perd le focus
  revalidateOnFocus: false,
  // Désactive le revalidation automatique
  revalidateIfStale: false,
  // Garde les données en cache quand le composant est démonté
  revalidateOnReconnect: false,
  // Conserve les données en cache pendant 24h (en millisecondes)
  dedupingInterval: 24 * 60 * 60 * 1000,
};

const SideBar = () => {
  return (
    <SWRConfig value={swrConfig}>
      <aside className="overflow-hidden p-4">
        <Tabs defaultValue="plant" className="w-full h-full">
          <TabsList className="w-full grid grid-cols-[1fr_1fr_1fr]">
            <TabsTrigger value="plant">Plante</TabsTrigger>
            <TabsTrigger value="family">Famille</TabsTrigger>
            <TabsTrigger value="genus">Genre</TabsTrigger>
          </TabsList>
          <TabsContent value="plant">
            <PlantList />
          </TabsContent>
          <TabsContent value="family">
            <FamilyList />
          </TabsContent>
          <TabsContent value="genus">
            <GenusList />
          </TabsContent>
        </Tabs>
      </aside>
    </SWRConfig>
  );
};

export default SideBar;
