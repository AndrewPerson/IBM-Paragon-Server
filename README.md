# IBM-Paragon-Server

A Node JS server for Paragon that runs on IBM Cloud Functions.

## Installation

1. Follow [this tutorial](https://cloud.ibm.com/docs/openwhisk) to setup a Cloud Functions namespace and the IBM Cloud CLI. If you have any issues, email me.
2. Run `npm install`.

## Deployment

This assumes you have already downloaded the IBM Cloud CLI and targeted a Resource Group for Cloud Functions.

If you haven't, check [here](https://cloud.ibm.com/docs/openwhisk).

1. Make sure that you are logged in on the IBM Cloud CLI and that you have a resource group targeted for Cloud Functions.
2. Run `npm install`.
3. Run `node deploy`.

The functions will turn up in whatever namespace you targeted as `resources` and `auth`.

## Invoking the functions

### auth

The auth function is invoked via a HTTP POST request. The body is just a string, which is the authorization code provided by the SBHS API.

For example:

```js
    await fetch("https://whatever.url.you.have/auth", {
        method: "POST",
        body: "<authorization code>"
    });
```

### resources

The resources function is invoked by a HTTP GET request. It takes one query parameter in the url, which is the token returned by the auth function.

For example:

```js
    await fetch("https://whatever.url.you.have/resource?token=<token from auth function>");
```
