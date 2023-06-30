import { SignJWT } from "https://deno.land/x/jose@v4.14.4/index.ts";
import { Key, SigningOptions } from "./src/public-types.ts";

export * from "./src/public-types.ts";

/**
 * Given a State Backed key id and secret, end-user claims, and signing options,
 * return a Promise for a signed JWT suitable for sending in the authorization header
 * of requests to State Backed.
 * 
 * The end-user claims should include a `sub` claim with the end-user's unique id
 * and may include any other data that your machines' `allowRead` and `allowWrite`
 * authorization functions need.
 * 
 * It is best practice to set the issuer in your signing options to your domain
 * and set either `expires.at` or `expires.in` to a reasonable value, matching
 * your session duration.
 * 
 * @param key - The State Backed key id and secret to use for signing.
 *              You can generate one by running `smply keys create`.
 *              Check the Getting Started guide at https://docs.statebacked.dev/
 *              for more information.
 * @param payload - The end-user claims to include in the JWT.
 *                  Should include a `sub` claim with the end-user's id.
 * @param options - Options for signing the JWT.
 *                  Set `issuer` to your domain and provide either
 *                 `expires.at` or `expires.in` to set the expiration time.
 *                 `expires.in` should be a string like "7d" or "30m".
 *                 `expires.at` can be a Date or seconds since epoch.
 *                 `expires.at` is used if both are provided.
 * @returns A Promise for a signed JWT.
 */
export const signToken = (
  { stateBackedKeyId, stateBackedSecretKey }: Key,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { sub?: string; [key: string]: any },
  options: SigningOptions
) =>
  new SignJWT({ act: payload })
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
    .sign(new TextEncoder().encode(stateBackedSecretKey));

