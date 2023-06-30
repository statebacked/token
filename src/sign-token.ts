import { SignJWT } from "jose";
import { Key, SigningOptions } from "./public-types";

export const signToken = (
  encode: (input: string) => Uint8Array,
  { stateBackedKeyId, stateBackedSecretKey }: Key,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { sub?: string; [key: string]: any },
  options: SigningOptions
) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", kid: stateBackedKeyId })
    .setAudience("https://api.statebacked.dev/")
    .setExpirationTime(
      "at" in options.expires
        ? options.expires.at instanceof Date
          ? Math.floor(options.expires.at.getTime() / 1000)
          : options.expires.at
        : options.expires.in
    )
    .setIssuer(
      options.issuer || `https://${stateBackedKeyId}.client.statebacked.dev/`
    )
    .setIssuedAt()
    .sign(encode(stateBackedSecretKey));
