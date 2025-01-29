import { createThirdwebClient } from "thirdweb";

const clientId = "fbdbd68ce248deb4dca2130b68ab22d7";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
