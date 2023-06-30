export type Key = {
  stateBackedKeyId: string;
  stateBackedSecretKey: string;
};

// types for https://github.com/panva/jose/blob/main/src/lib/secs.ts
type seconds = "s" | "sec" | "secs" | "second" | "seconds";
type minutes = "m" | "min" | "mins" | "minute" | "minutes";
type hours = "h" | "hr" | "hrs" | "hour" | "hours";
type days = "d" | "day" | "days";
type weeks = "w" | "week" | "weeks";
type years = "y" | "yr" | "yrs" | "year" | "years";
type timeSpecifier = seconds | minutes | hours | days | weeks | years;

export type EpochSeconds = number;

export type SigningOptions = {
  expires: { in: `${number}${timeSpecifier}` } | { at: Date | EpochSeconds };
  issuer?: string;
};
