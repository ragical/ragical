# Protocol Buffers

The protobuf definitions are found across the following locations.

Only the central API performs calls to the services directly instead of having to use each micro service on its own.

None of the gRPC ports are exposed in production since its meant for internal communication unless you host the project on your own.

## Installation

`npm i @a11ywatch/protos`

### Website

Create a client for managing your website with [website-protobuf](./website.proto) on port `50051`.

### Pagemind

Create a client for accessibility scans with [pagemind-protobuf](./pagemind.proto) on port `50052`.

### Mav

Create a client for image AI recognition calls with [mav-protobuf](./mav.proto) on port `50053`.

### Cdn

Ccdn service backed by S3 [cdn-protobuf](./cdn.proto) on port `50054`.

### Crawler

Create a client for full multi-site crawls with [crawler-protobuf](./crawler.proto) on port `50055`.

### Health

Attach health checks to a service [health-protobuf](./health.proto).
