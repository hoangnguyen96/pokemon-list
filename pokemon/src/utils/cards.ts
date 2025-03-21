import { IFilterState } from "../stores";

export const queryParamsFilter = (
  filters: IFilterState,
  hpRange: [number, number] | []
) => {
  const { name, subtypes, supertype, types } = filters;
  const queryName =
    name.value.length > 0
      ? name.value.map((value) => `name:*${value}*`).join(" OR ")
      : "";
  const querySupertype =
    supertype.value.length > 0
      ? supertype.value.map((value) => `supertype:"${value}"`).join(" OR ")
      : "";
  const querySubtypes =
    subtypes.value.length > 0
      ? subtypes.value.map((value) => `subtypes:"${value}"`).join(" ")
      : "";
  const queryTypes =
    types.value.length > 0
      ? types.value.map((value) => `types:"${value}"`).join(" ")
      : "";

  const queryHp =
    hpRange && hpRange.length === 2
      ? `hp:[${hpRange[0]} to ${hpRange[1]}]`
      : "";

  return `${queryName} ${querySupertype} ${querySubtypes} ${queryTypes} ${queryHp}`.trim();
};
