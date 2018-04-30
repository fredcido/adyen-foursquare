# Adyen Venue recommendation

This project was developed using [Angular 5](https://angular.io/) and all of its latest dependencies. In order to get it running, you need the following packages installed globally:
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [Angular CLI](https://github.com/angular/angular-cli)

The project might request Oauth2 access to your Foursquare profile in order to manage your tasks. The applicaton is also hosted at http://adyen.fredericoestrela.com.

## Installing packages

After cloning the repository, run `npm install` inside the directory to install all of its dependencies.

## Development server

Run `ng serve --proxy-config proxy.conf.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. We need to set the proxy configuration since we are performing cross-domain requests and we have some CORS limitations.

## API Keys

Currently there are API keys being used for test purposes, you can change both Foursquare and Google Maps API keys at `src/environments.ts`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
