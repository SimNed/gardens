export async function getIdentificationQuizz() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/quizzes/identification`
  );
  if (!res.ok) throw new Error("Failed to fetch quizz set");
  return res.json();
}

export async function getTaxonomyQuizz() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/quizzes/taxonomy`
  );
  if (!res.ok) throw new Error("Failed to fetch quizz set");
  return res.json();
}
