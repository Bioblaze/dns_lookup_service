# DNS Lookup Service

Created this because I needed it, I hope it helps you. Dockerfile is included, should automatically deploy.

Example POST
```console
curl --location --request POST 'localhost:41419/api/dns/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "a",
    "domain": "divine.games"
}'
```

Example GET
```console
curl --location --request GET 'localhost:41419/api/dns/a/divine.games'
```