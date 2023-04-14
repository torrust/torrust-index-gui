# Torrust Index Frontend Server

A Rust static web server to serve the Torrust Index Frontend.

The purposes of this project are:

- To provide a default embed production-ready static web server so that you do not need any other external dependency to run the "Index Frontend" in production. You only need Rust.
- To provide an easy setup/deployment.
- To create a Rust package for the index frontend to control dependencies between the main three packages: [Tracker](https://github.com/torrust/torrust-tracker), [Index-Backend](https://github.com/torrust/torrust-index-backend) and [Index-Frontend](https://github.com/torrust/torrust-index-frontend). The Tracker and Index-Backend use Rust, and you need to manually check which version you use to be sure they are compatible.

## Installation

```s
./server/bin/build-frontend.sh
./server/bin/build-server.sh
./server/bin/setup-server.sh
```

Then, you have to customize the `config.toml` file to your needs and run the server with:

```s
./target/release/server -w config.toml
```

## Development

```s
cargo build
cargo run -- -w config.toml
```

## Acknowledgments

Thanks to [Jose Quintana](https://github.com/joseluisq) for providing the [rust-static-server](https://github.com/static-web-server/static-web-server)
as a [library](https://github.com/static-web-server/static-web-server/issues/188).
