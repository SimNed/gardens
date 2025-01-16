import GardenAssistant from "./assistant/components/GardenAssistant";
import Section from "./components/Section";

export default async function HomePage() {
  return (
    <>
      <Section variant="xl">
        <p>home</p>
        <GardenAssistant plants={[]} />
      </Section>
    </>
  );
}
