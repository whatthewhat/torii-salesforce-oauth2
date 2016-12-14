# torii-salesforce-oauth2

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


### URL decoding the authorization code

At the moment the authorization code that is returned by Salesforce is URL encoded and needs to be decoded before using it to obtain an access token:

```js
this.get('torii').open('salesforce-oauth2').then(
  (authorization) => {
    const authCode = decodeURIComponent(authorization.authorizationCode);
    // ...
  }
);
```

In the future this will likely be handled in the provider, see https://github.com/Vestorly/torii/issues/323 for more details.

## Contributing

### Setup

* `git clone` this repository
* `cd torii-salesforce-oauth2`
* `npm install`
* `bower install`

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`
