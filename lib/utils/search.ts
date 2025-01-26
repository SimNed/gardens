import { SearchFormType, SearchRequestType } from "@/types/search";

export function convertFormToRequest(
  filterForm: SearchFormType
): SearchRequestType {
  if (!filterForm) return {};

  const request: SearchRequestType = {};

  if (filterForm.family?.value) request.familyId = filterForm.family.value;
  if (filterForm.genus?.value) request.genusId = filterForm.genus.value.value;
  if (filterForm.category?.value)
    request.plantCategoryId = filterForm.category.value;
  if (filterForm.lifeCycle?.value)
    request.lifeCycle = filterForm.lifeCycle.value;
  if (filterForm.sunExposure?.value)
    request.sunExposure = filterForm.sunExposure.value;
  if (filterForm.waterNeed?.value)
    request.waterNeed = filterForm.waterNeed.value;
  if (filterForm.melliferous?.value)
    request.melliferous = filterForm.melliferous.value;
  if (filterForm.coldHardiness?.value)
    request.coldHardiness = filterForm.coldHardiness.value.toString();

  return request;
}
