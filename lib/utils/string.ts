export function normalizeString(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function sanitizedString(str: string) {
  return normalizeString(str).toLowerCase().trim();
}

export function sanitizedQuizzString(str: string) {
  return normalizeString(str).replace(/ee$/, "eae");
}
