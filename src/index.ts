import { TextEncoder } from "node:util";
import * as signer from "./sign-token";

export * from "./public-types";

const encode = (input: string) => new TextEncoder().encode(input);

export const signToken = signer.signToken.bind(null, encode);
