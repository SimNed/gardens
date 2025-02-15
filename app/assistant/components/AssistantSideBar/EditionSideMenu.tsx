import { Button } from "@/app/components/shadcn-ui/button";
import SoilSelect from "@/app/components/ui/options/SoilSelect";
import SunExposureSelect from "@/app/components/ui/options/SunExposureSelect";
import { AssistantElementType } from "@/types/assistant";
import { Soil, SunExposure } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useAssistantContext } from "../../context";
import PlantSelect from "@/app/components/ui/options/PlantSelect";
import SheetBlock from "@/app/components/ui/SheetBlock";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import Loader from "@/app/components/ui/Loader";

interface EditionSideMenuProps {
  isOpen: boolean;
  element?: AssistantElementType;
  onClose: () => void;
}

interface EditionState {
  cropId?: string;
  soil?: Soil;
  sunExposure?: SunExposure;
}

export default function EditionSideMenu({
  isOpen,
  element,
  onClose,
}: EditionSideMenuProps) {
  const [state, setState] = useState<EditionState>({
    cropId: element?.crop?.id,
    soil: element?.soil,
    sunExposure: element?.sunExposure,
  });

  useEffect(() => {
    setState({
      cropId: element?.crop?.id,
      soil: element?.soil,
      sunExposure: element?.sunExposure,
    });
  }, [element]);

  const { updateElement } = useAssistantContext();

  const { data: crop, isLoading } = useSWR(
    state.cropId
      ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/${state.cropId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleChanges = async () => {
    const updatedElement = element;
    if (!updatedElement) return;
    updatedElement.crop = state.cropId ? await crop : updatedElement.crop;
    updatedElement.soil = state.soil ?? updatedElement.soil;
    updatedElement.sunExposure =
      state.sunExposure ?? updatedElement.sunExposure;
    updateElement(element);
    onClose();
  };

  const footer = (
    <div className="flex gap-6">
      <Button onClick={handleChanges}>sauvegarder</Button>
      {isLoading && <Loader />}
    </div>
  );

  return (
    <SheetBlock
      title="Edition"
      description={element?.crop?.commonName ?? "Pas de culture."}
      footer={footer}
      isOpen={isOpen}
      isModal={false}
      onClose={onClose}
    >
      <div className="grid grid-cols-[3fr_1fr] items-end gap-4">
        <PlantSelect
          value={state.cropId ?? ""}
          onValueChange={(option) =>
            setState((prev) => ({ ...prev, cropId: option }))
          }
          className="my-0"
        />
        <Button variant="secondary">interroger</Button>
      </div>
      <SoilSelect
        value={state.soil ?? ""}
        onValueChange={(option) =>
          setState({ ...state, soil: Soil[option as keyof typeof Soil] })
        }
      />
      <SunExposureSelect
        value={state.sunExposure ?? ""}
        onValueChange={(option) =>
          setState({
            ...state,
            sunExposure: SunExposure[option as keyof typeof SunExposure],
          })
        }
      />
    </SheetBlock>
  );
}
