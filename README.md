# MonzoJS

> Unofficial wrapper for the Monzo API written in TypeScript.

[![NPM](https://img.shields.io/npm/v/@marceloclp/monzojs.svg)](https://www.npmjs.com/package/@marceloclp/monzojs)

MonzoJS **does not** handle authentication, and you must already have your access token in hands.

# Installation

```bash
npm i @marceloclp/monzojs
```

# Usage

MonzoJS exports all endpoints as unauthed endpoints in case you do not need access to all of the methods:

```ts
import { getTransactions } from 'monzojs'

const example = async () => {
  // Note the use of the access token.
  const transactions = await getTransactions('myAccessToken', { limit: 50 })
}
```

Or you can import the client which will return an object containing all authenticated endpoints:

```ts
import MonzoClient from 'monzojs'

const example = async () => {
  const client = MonzoClient('myAccessToken')
  const transactions = await client.getTransactions({ limit: 50 })
  const accounts = await client.getAccounts()
}
```

# API

Here is a list of all the existing endpoints:

### Accounts

* `getAccounts()`

### Attachments

* `uploadAttachment()`
* `registerAttachment()`
* `deregisterAttachment()`

### Balance

* `getBalance()`

### Feed Items

* `createFeedItem()`

### Pots

* `getPots()`
* `depositIntoPot()`
* `withdrawFromPot()`

### Receipts

* `getReceipt()`
* `createReceipt()`
* `updateReceipt()`
* `deleteReceipt()`

### Transactions

* `getTransaction()`
* `getTransactions()`
* `annotateTransaction()`
* `safelyAnnotateTransaction()`

### Webhooks

* `getWebhooks()`
* `createWebhook()`
* `deleteWebhook()`