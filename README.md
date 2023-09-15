# ⚡ Open-API-Base [![API CI](https://github.com/czioutas/open-api-base/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/czioutas/open-api-base/actions/workflows/ci.yml)

This repository contains a free API written, with the aim to provide a fully fledged API system that can support your project from start to thousands of users/calls etc without the need of external services except infrastructure components such as Databases, Cache layers, Mailing systems etc.

## Why?

This API is built upon a decade plus of experience.
In addition we are real time capturing the **active** coding hours using wakatime which you can see 👉 [![wakatime](https://wakatime.com/badge/github/czioutas/open-api-base.svg)](https://wakatime.com/badge/github/czioutas/open-api-base)

_this does not include, build time, waiting for CI, googling, etc._

# Table of Contents

- [Steps](#steps)
- [Features](#features)
- [Technologies](#technologies)
- [Code README](core/README.md)
- [License](#license)

## Steps

- copy repo
- rename namespace if you prefer
- adapt the .env file with any service you wish to use
- enable the CI/CD pipelines based on your needs
- run it on your cloud of choice either as raw code or container

### Features

- Configuration (via .env files) used by DI
- Logging (The API uses [Logtail](https://betterstack.com/) but you can switch to any provider)
- Authentication (MagicLink/Passwordless)
- Email Communication (The API uses [Sendgrid](https://sendgrid.com/) but you can switch to any provider)
- Exception handling
- Health Checks endpoint (Quick or Database check as minimum)

### Technologies

- [Nestjs](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Github Actions](https://github.com/features/actions)
- [Docker](https://www.docker.com/)

### License

This codebase is using the MIT License and therefore is available to be used however the actor decides.
A mention of this [repo](https://github.com/czioutas/open-api-base) or [myself](https://twitter.com/czioutas) would be greatly be appreciated. 🙇‍♂️

### More

You can follow the journey of development on twitter [here](https://twitter.com/czioutas/thread/1696242160536797467) and the blog posts [here](https://openapibase.com/blog/)
