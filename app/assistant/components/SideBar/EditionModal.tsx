import { Button } from "@/app/components/shadcn-ui/button";
import Modal from "@/app/components/ui/Modal";
import SoilSelect from "@/app/components/ui/options/SoilSelect";
import SunExposureSelect from "@/app/components/ui/options/SunExposureSelect";
import { AssistantElementType } from "@/types/assistant";
import { Soil, SunExposure } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useAssistantContext } from "../../context";
import PlantSelect from "@/app/components/ui/options/PlantSelect";

interface EditionModalProps {
  isOpen: boolean;
  element: AssistantElementType;
  onClose: () => void;
}

interface EditionState {
  cropId?: string;
  soil?: Soil;
  sunExposure?: SunExposure;
}

export default function EditionModal({
  isOpen,
  element,
  onClose,
}: EditionModalProps) {
  const [state, setState] = useState<EditionState>({
    cropId: element.crop?.id,
    soil: element.soil,
    sunExposure: element.sunExposure,
  });

  useEffect(() => {
    setState({
      cropId: element.crop?.id,
      soil: element.soil,
      sunExposure: element.sunExposure,
    });
  }, [element]);

  const { updateElement } = useAssistantContext();

  const getCrop = async (id: string) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/${id}`
    ).then((response) => response.json());
  };

  const handleChanges = async () => {
    const updatedElement = element;
    updatedElement.crop = state.cropId
      ? await getCrop(state.cropId)
      : updatedElement.crop;
    updatedElement.soil = state.soil ?? updatedElement.soil;
    updatedElement.sunExposure =
      state.sunExposure ?? updatedElement.sunExposure;
    updateElement(element);
    onClose();
  };

  return (
    <Modal
      title="Edition"
      description={element.crop?.commonName ?? "Pas de culture."}
      footer={<Button onClick={handleChanges}>sauvegarder</Button>}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PlantSelect
        value={state.cropId ?? ""}
        onValueChange={(option) =>
          setState((prev) => ({ ...prev, cropId: option }))
        }
      />
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
    </Modal>
  );
}
