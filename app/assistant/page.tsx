import Section from "../components/ui/Section";
import Assistant from "./components/Assistant";

export default async function AssistantPage() {
  return (
    <>
      <Section variant="full" isFullHeight>
        <Assistant plants={[]} />
      </Section>
    </>
  );
}
