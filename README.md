# nest-react-heroku boilerplate
Full stack TypeScript web application, deploys to Heroku out of the box. Use it to serve a static angular website, or add a database and API. Up to you!

### [Nest](https://nestjs.com/)
Is a TypeScript Node framework based on Express. Well documented and uses the latest syntax.

### [Angular](https://angular.io/)
Well... you probably know what Angular is already.

## Quick start:
1. ```git clone https://github.com/nathan-folsom/nest-angular-heroku.git```
1. ```cd nest-angular-heroku```
1. ```heroku login```
1. ```heroku create <name(optional)>```
1. ```git push heroku master```
1. ```heroku open```

## Development:
### Backend
1. ```cd server```
1. ```npm install``` (first time only)
1. ```npm run start:dev```

### Frontend
1. ```cd web-ui```
1. ```npm install``` (first time only)
1. ```npm start```