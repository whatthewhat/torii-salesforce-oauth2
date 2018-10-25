import { getConfiguration, configure } from 'torii/configuration';
import SalesforceOAuth2Provider from 'torii-salesforce-oauth2/torii-providers/salesforce-oauth2';
import QUnit from 'qunit';
import { run } from '@ember/runloop';

let { module, test } = QUnit;
let provider;
let originalConfiguration;

module('Unit - SalesforceOAuth2Provider', function(hooks) {
  hooks.before(function() {
    originalConfiguration = getConfiguration();
    configure({
      providers: {
        'salesforce-oauth2': {}
      }
    });
    provider = SalesforceOAuth2Provider.create();
  });

  hooks.after(function() {
    run(provider, 'destroy');
    configure(originalConfiguration);
  });

  test("Provider requires a apiKey", function(assert) {
    assert.throws(
      function() { provider.buildUrl(); },
      /Expected configuration value apiKey to be defined.*salesforce-oauth2/
    );
  });

  test("Provider generates a correct URL", function(assert){
    configure({
      providers: {
        'salesforce-oauth2': {
          apiKey: 'foo',
          redirectUri: 'https://example.com/salesforce/',
          codeChallenge: 'c2FsZXNmb3JjZQ',
          display: 'page',
          immediate: true,
          loginHint: 'username@company.com',
          nonce: 'bar',
          prompt: 'login',
          state: 'baz',
          scope: 'api'
        }
      }
    });

    const expectedUrl = 'https://login.salesforce.com/services/oauth2/authorize?' +
                        'response_type=code' +
                        '&client_id=foo'+
                        '&redirect_uri=' + encodeURIComponent('https://example.com/salesforce/') +
                        '&state=baz' +
                        '&scope=api' +
                        '&display=page' +
                        '&code_challenge=c2FsZXNmb3JjZQ' +
                        '&immediate=true' +
                        '&login_hint=' + encodeURIComponent('username@company.com') +
                        '&nonce=bar' +
                        '&prompt=login';

    assert.equal(
      provider.buildUrl(),
      expectedUrl,
      'generates the correct URL'
    );
  });
});
