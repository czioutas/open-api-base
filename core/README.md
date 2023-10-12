# Technical Details

Even though some of the info here span across the repo, such as the Version system. We detail it inside this Technical
README within the main src folder.

### Table of Contents

- [Application](#application)
- [HealthCheck](#healtcheck)
- [Containerization](#containerization)
- [Versioning](#versioning)
- [Documentation](#documentation)
- [Git Specifics](#git)
- [Editor](#editor)
- [Logging](#logging)
- [Swagger](#swagger)
- [Authentication](#authentication)
- [Database](#database)
- [Commands](#commands)
- [Database Seed](#database-seed)
- [Encryption](#encryption)
- [Links](#🔗-links)

---

### Application

The application runs by default on port 3000. Please edit the .env.YOUR-ENV file to change it.

---

### HealthCheck

The application utilizes the package [terminus](https://github.com/nestjs/terminus) to do healthchecks against different
"scopes". The default check is that of the Database.

There are two endpoints:

- `/v1/health` which actually checks the health status of services & DB.
- `/v1/health/q` which just returns 1. This should be a faster check if your API is actually up.

---

### Containerization

The application comes by default with a simple container approach using Docker. You can find everything within
[Dockerfile](../core/Dockerfile) regarding the container and if you wish to run it using docker-compose you can use the
[docker-compose.yml](../core/docker-compose.yml) file.

### Versioning

We release using GitVersion (https://github.com/GitTools/GitVersion)
https://gitversion.net/docs/reference/intro-to-semver

- we push from PR & Master
- we use Mainline mode https://gitversion.net/docs/reference/versioning-modes/mainline-development
- and lastly we increment versions based on commits:

```
major-version-bump-message: '\+semver:\s?(breaking|major)'
minor-version-bump-message: '\+semver:\s?(feature|minor)'
patch-version-bump-message: '\+semver:\s?(fix|patch|task|info)'
```

For example, a commit message for a feature should look like this `+semver: feature ` following the description of the
changes.

Refer to the [GitVersion.yml](../GitVersion.yml) file for changes.

---

### Documentation

Within the application we strive to add as much useful documentation as possible. The application uses
[Compodoc](https://compodoc.app/) to visualize the whole state of the app (Modules, controllers etc).

In order to generate the documentation you can use the npm command `documentation`.

We host everything on cloudflare pages, so the flow is that the documentation is generated as part of the cloudflare
pages build, exported to /core/documentation as simple html and can be found at
[https://open-api-base-documentation.pages.dev/documentation/](https://open-api-base-documentation.pages.dev/documentation/)

---

### Git

In order to maintain consistency across any usage of the repo there are a few Git related changes.

- Using the [.gitattributes](../.gitattributes) file we make sure the ending of all files when being committed are that
  of LF regardless of the OS you are working under.

- Using the [.gitignore](../.gitignore) file we make sure that not every file inside the repo when created locally is
  pushed to the remote repository. For example, test result results generated during local testing.

---

### Editor

In order to keep a uniform style of the codebase, we employ the use of the [Editorconfig](../.editorconfig) file.

Most code editors/IDE these days support the use of this file.

It is worth mentioning that .editorconfig files work on a hierarchy based on folder levels. Therefore if you wish to
have in one folder a different style you are free to add another .editorconfig file.

---

### Logging

Logging requests is done using a battle-tested package named `winston`. For those familiar also with simple express
setups, it is probably the default package for logging.

In combination as we wish to send our logs to Logtail (Now known as Betterstack) we use their own package to change the
transports. If you wish to change the logging service, all you need to do is add a different transport on the
[logging.ts](/core/src/logging.ts) file.

---

### Swagger

---

### Authentication

The authentication system uses a "MagicLink"/"Passwordless" approach. There is no password involved and the only way for
the user to be authenticated is by clicking on a link which is sent via Email.

The flow is as follows: login/register -> sent email with magic link -> receive JWT token bundle

The JWT Token bundle contains the following:

```
/**
 * This class is a wrapper dto that is sent after authentication.
 * The idToken is used to get an accessToken
 */
export class AuthSuccessDto {
  idToken: string;
  refreshToken: string;
  userId: string;
}
```

If we deconstruct the above we see 3 different properties:

- idToken: This is the JWT-Token which you can exchange for an AccessToken. IdTokens are only used for acquiring the
  AccessToken and do not have any other access.

- refreshToken: This is another JWT-Token which is used to get a new IdToken after the current IdToken has expired. This
  is commonly used when a user has logged in but is inactive for X period of time. Then instead of forcing them through
  the whole re-login process we use the refreshToken to get our Tokens refreshed.

- userId: Quite self-explanatory, the Id of the user.

---

### Database

The API uses [TypeOrm](https://typeorm.io/). This allows the API to use an Orm instead of raw SQL, with the added bonus
of being able to handle different databases if we wish so. Currently it is being developed against PostgreSQL using
docker for the db instance and [Neon](https://neon.tech) for an on-cloud database instance - which will be utilized by
our CI pipeline.

A few things about TypeOrm

- when new entities are added or current are edited a migration file needs to be created. Thankfully TypeOrm provide us
  with that functionality and by using custom npm commands it is as easy as `npm run typeorm:generate-migration`

- the migration file then needs to be applied to the target db instance, again using our custom made commands. It should
  be noted that during the migration **generation** it compares the code entity representation with the status of the
  target db. This is called code-first database design.

#### Logging SQL Statements

The application uses the [DatabaseLogger](../core/src/lib/database_logger.ts) in order to log different SQL related
info. Some are less critical than others and in order to avoid logging highly sensitive data without actual need, the
logger distinguishes different use-cases such as `logQueryError` versus `logQuery`.

The application configuration has a value `logSQL` which is true will log every query. This comes by default as true,
but it is advised to disable it for production environments due to security concerns.

---

### Commands

Running specific code outside of the running app can be done using commands. More or less like a cli but executing any
code within your code-base. For example see Database Seeding

---

### Database-seed

There are some domains that require an initialization of the database with data. The Default User Roles is one of them.

In order to do so we created a command that will run any service function as part of the seeding process. To execute use
`npm run cli seed` which executes the command seed found under `seeder.command.ts`

---

### Encryption

If we wish to encrypt specific data before storing them or any other reason, the encryption service is there for us.
With two simple methods `encrypt` and `decrypt` we can safely handle our data as long as we load the same key pair via
our config.

---

### 🔗 Links

| Function         | ENV   | URL                               |
| :--------------- | :---- | :-------------------------------- |
| Base URL         | Local | http://localhost:3000/            |
| API HealthCheck  | Local | http://localhost:8000/v1/health   |
| API HealthCheck  | Local | http://localhost:8000/v1/health/q |
| API Swagger UI   | Local | http://localhost:8000/api         |
| API Swagger JSON | Local | http://localhost:8000/api-json    |

<br/>
