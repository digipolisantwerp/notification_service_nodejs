# Notification Widget UI BFF (NodeJS)

This is a Node.js backend service library to create a BFF service for the Notification Widget. The widget provides a notification. This service is matched by a [corresponding UI](https://github.com/digitalrmdy/notification_widget_angular).

There is a **demo service**, see below for instructions on running it.

## How to use

### Installing


Then install (you will need to be on the digipolis network):

```sh
> npm install @acpaas-ui-widgets/nodejs-notification-widget
```

### Using

Express example:

```js
const express = require('express');
const app = express()
const router = express.Router();
...
require('@acpaas-ui-widgets/nodejs-notification-widget/src/notification')(router, '/api/v1/notifications')
app.use('', router);
...
app.listen(3000);
```



## Run the demo app

Create a .env file containing:

```sh
PORT=3002
API_KEY=<client id>
MPROFILE_API_PROD='https://api-gw-a.antwerpen.be/astad/mprofiel/v1'
NOTIFICATON_API='https://api-gw-a.antwerpen.be/acpaas/in-app-notification/v2/'
JWT_ENCRYPTION_VALIDATE=<same as main application>
JWT_ENCRYPTION_SECRET=<same as main application>
```

(Remove the -o extension in the URL's to use the production api.)

Run the service:

```sh
> npm install
> npm start
```

Test by using the postman collection to call the api

Run the test suite:
```sh
> npm run test
```
(Coverage file generated in the coverage folder)

## Service Specification

The service implements the following protocol:

//TODO

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## License

This project is published under the [MIT license](LICENSE.md).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.10.
