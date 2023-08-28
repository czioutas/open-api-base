# Technical Details 
Even though some of the info here span across the repo, such as the Version system. We detail it inside this Technical README within the main src folder.

### Table of Contents
- [Versioning](#versioning)
- [Git Specifics](#git)
- [Editor](#editor)

### Versioning

We release using GitVersion (https://github.com/GitTools/GitVersion) https://gitversion.net/docs/reference/intro-to-semver

- we push from PR & Master
- we use Mainline mode https://gitversion.net/docs/reference/versioning-modes/mainline-development
- and lastly we increment versions based on commits:

```
major-version-bump-message: '\+semver:\s?(breaking|major)'
minor-version-bump-message: '\+semver:\s?(feature|minor)'
patch-version-bump-message: '\+semver:\s?(fix|patch)'
```

For example, a commit message for a feature should look like this `+semver: feature ` following the description of the changes.

Refer to the [GitVersion.yml](../GitVersion.yml) file for changes.

### Git

In order to maintain consistency across any usage of the repo there are a few Git related changes. 

- Using the [.gitattributes](../.gitattributes) file we make sure the ending of all files when being committed are that of LF regardless of the OS you are working under.

- Using the [.gitignore](../.gitignore) file we make sure that not every file inside the repo when created locally is pushed to the remote repository. For example, test result results generated during local testing.

### Editor

In order to keep a uniform style of the codebase, we employ the use of the [Editorconfig](../.editorconfig) file.

Most code editors/IDE these days support the use of this file.

It is worth mentioning that .editorconfig files work on a hierarchy based on folder levels. Therefore if you wish to have in one folder a different style you are free to add another .editorconfig file.