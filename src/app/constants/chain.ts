import { Chain } from "@thirdweb-dev/sdk";

export const chain: Chain = {
  chainId: 1088,
  rpc: ["https://andromeda.metis.io/?owner=1088"],
  nativeCurrency: {
    name: "Metis",
    symbol: "METIS",
    decimals: 18,
  },
  shortName: "metis",
  slug: "metis",
  testnet: false,
  name: "Metis Andromeda",
};
