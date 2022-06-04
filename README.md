# Torrust Index Frontend

This repository serves as the frontend for the [Torrust Index](https://github.com/torrust/torrust-index) project.

## Documentation
You can read the documentation [here](https://torrust.github.io/torrust-documentation/torrust-web-frontend/about/).

## Installation
1. Install prerequisites:
- [NodeJS/NPM](https://nodejs.org/) - NodeJS & Node Package Manager.

2. Clone the repository:
```bash
git clone https://github.com/torrust/torrust-index-frontend.git
```

3. Set the URL of the backend:
```bash
echo "VITE_API_BASE_URL=https://YOUR_DOMAIN/api" > .env
```

4. Install node modules and build the frontend:
```bash
npm i
npm run build
```

5. Serve the newly generated `dist` folder.

## Contributing
Please report any Torrust Index frontend specific bugs you find to the issue tracker of this repository. Torrust Index backend specific issues can be submitted [here](https://github.com/torrust/torrust-index-backend). Universal issues with the Torrust Index can be submitted [here](https://github.com/torrust/torrust-index). Ideas and feature requests are welcome as well!
