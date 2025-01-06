export async function getFamilies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/families`);
  if (!res.ok) throw new Error("Failed to fetch families list");
  return res.json();
}

export async function getFamily(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/families/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch family");
  return res.json();
}
