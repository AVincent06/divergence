# Divergence, a social network

Repository for social network project used as a pretext to upgrade my skills on Angular

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project is fullstack oriented, to make it work properly you will need at least :
- An [Angular CLI: 12.0.3](https://www.npmjs.com/package/@angular/cli/v/12.0.3) server for the frontend.
- A [Node: 14.16.1](https://nodejs.org/fr/download/releases/) server for the backend
- A [MySQL Community Server version: 8.0.24](https://dev.mysql.com/downloads/mysql/) - GPL

### Installing

#### Frontend

From the root of the "frontend" folder that you have cloned on your machine, do :
```
npm install
```
Create your own ``environment.ts`` file from the ``environment.ts.example`` file found at ``.\src\environments\``
```
export const environment = {
  production: false,
  URL_BACKEND: 'yourURLwithPortNumber'
};
```
Then start the frontend server :
```
ng serve -o
```

#### Backend

From the root of the "backend" folder that you have cloned on your machine, do :
```
npm install
```
Create your own ``.env`` file from the ``.env.example`` file ,from the root of the "backend" folder, to set up your environment variables. Follow the template on the right :
```
# App
APP_HOST=yourServerAdressHere
APP_PORT=yourPortNumberHere
APP_FORCE=trueORfalse

# DB
DB_HOST=yourServerAdressHere
DB_NAME=yourDataBaseNameHere
DB_USER=yourUserNameHere
DB_PASSWORD=yourPasswordHere

# Token
TOKEN_KEY=yourSecretKey
TOKEN_DURATION=yourTokenTimeLife

# Admin
ADMIN_FIRSTNAME=yourFirstname
ADMIN_NAME=yourName
ADMIN_EMAIL=yourEmail
ADMIN_PASSWORD=yourPassword

# Frontend
FRONT_HOST=yourFrontendServerAdressHere
FRONT_PORT=yourFrontendPortNumberHere
```
**Please note**: ``ADMIN_PASSWORD`` must be at least 12 characters long, 1 lower case, 1 upper case and 1 number. ``ADMIN_EMAIL`` must be an email with a valid format.

Then start the backend server :
```
node server.js
```

## Built With

* [Angular](https://angular.io/) - The modern web developer's platform
* [Angular Material](https://material.angular.io/) - Material Design components for Angular
* [NodeJS](https://nodejs.org/en/) - a JavaScript runtime
* [Express](https://www.npmjs.com/package/express) - a minimal and flexible Node.js web application framework
* [Sequelize](https://sequelize.org/) - a promise-based Node.js ORM
* [MySQL](https://dev.mysql.com/downloads/mysql/) - a relational database management system

## Versioning

I use [GitHub](https://github.com/) for versioning. For the versions available, see my [repository](https://github.com/AVincent06/VincentAugugliaro_7_20210604). 

## Author

* **Vincent Augugliaro** - *Initial work* - [My GitHub Profile](https://github.com/AVincent06)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](https://github.com/AVincent06/VincentAugugliaro_7_20210604/blob/main/LICENSE.md) file for details

## Acknowledgments

* Thanks to my mentor Guillaume Gasperi for his support.
