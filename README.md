# Node.js recruitment task

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the services

## Running the app

1. Clone this repository
2. Run from root dir

```bash
$ OMDB_API_KEY=your_api_key docker-compose up
```

## Test

### Unit tests
```bash
$ TEST=unit docker-compose -f docker-compose.test.yml -p nodejs-recruitment-task-test up
```

### E2E tests
```bash
$ TEST=e2e OMDB_API_KEY=your_api_key docker-compose -f docker-compose.test.yml -p nodejs-recruitment-task-test up
```

### Continuous Integration
```bash
$ TEST=unit docker-compose -f docker-compose.test.yml -f docker-compose.ci.yml up
$ TEST=e2e OMDB_API_KEY=your_api_key docker-compose -f docker-compose.test.yml -f docker-compose.ci.yml up
```

## Documentation

Documentation was created using Postman. Files to be imported can be found in the **docs** folder.

## Architecture

![Alt text](docs/images/system-architecture.png?raw=true "System architecture")
