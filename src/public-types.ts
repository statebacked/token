/**
 * The key to use for signing the JWT.
 *
 * Keys can be generated using the `smply` CLI by running `smply keys create`.
 * See our Getting Started docs at https://docs.statebacked.dev/ for more info.
 */
export type Key = {
  /**
   * The ID of the key to use for signing.
   */
  stateBackedKeyId: string;

  /**
   * The secret key corresponding to the key ID to use for signing.
   */
  stateBackedSecretKey: string;
};

// types for https://github.com/panva/jose/blob/main/src/lib/secs.ts
export type Seconds = "s" | "sec" | "secs" | "second" | "seconds";
export type Minutes = "m" | "min" | "mins" | "minute" | "minutes";
export type Hours = "h" | "hr" | "hrs" | "hour" | "hours";
export type Days = "d" | "day" | "days";
export type Weeks = "w" | "week" | "weeks";
export type Years = "y" | "yr" | "yrs" | "year" | "years";
export type TimeSpecifier = Seconds | Minutes | Hours | Days | Weeks | Years;

/**
 * Number of seconds since the epoch
 */
export type EpochSeconds = number;

/**
 * Options for signing the JWT.
 */
export type SigningOptions = {
  /**
   * JWT expiration configuration.
   *
   * Either specify `expires.in` or `expires.at`. `expires.at` takes precedence.
   *
   * `expires.at`
   */
  expires:
    | {
        /**
         * A string specifying a time duration, like "7d" or "30m".
         */
        in: `${number}${TimeSpecifier}`;
      }
    | {
        /**
         * A Date or number of seconds since epoch.
         */
        at: Date | EpochSeconds;
      };

  /**
   * The issuer of the JWT. Should be set to your domain name.
   * Defaults to ${keyId}.client.statebacked.dev.
   */
  issuer?: string;
};
