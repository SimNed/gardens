import { GardenBedType } from "@/types/assistant";
import { RectangleType } from "@/types/grid";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

interface GardenContextProps {
  gardenState: GardenStateProps;
  setGardenState: Dispatch<SetStateAction<GardenStateProps>>;
  getRectangles: () => RectangleType[];
  getColdHardiness: () => number;
  setColdHardiness: (value: number) => void;
}

const GardenContext = createContext<GardenContextProps | null>(null);

interface GardenProviderProps {
  children: ReactNode;
}

interface GardenStateProps {
  gardenBeds: Array<GardenBedType>;
  selectedGardenBed: GardenBedType | null;
}

export function GardenProvider({ children }: GardenProviderProps) {
  const [gardenState, setGardenState] = useState<GardenStateProps>({
    gardenBeds: [],
    selectedGardenBed: null,
  });

  const getRectangles = () => {
    return gardenState.gardenBeds.map((gardenBen) => gardenBen.rectangle);
  };

  const coldHardiness = useRef(0);

  const getColdHardiness = () => {
    return coldHardiness.current;
  };

  const setColdHardiness = (value: number) => {
    coldHardiness.current = value;
  };

  const value: GardenContextProps = {
    gardenState,
    setGardenState,
    getRectangles,
    getColdHardiness,
    setColdHardiness,
  };

  return (
    <GardenContext.Provider value={value}>{children}</GardenContext.Provider>
  );
}

export function useGardenContext() {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
}
