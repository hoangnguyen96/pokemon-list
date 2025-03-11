export interface ICard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom?: string;
  attacks?: Attack[];
  abilities?: Ability[];
  weaknesses?: WeaknessResistance[];
  resistances?: WeaknessResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: CardSet;
  number: string;
  artist: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: PriceSource;
  cardmarket?: PriceSource;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

type Ability = {
  name: string;
  text: string;
  type: "Poké-Body" | "Poké-Power" | "Ability";
};

export interface WeaknessResistance {
  type: string;
  value: string;
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface Legalities {
  unlimited: string;
}

export interface PriceSource {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Prices {
  holofoil?: PriceDetails;
  reverseHolofoil?: PriceDetails;
  averageSellPrice?: number;
  lowPrice?: number;
  trendPrice?: number;
  germanProLow?: number;
  suggestedPrice?: number;
  reverseHoloSell?: number;
  reverseHoloLow?: number;
  reverseHoloTrend?: number;
  lowPriceExPlus?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
  reverseHoloAvg1?: number;
  reverseHoloAvg7?: number;
  reverseHoloAvg30?: number;
}

export interface PriceDetails {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number | null;
}
