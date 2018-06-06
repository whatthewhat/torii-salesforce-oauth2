# torii-salesforce-oauth2

[![Build Status](https://travis-ci.org/whatthewhat/torii-salesforce-oauth2.svg?branch=master)](https://travis-ci.org/whatthewhat/torii-salesforce-oauth2)

This addon allows your Ember.js app to authenticate with Salesforce using [Torii](https://github.com/Vestorly/torii).

## Usage

To install the addon run:

```bash
ember install torii-salesforce-oauth2
```

After that add the appropriate configurations to your `config/environment.js`:

```js
// config/environment.js
/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    /* ... */
    torii: {
      providers: {
        /* ... */
        'salesforce-oauth2': {
          apiKey: 'your_client_id',
          redirectUri: 'http://localhost:4200',
          scope: 'api refresh_token'
        }
      }
    }
  };
  /* ... */
  return ENV;
};
```

See [Torii](https://github.com/Vestorly/torii) and [Salesforce](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_web_server_oauth_flow.htm) docs for more.


### URL decoding the authorization code (torii < 0.9.5)

The authorization code that is returned by Salesforce is URL encoded and needs to be decoded before using it to obtain an access token if your torii version is lower than 0.9.5:

```js
this.get('torii').open('salesforce-oauth2').then(
  (authorization) => {
    const authCode = decodeURIComponent(authorization.authorizationCode);
    // ...
  }
);
```

Since 0.9.5 this is handled in torii, see https://github.com/Vestorly/torii/pull/376.

## Contributing

### Setup

* `git clone` this repository
* `cd torii-salesforce-oauth2`
* `npm install`
* `bower install`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
