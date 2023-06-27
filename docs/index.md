# Documentation

- [User guide](#user-guide)
  - [Upload a torrent](#upload-a-torrent)
- [Development](#development)
  - [Run the tracker](#run-the-tracker)
  - [Run the backend](#run-the-backend)
  - [Run the frontend](#run-the-frontend)  

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
├── torrust-index-backend
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

For the requirements please refer to the [Tracker documentation](https://github.com/torrust/torrust-index-backend).

```s
git clone git@github.com:torrust/torrust-index-backend.git
cd torrust-index-backend/
./bin/install.sh
TORRUST_IDX_BACK_CORS_PERMISSIVE=true cargo run
```

By default, the backend has the most restrictive CORS policy. This means that the frontend cannot access the backend API, because they are running on different ports. If you run the backend as it is, you will see the following error in the browser console.

```s
Access to fetch at 'http://localhost:3000/v1/torrents?page_size=50&page=0&sort=UploadedDesc&categories=&tags=' from origin 'http://localhost:3001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

You need to enable the Cors layer with the permissive option setting the environment variable `TORRUST_IDX_BACK_CORS_PERMISSIVE` to `true`.

Please refer to the [Index Backend documentation](https://github.com/torrust/torrust-index-backend) for more information.

### Run the frontend

Requirements:

- Node: `^19.0.0`

```s
git clone git@github.com:torrust/torrust-index-frontend.git
cd torrust-index-frontend/
./bin/install.sh
npm run dev
```

After running `npm run dev` you should see something like this in the console.

```s
Nuxi 3.0.0
Nuxt 3.0.0 with Nitro 1.0.0
  > Local:    http://localhost:3001/ 
  > Network:  http://192.168.1.88:3001/

ℹ Using Tailwind CSS from ~/assets/css/tailwind.css
ℹ Tailwind Viewer: http://localhost:3001/_tailwind/
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
