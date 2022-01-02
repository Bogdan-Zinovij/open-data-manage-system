<p align="center">
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/KhrapkoVasyl/open-data-manage-system?style=for-the-badge"></a>
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/KhrapkoVasyl/open-data-manage-system?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/KhrapkoVasyl/open-data-manage-system?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system/blob/master/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/KhrapkoVasyl/open-data-manage-system?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system">
        <img alt="GitHub license" src="https://img.shields.io/github/contributors/KhrapkoVasyl/open-data-manage-system.svg?style=for-the-badge">
    </a>

</p>

<div align="center">
  <h1 align="center">ODMS REST API</h1>
  <p align="center">
    <a href="https://github.com/KhrapkoVasyl/open-data-manage-system/blob/master/README.md">Explore the docs &Rightarrow;</a>
  </p>
</div>

## About the project

OMDS REST API - it's Node.js application which is created to model a communication with a simple web server and open data management system's database prototype and to perfom basic CRUD operations.

### Built with

- Runtime environment: [Node.js](https://nodejs.org/)
- Web framework: [Fastify](https://www.fastify.io/)
- ORM: [Sequelize](https://sequelize.org/)
- Database: [MySQL](https://www.mysql.com/)
- Testing framework: [JEST](https://jestjs.io/)

## Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/KhrapkoVasyl/open-data-manage-system.git
   ```
2. Open `src/js` directory and install NPM packages:
   ```sh
   npm install
   ```
3. Got to `src/js` directory.

4. Create a local instance of the database by executing `Model.sql` SQL script which is in `src/sql` directory.

5. Create `.env` file and fill it with your own configuration data as follows:

   ```sh
   MYSQL_HOST=MYSQL_HOST
   MYSQL_PORT=MYSQL_PORT
   MYSQL_USER=MYSQL_USER
   MYSQL_PASS=MYSQL_PASS
   MYSQL_DB=omds
   FASTIFY_PORT=FASTIFY_PORT

   ```

6. Start the application:

   ```sh
   npm start
   ```

7. Run the tests:
   ```sh
   npm test
   ```

## Usage

All of the requests should be executed on `http://localhost:FASTIFY_PORT/`

### Open endpoints

Open endpoints require no Authentication.

#### Dataset related

Endpoints for viewing and manipulating datasets:

- Create new dataset: `POST /api/v1/dataset/`
- Get all available datasets: `GET /api/v1/dataset/`
- Get dataset by id: `GET /api/v1/dataset/:id/`
- Update dataset by id: `GET /api/v1/dataset/:id/`
- Delete dataset by id: `DELETE /api/v1/dataset/:id/`

#### Category related

Endpoints for viewing and manipulating categories:

- Create new category: `POST /api/v1/category/`
- Get all available categories: `GET /api/v1/category/`
- Get category by id: `GET /api/v1/category/:id/`
- Update category by id: `GET /api/v1/category/:id/`
- Delete category by id: `DELETE /api/v1/category/:id/`

#### Datafile related

Endpoints for viewing and manipulating datafiles:

- Create new datafile: `POST /api/v1/datafile/`
- Get all available datafiles: `GET /api/v1/datafile/`
- Get datafile by id: `GET /api/v1/datafile/:id/`
- Update datafile by id: `GET /api/v1/datafile/:id/`
- Delete datafile by id: `DELETE /api/v1/datafile/:id/`

#### MetadataKey related

Endpoints for viewing and manipulating metadatakeys:

- Create new metadatakey: `POST /api/v1/metadatakey/`
- Get all available metadatakeys: `GET /api/v1/metadatakey/`
- Get metadatakey by id: `GET /api/v1/metadatakey/:id/`
- Update metadatakey by id: `GET /api/v1/metadatakey/:id/`
- Delete metadatakey by id: `DELETE /api/v1/metadatakey/:id/`

## License

Distributed under the MIT License. See [LICENSE.txt](https://github.com/KhrapkoVasyl/open-data-manage-system/blob/master/LICENSE) for more information.

## Contributors

- Vasyl Khrapko - [@vazzz7zzzok](https://t.me/vazzz7zzzok) -
- Artem Matiushenko - [@artemko_m](https://t.me/artemko_m) - artom.matyushenko@gmail.com
- Bogdan Zinovij - [@bzinovoy](https://t.me/bzinovoy)
