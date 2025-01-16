export async function getPlants() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants`);
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
}

export async function getPlant(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch plant");
  return res.json();
}
