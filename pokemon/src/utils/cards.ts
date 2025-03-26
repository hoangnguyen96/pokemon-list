import { ICard } from "../interfaces";
import { IFilterState } from "../stores";

export const queryParamsFilter = (
  filters: IFilterState,
  hpRange: [number, number] | []
) => {
  const filterFormatMap: Record<keyof IFilterState, (value: string) => string> =
    {
      name: (value) => `name:*${value}*`,
      supertype: (value) => `supertype:"${value}"`,
      subtypes: (value) => `subtypes:"${value}"`,
      types: (value) => `types:"${value}"`,
    };

  const queryParts = Object.entries(filters).map(([key, values]) => {
    if (values.length > 0) {
      const formatFn = filterFormatMap[key as keyof IFilterState];
      return values
        .map(formatFn)
        .join(key === "name" || key === "supertype" ? " OR " : " ");
    }
    return "";
  });

  const queryHp =
    hpRange && hpRange.length === 2
      ? `hp:[${hpRange[0]} to ${hpRange[1]}]`
      : "";

  return `${queryParts.filter(Boolean).join(" ")} ${queryHp}`.trim();
};

export const transformData = (list: ICard[]) => {
  return list.reduce((result: Record<string, ICard>, item) => {
    result[item.id] = item;
    return result;
  }, {});
};
