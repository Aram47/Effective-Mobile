# Appeal Service

## Technologies

- **Node.js (with Express)** — server-side framework
- **TypeScript** — for typed JavaScript
- **MongoDB** — database for storing appeals
- **Docker** — for containerization and simplified deployment

## Installation

### Requirements

- Node.js and npm installed. If not, download and install them from the [official website](https://nodejs.org/).
- Docker and Docker Compose installed. If not, follow the [installation instructions](https://docs.docker.com/get-docker/).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Aram47/Effective-Mobile.git
  
- or with SSH

   ```bash
   git clone git@github.com:Aram47/Effective-Mobile.git
  
2. Navigate to the project directory:

   ```bash
   cd Effective-Mobile

3. Navigate to the service directory:

   ```bash
   cd appeal-service

4. Install dependencies:

   ```bash
   npm i

5. Set up environment variables:
  - Create a .env.prod file based on .env.example and specify MongoDB settings (e.g., DATABASE_URL=mongodb://mongo:27017/appeal_db).

### Running the Service

1. In the appeal-service directory, compile TypeScript to JavaScript to generate the dist folder:

   ```bash
   npm run build

2. Return to the root project directory:

   ```bash
   cd ..

3. Start the service using Docker Compose:

   ```bash
   docker-compose up

- The service will be available at http://localhost:3000 (or another port specified in .env.prod).

## Usage

### API Endpoints

The service provides a REST API for managing appeals. All endpoints are located at the base path `/appeal`.

| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| POST   | `/appeal/`                | Create a new appeal              |
| PATCH  | `/appeal/:id/start`       | Start processing an appeal       |
| PATCH  | `/appeal/:id/complete`    | Complete processing an appeal    |
| PATCH  | `/appeal/:id/cancel`      | Cancel an appeal                 |
| GET    | `/appeal/`                | Retrieve a list of all appeals   |
| DELETE | `/appeal/cancel-in-progress` | Cancel all in-progress appeals |

### Example Requests

1. Create an appeal:

   ```bash
   curl -X POST http://localhost:3000/appeal/ -H "Content-Type: application/json" -d '{"subject": "some subject", "description": "Issue description"}'

2. Start processing:

   ```bash
   curl -X PATCH http://localhost:3000/appeal/id=123/start

3.  Retrieve list of appeals:

    ```bash
    curl -X GET http://localhost:3000/appeal/

