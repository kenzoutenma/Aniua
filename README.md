# Aniua

## HOW RUN DOCKER

**Before build set enviroment!**
For this set env key from [example](https://github.com/AnswerShy/Aniua/blob/main/.example.env)

> To build app

```
docker compose -f compose.prod.yaml build --no-cache frontend
docker compose -f compose.prod.yaml up -d frontend
```
