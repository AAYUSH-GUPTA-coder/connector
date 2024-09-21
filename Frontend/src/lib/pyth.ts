import { PriceServiceConnection } from "@pythnetwork/price-service-client";

const pythConnection = new PriceServiceConnection("https://hermes.pyth.network");

export default pythConnection