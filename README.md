# whoami-build-variables

The whoami service of the Tenkai real-runtime suite, whose build reads two build variables: the plain
`PUBLIC_GREETING` and the sensitive `BUILD_TOKEN`. `npm run build` writes what it read, and the service
answers it on `/build-variables`:

```json
{ "greeting": "<PUBLIC_GREETING>", "tokenSha256": "<SHA-256 of BUILD_TOKEN>" }
```

A missing variable gives `null`. The repository builds both ways Tenkai builds from Git: with its
`Dockerfile`, which reads `PUBLIC_GREETING` with `ARG` and `BUILD_TOKEN` as a secret, and with Railpack,
which runs the `build` script of `package.json` with both in its environment.
