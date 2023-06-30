import * as signer from "./src/sign-token.ts";

export * from "./src/public-types.ts";

const encode = (input: string) => new TextEncoder().encode(input);
export const signToken = signer.signToken.bind(null, encode);
