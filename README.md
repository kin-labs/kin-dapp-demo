# Kin DApp Playground

## This app demonstrates three ways of integrating with [Kin](https://developer.kin.org/)

## Via a Back End Server implementing a Kin SDK

- e.g. [Node](https://github.com/kinecosystem/kin-node), [Python](https://github.com/kinecosystem/kin-python)

This app is designed to work with the following Kin Server Demos:

- [Node / Typescript](https://github.com/kin-starters/kin-demo-node-sdk)
- [Python](https://github.com/kin-starters/kin-demo-python-sdk)

## Via the [Kin TypeScript SDK](https://github.com/kin-sdk/kin-sdk-web) in the browser

## Via Solana Directly / [SDK-less](https://developer.kin.org/docs/developers/sdk-less)

## Prep

- Your App is registered on the [Kin Developer Portal](https://portal.kin.org/) so you can take advantage of the [Kin Rewards Engine](https://developer.kin.org/docs/essentials/kin-rewards-engine/) and get your App Index
- Environment variable for your server URL (if testing a Back End Server)
- Environment variable for your App Index (if testing a Client DApp or SDK-less DApp )
- Environment variable for your Kinetic Instance (if testing against your own Kinetic instance )

`.env`

```
REACT_APP_SERVER_URL=Your Server URL e.g. http://localhost:3001
REACT_APP_APP_INDEX=Your App Index e.g. 123
REACT_APP_KINETIC_ENDPOINT=https://my-kinetic.endpoint.com
```

## Install Packages

```
npm i
```

or

```
yarn
```

## Start

```
npm run start
```

or

```
yarn start
```

## If you're just getting started, you might want to look at [this](https://developer.kin.org/docs/develoeprs) first...

## Dev Community

Join us on [Discord](https://discord.com/invite/kdRyUNmHDn) if you're looking for support with your App or to connect with other active Kin developers
