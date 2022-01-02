<div id="top"></div>

<br />
<div align="center">
  <h1 align="center">ODMS REST API</h1>
  <p align="center">
    <a href="https://github.com/othneildrew/Best-README-Template">Explore the docs &Rightarrow;</a>
  </p>
</div>

## About the project

OMDS REST API - it's Node.js application which is created to model a communication with a simple web server and open data management system's database prototype and perfom basic CRUD operatins.

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
3. Create a local instance of the database by executing `Model.sql` SQL script which is in `src/sql` directory.

4. Create `.env` file in the `src/js` directory and fill it with your own configuration data as follows:

   ```sh
   MYSQL_HOST=MYSQL_HOST
   MYSQL_PORT=MYSQL_PORT
   MYSQL_USER=MYSQL_USER
   MYSQL_PASS=MYSQL_PASS
   MYSQL_DB=omds
   FASTIFY_PORT=FASTIFY_PORT

   ```

5. Start the application:

   ```sh
   npm start
   ```

6. Run the tests:
   ```sh
   npm test
   ```
