# Technical Details

Even though some of the info here span across the repo, such as the Version system. We detail it inside this Technical
README within the main src folder.

### Table of Contents

- [Application](#application)
- [Versioning](#versioning)
- [Git Specifics](#git)
- [Editor](#editor)
- [Logging](#logging)
- [Swagger](#swagger)
- [Authentication](#authentication)
- [Links](#🔗-links)

---

### Application

The application runs by default on port 3000. Please edit the .env.YOUR-ENV file to change it.

---

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

### 🔗 Links

| Function         | ENV   | URL                            |
| :--------------- | :---- | :----------------------------- |
| Base URL         | Local | http://localhost:3000/         |
| API HealthCheck  | Local | http://localhost:8000/v1       |
| API Swagger UI   | Local | http://localhost:8000/api      |
| API Swagger JSON | Local | http://localhost:8000/api-json |

<br/>
