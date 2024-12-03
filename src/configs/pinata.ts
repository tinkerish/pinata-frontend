import { PinataSDK } from "pinata";

const isDevelopment = import.meta.env.MODE === "development";

export const pinata = new PinataSDK({
  pinataJwt: isDevelopment
    ? import.meta.env.VITE_PINATA_JWT
    : process.env.VITE_PINATA_JWT,
  pinataGateway: isDevelopment
    ? import.meta.env.VITE_GATEWAY_URL
    : process.env.VITE_GATEWAY_URL,
});
