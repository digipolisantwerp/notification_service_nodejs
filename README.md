![Node.js CI](https://github.com/digitalrmdy/notification_service_nodejs/workflows/Node.js%20CI/badge.svg?branch=master)

# Notification Widget UI BFF (NodeJS)

This is a Node.js backend service library to create a BFF service for the Notification Widget. The widget provides a notification. This service is matched by a [corresponding UI](https://github.com/digitalrmdy/notification_widget_angular).

There is a **demo service**, see below for instructions on running it.

## How to use

### Installing


Then install (you will need to be on the digipolis network):

```sh
> npm install @acpaas-ui-widgets/nodejs-notification
```

### Using in Express
#### By loading the router


```js
const express = require('express');
const app = express()
const router = express.Router();

/**
 * Import the notification module
 */
const notificationModule = require('@acpaas-ui-widgets/nodejs-notification-widget/src/notification');

/**
 * Create the notification router.
 * Get an API key from de API Store
 */
const notificationRouter = notificationModule.notificationRouter({
  API_KEY: process.env.API_KEY,
  NOTIFICATION_API: process.env.NOTIFICATION_API,
});

/**
 * Use the router
 */
router.use('/api/v1/notifications', notificationRouter);



app.use('', router);

app.listen(3000);
```


#### By loading the controller

```js
const express = require('express');
const app = express()
const router = express.Router();

/**
 * Import the notification module
 */
const notificationModule = require('@acpaas-ui-widgets/nodejs-notification-widget/src/notification');

/**
 * Create the notification controller.
 * Get an API key from de API Store
 */
const notificationController = notificationModule.notificationController({API_KEY:process.env.API_KEY, NOTIFICATION_API: process.env.NOTIFICATION_API});

/**
 * Add the GET requests
 */
router.get(`/`, notificationController.getAllInAppMessages);
router.get(`/overview`, notificationController.getAllInAppMessagesUnreadCount);

/**
 * Add the PATCH requests
 */
router.patch(`/:messageId`, notificationController.setInAppMessageStatus);


/**
 * Add the Delete requests
 */
router.delete(`/:messageId`, notificationController.deleteInAppMessage);




app.use('', router);

app.listen(3000);
```



## Run the demo app

Create a .env file containing:

```sh
PORT=3002
API_KEY=<client id>
NOTIFICATON_API='https://api-gw-a.antwerpen.be/acpaas/in-app-notification/v2/'
```

(Remove the -a extension in the URL's to use the production api.)

Run the service:

```sh
> npm install
> npm start
```



Run the test suite:
```sh
> npm run test
```
(Coverage file generated in the coverage folder)

## Service Specification

Specifications described in the [postman collection](Notification%20Widget%20NodeJS.postman_collection.json).
Use the collection to call the demo api.

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## Support

Joeri Sebrechts (<joeri.sebrechts@digipolis.be>)

## License

This project is published under the [MIT license](LICENSE.md).
