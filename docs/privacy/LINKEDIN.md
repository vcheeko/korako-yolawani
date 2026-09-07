# Korako Yolawani — LinkedIn Integration Privacy Notice

**Status:** Public prototype privacy notice

## Scope

This notice covers the LinkedIn sign-in integration used by Korako Yolawani during its prototype and evidence-building stage.

## Data requested from LinkedIn

The initial integration requests only OpenID Connect permissions: `openid`, `profile`, and `email`.

Depending on what LinkedIn returns, this may include a LinkedIn subject identifier, name, profile image, locale, email address, and email-verification status.

The initial integration does not request permission to publish LinkedIn posts and does not claim permission to edit a LinkedIn member profile.

## Purpose

The data is used only to confirm that the account owner successfully connected LinkedIn to the Korako Yolawani prototype and to test a read-only identity canary.

## Storage and sharing

For the first read-only canary, the LinkedIn access token is used only to retrieve `/v2/userinfo` and is not intentionally persisted by the canary flow.

Korako Yolawani does not sell LinkedIn member data. The prototype does not use LinkedIn member data for advertising or unrelated profiling.

Data is not intentionally shared with unrelated third parties. Infrastructure providers may process technical request data as required to operate the service.

## Security

Client secrets and access tokens must not be committed to source control, included in URLs, or exposed in status responses. OAuth state is used to protect the authorization flow from cross-site request forgery.

## User control

A LinkedIn member can deny the authorization request or revoke previously granted application access through LinkedIn account settings.

## Contact

Public contact: GitHub `@vcheeko` — https://github.com/vcheeko

## Changes

This notice may be updated as the integration changes. Any broader LinkedIn permissions, posting capability, or persistent token storage must be disclosed before activation.
