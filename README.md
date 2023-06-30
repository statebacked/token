# @statebacked/token - Utilities for generating end-user JWTs for the State Backed XState backend as a service
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/statebacked/token/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/@statebacked/token.svg?style=flat)](https://www.npmjs.com/package/@statebacked/token) [![CI](https://github.com/statebacked/token/actions/workflows/ci.yaml/badge.svg)](https://github.com/statebacked/token/actions/workflows/ci.yaml) [![Docs](https://img.shields.io/badge/docs-token-blue)](https://statebacked.github.io/token/)

Your end users make requests to [State Backed](https://statebacked.dev) to create instances of machines you've defined, read machine instance state, and send events to machine instances.
Use these utilities to create a token to authenticate those requests.

## :warning: WARNING: The utilities in this package should only be used in trusted, server-side environments :warning:

Once you have generated a token, the token can be used by your client to interact with your State Backed machines but generating a token requires access to one of your secret keys, which must never be exposed.

# State Backed authn/authz

State Backed only processes requests that provide JWTs signed with your API keys.
You can also include claims about your end-users in your JWTs.
Your machines can use those end-user claims to authorize read and write requests.

For example, you may only allow a user with id = 'xyz123' to read or write from a machine instance with the name 'xyz123'.
Or, you may only allow users with a group that's included in your machine instance's `allowedGroups` context property to access the machine.

# Installation

NPM
```
npm install --save @statebacked/token
```

Yarn
```
yarn add @statebacked/token
```

Deno
```
import type { signToken } from "https://deno.land/x/statebacked_token/mod.ts";
```

# Overview

A State Backed machine definition consists of a javascript file that exports the following:
- Default export an [XState](https://xstate.js.org/docs/) state machine (e.g. `export default createMachine(...)`)
- Export an `allowRead` function that accepts an object containing `{ machineInstanceName, state, context, authContext }` and returns a boolean indicating whether an entity with the provided `authContext` should be allowed to read an instance of the machine having the provided name, state, and context.
- Export an `allowWrite` function that accepts an object containing `{ machineInstanceName, state, context, event, authContext }` and returns a boolean indicating whether an entity with the provided `authContext` should be allowed to write `event` to an instance of the machine having the provided name, state, and context.

This module provides utilities for generating the JWTs whose claims make up the `authContext` you use for authorization decisions.

# State Backed

[State Backed](https://statebacked.dev) allows you to spin up a backend by writing only an XState state machine.

Check out our [docs](https://docs.statebacked.dev) and get started with the [smply CLI](https://github.com/statebacked/smply). You can have a state machine backend running in 5 minutes.

# License

@statebacked/token is [MIT licensed](https://github.com/statebacked/token/blob/main/LICENSE).
