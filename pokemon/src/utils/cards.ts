import { LIST_SUBTYPE, LIST_SUPERTYPE, LIST_TYPE } from "../constants";

export const queryParamsFromCheckList = (data: string[]) => {
  if (data.length === 0 || undefined) return "";

  const grouped: Record<string, string[]> = {};

  data.forEach((item) => {
    let key: string | undefined;
    if (new Set(LIST_SUPERTYPE).has(item)) key = "supertype";
    if (new Set(LIST_SUBTYPE).has(item)) key = "subtypes";
    if (new Set(LIST_TYPE).has(item)) key = "types";

    if (key) {
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(`"${item}"`);
    }
  });

  const queryString = Object.entries(grouped)
    .map(([key, values]) =>
      key === "supertype"
        ? values.map((v) => `${key}:${v}`).join(" OR ")
        : values.map((v) => `${key}:${v}`).join(" ")
    )
    .join(" ");

  return `q=${queryString}&`;
};
