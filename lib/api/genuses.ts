export async function getGenuses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/genuses`);
  if (!res.ok) throw new Error("Failed to fetch genuses list");
  return res.json();
}

export async function getGenus(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/genuses/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch genus");
  return res.json();
}
