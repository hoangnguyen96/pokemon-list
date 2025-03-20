import { LIST_SUBTYPE, LIST_SUPERTYPE, LIST_TYPE } from "../constants";

export const queryParamsFilter = (
  searchValues?: string[],
  checkList?: string[],
  hpList?: string[]
) => {
  if (
    (!searchValues || searchValues.length === 0) &&
    (!checkList || checkList.length === 0) &&
    (!hpList || hpList.length === 0)
  ) {
    return "";
  }

  const querySearch = searchValues
    ?.map((value) => `name:*${value}*`)
    .join(" OR ");

  const grouped: Record<string, string[]> = {};

  checkList?.forEach((item) => {
    let key: string | undefined;
    if (new Set(LIST_SUPERTYPE).has(item)) key = "supertype";
    if (new Set(LIST_SUBTYPE).has(item)) key = "subtypes";
    if (new Set(LIST_TYPE).has(item)) key = "types";

    if (key) {
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(`"${item}"`);
    }
  });

  const queryCheckList = Object.entries(grouped)
    .map(([key, values]) =>
      key === "supertype"
        ? values.map((v) => `${key}:${v}`).join(" OR ")
        : values.map((v) => `${key}:${v}`).join(" ")
    )
    .join(" ");

  const queryHp =
    hpList && hpList.length === 2 ? `hp:[${hpList[0]} to ${hpList[1]}]` : "";

  return (
    "q=" +
    `${querySearch || ""} ${queryCheckList || ""} ${queryHp}`.trim() +
    "&"
  );
};
