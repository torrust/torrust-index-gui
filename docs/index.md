# Documentation

- [User guide](#user-guide)
  - [Upload a torrent](#upload-a-torrent)
- [Development](#development)
  - [Run the tracker](#run-the-tracker)
  - [Run the backend](#run-the-backend)
  - [Run the frontend](#run-the-frontend)
  - [Testing](#testing)

## User guide

### Roles

There are only three roles:

- Guest: unauthenticated user.
- User: authenticated user.
- Admin: authenticated user with admin privileges.

> **NOTICE**: there is only one "admin" and it's the account of the first registered user.

### Upload a torrent

The torrent description supports markdown syntax. You can use it to add links, images, etc.

> **NOTICE** Only PNG images are supported at the moment.

You can add a PNG image with:

```text
![alternative description for the image](https://raw.githubusercontent.com/torrust/torrust-index-frontend//develop/docs/media/torrust_logo.png)
```

The image will be proxied by the backend. This means that the image will be downloaded by the backend and served by the backend itself. The backend will cache the image but
you have to make sure that the image is available at the URL you provided.

### Categories

Torrents can have only one category. You have to assign a category to your torrent when you upload it.

If the "admin" deletes the category sued by a torrent, the torrent category will be set to `null`.

### Tags

Torrents can have multiple tags. You can assign tags to your torrent when you upload it. Tags are created by the "admin" and users can only choose from the existing tags.

If the "admin" deletes a tag, the tag will be removed from all the torrents that use it.

## Development

This is a guide to run the Torrust Index in development mode. It is not intended to be used in production.
It runs all the services locally, so you can modify the code and see the changes immediately.
You will need to run these three services:

- Torrust Tracker
- Torrust Index Backend
- Torrust Index Frontend

Before installing and running the services you can create a new directory to clone the repositories from GitHub.

```s
cd /tmp
mkdir torrust-index
cd torrust-index/
```

After installing all the repos you will have the following directory structure.

```s
$ tree -L 2
.
├── torrust-index
│   ├── adrs
│   ├── bin
│   ├── build.rs
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── CODEOWNERS
│   ├── compose.yaml
│   ├── config-idx-back.local.toml
│   ├── config.local.toml
│   ├── config.toml
│   ├── config-tracker.local.toml
│   ├── COPYRIGHT
│   ├── cspell.json
│   ├── data.db
│   ├── docker
│   ├── Dockerfile
│   ├── docs
│   ├── img
│   ├── LICENSE-AGPL_3_0
│   ├── LICENSE-MIT_0
│   ├── licensing
│   ├── migrations
│   ├── project-words.txt
│   ├── README.md
│   ├── rustfmt.toml
│   ├── src
│   ├── storage
│   ├── target
│   ├── templates
│   ├── tests
│   └── upgrades
├── torrust-index-frontend
│   ├── app.vue
│   ├── assets
│   ├── components
│   ├── composables
│   ├── COPYRIGHT
│   ├── img
│   ├── LICENSE-AGPL_3_0
│   ├── LICENSE-MIT_0
│   ├── licensing
│   ├── node_modules
│   ├── nuxt.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── pages
│   ├── plugins
│   ├── postcss.config.js
│   ├── public
│   ├── README.md
│   ├── tailwind.config.js
│   └── tsconfig.json
└── torrust-tracker
    ├── bin
    ├── Cargo.lock
    ├── Cargo.toml
    ├── compose.yaml
    ├── config.toml
    ├── config.toml.local
    ├── cSpell.json
    ├── docker
    ├── Dockerfile
    ├── docs
    ├── LICENSE
    ├── NOTICE
    ├── packages
    ├── README.md
    ├── rustfmt.toml
    ├── SECURITY.md
    ├── src
    ├── storage
    ├── target
    └── tests

34 directories, 41 files
```

You can also run the frontend using the docker images for the Tracker and Index Backend.
Please refer to their respective documentation for more information.

### Run the tracker

For the requirements please refer to the [Tracker documentation](https://github.com/torrust/torrust-tracker).

```s
git clone git@github.com:torrust/torrust-tracker.git
cd torrust-tracker
mkdir -p ./storage/database
./bin/install.sh
cargo run
```

```s
Loading configuration from config file ./config.toml
2023-06-21T14:55:03.270026920+01:00 [torrust_tracker::bootstrap::logging][INFO] logging initialized.
2023-06-21T14:55:03.274190246+01:00 [torrust_tracker::bootstrap::jobs::tracker_apis][INFO] Starting Torrust APIs server on: http://127.0.0.1:1212
2023-06-21T14:55:03.274292005+01:00 [torrust_tracker::bootstrap::jobs::tracker_apis][INFO] Torrust APIs server started
```

Please refer to the [Tracker documentation](https://github.com/torrust/torrust-tracker) for more information.

### Run the backend

For the requirements please refer to the [Index documentation](https://github.com/torrust/torrust-index).

```s
git clone git@github.com:torrust/torrust-index.git
cd torrust-index/
./contrib/dev-tools/init/install-local.sh
TORRUST_INDEX_API_CORS_PERMISSIVE=true cargo run
```

By default, the backend has the most restrictive CORS policy. This means that the frontend cannot access the backend API, because they are running on different ports. If you run the backend as it is, you will see the following error in the browser console.

```s
Access to fetch at 'http://localhost:3001/v1/torrents?page_size=50&page=0&sort=UploadedDesc&categories=&tags=' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

You need to enable the Cors layer with the permissive option setting the environment variable `TORRUST_INDEX_API_CORS_PERMISSIVE` to `true`.

Please refer to the [Index documentation](https://github.com/torrust/torrust-index) for more information.

### Run the frontend

Requirements:

- Node: `^19.0.0`

```s
git clone git@github.com:torrust/torrust-index-frontend.git
cd torrust-index-frontend/
./bin/install.sh
npm run dev
```

**NOTICE** Make sure the `.env` file is present in the root directory of the frontend. And contains the API URL.

```s
API_BASE_URL=http://localhost:3001/v1
```

After running `npm run dev` you should see something like this in the console.

```s
Nuxi 3.0.0
Nuxt 3.0.0 with Nitro 1.0.0
  > Local:    http://localhost:3000/ 
  > Network:  http://192.168.1.88:3000/

ℹ Using Tailwind CSS from ~/assets/css/tailwind.css
ℹ Tailwind Viewer: http://localhost:3000/_tailwind/
🌼 daisyUI components 2.51.5  https://daisyui.com
✔︎ Including:  base, components, 2 themes, utilities
❤︎ Support daisyUI:  https://opencollective.com/daisyui
```

You can also see this warning in the console.

```s
WARN  Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
```

You only need to follow the instructions and run `npx update-browserslist-db@latest`.

If you want to run the frontend like int production you can run the following command.

```s
npm run build && npm run preview
```

More information about the [nuxt]https://nuxt.com/) command can be found [here](https://nuxt.com/docs/api/commands/add).

### Testing

#### Unit tests

We do not have nay unit tests yet. You can contribute by:

- [Setting up the scaffolding for unit testing](https://github.com/torrust/torrust-index-frontend/issues/164).
- Adding unit tests.

You can take a look at issues tagged with [testing](https://github.com/torrust/torrust-index-frontend/issues?q=is%3Aissue+is%3Aopen+label%3Atesting).

#### E2E tests

For now we only have E2E tests. We are starting to write E2E tests for the frontend. The [Index Backend API](https://github.com/torrust/torrust-index/tree/develop/tests/e2e) has some tests, so part of the functionality is tested.

You can contribute adding more E2E tests. We are using this [issue](https://github.com/torrust/torrust-index-frontend/issues/148) to track the tests we want to add.

In order to run the E2E test you need to have a running application at <http://localhost:3000>. There two important variables hardcoded in Cypress configuration file `cypress.config.ts`:

- The base URL: `http://localhost:3000` for the E2E testing environment.
- The database file path: `./storage/database/torrust_index_backend_e2e_testing.db` for the E2E testing environment.

Those variables describe hot to access the system under test.

> **IMPORTANT** The database file path is relative to the root directory of the frontend. We should try to avoid this kind of dependencies. But for now, it is the easiest way to run the E2E tests. Ideally we should be able to run the test suit against any environment. For example, we should be able to run the test suit against an staging environment. That's still possible if we are running the tests from a machine that has access to the filesystem environment or we could start running the test using MySQL SQLite.

The Cypress configuration file looks like this:

```TypeScript
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents (on, config) {
      on("task", {
        grantAdminRole: ({ username }) => {
          return grantAdminRole(username, databaseConfig(config));
        }
      });
    }
  },
  env: {
    db_file_path: "./storage/database/torrust_index_backend_e2e_testing.db"
  }
});
```

The database file path (`db_file_path`) is needed because some tests need to access the database directly. For example, the test that grants the admin role to a user. There is no way to create administrator users using the frontend. So, we need to do it directly in the database.

You can run the E2E test environments in two different ways:

- Using docker compose.
- Running the tracker, backend and the frontend locally (development environment).

If you want to use the docker-compose environment you need to run the following command:

```s
./contrib/dev-tools/container/e2e/sqlite/run-e2e-tests.sh
```

This is the way we run the E2E tests in the CI/CD pipeline.

You should use the development environment if you want to debug the E2E tests or you are writing tests and code at the same time.

**NOTICE** You will need to change the database file path in the backend to use the same as in the frontend so the running backend and the Cypress tests can access the same database. For example, change the database `connect_url` value in the backend config file to `"sqlite://../torrust-index-frontend/storage/database/torrust_index_backend_e2e_testing.db?mode=rwc"` or whatever the path is in your machine.

Once the E2E environment is up, you can run the E2E tests with the following command.

```s
npm run cypress:run
```

With that command you will use the headless browser. If you want to see the browser while the tests are running you can run the following command:

```s
npm run cypress:open
```

Please refer to the [Cypress documentation](https://docs.cypress.io/) for more information.

If you want to contribute please read the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices) documentation.
