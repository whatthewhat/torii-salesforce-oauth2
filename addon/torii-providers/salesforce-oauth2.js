import OAuth2Bearer from 'torii/providers/oauth2-code';
import { configurable } from 'torii/configuration';

export default OAuth2Bearer.extend({
  name: 'salesforce-oauth2',
  baseUrl: 'https://login.salesforce.com/services/oauth2/authorize',

  // additional params that this provider requires
  optionalUrlParams: [
    'scope',
    'display',
    'code_challenge',
    'immediate',
    'login_hint',
    'nonce',
    'prompt'
  ],

  responseParams: ['code', 'state'],

  scope: configurable('scope', 'api'),
  display: configurable('display', ''),
  codeChallenge: configurable('codeChallenge', ''),
  immediate: configurable('immediate', ''),
  loginHint: configurable('loginHint', ''),
  nonce: configurable('nonce', ''),
  prompt: configurable('prompt', ''),

  redirectUri: configurable('redirectUri', function() {
    return this._super();
  })
});
