# Setup

## MongoDB

Connect a MongoDB database and add the following parameters to the .env file:
| .env | MongoDB Parameter |
|---------------- |------------------------------------------------- |
| MONGO_USER | [USERNAME WITH FULL READ/WRITE ACCESS TO MONGO] |
| MONGO_PASSWORD | [USER PASSWORD] |
| LTI_KEY | [RANDOM LTI KEY] |

## Brightspace

### Add application as an LTI Advantage Tool

1. Go to 'Manage Extensibility' in the Brightspace admin menu
2. Click on the 'LTI Advantage Tab' and click on 'Register Tool' to add a new integration
3. Fill in the required parameters using the following table as reference:
   | Field | Content |
   |--------------------------|-------------------------------------------------------------------------------------------------------------|
   | Name | [TOOL NAME] |
   | Domain | https://toolurl.com |
   | Redirect URLs | https://toolurl.com/login<br>https://toolurl.com/members<br>https://toolurl.com/keys<br>https://toolurl.com |
   | OpenID Connect Login URL | https://toolurl.com/login |
   | Keyset URL | https://toolurl.com/keys |
4. Check all exensions necessary for the integration. For most integrations, the 'Names and Role Provisioning Services' will likely be necessary
5. Check the 'Send Institution Role' checkbox
6. Click save and take note of the Brightspace Registration Details

Create a .env file in the lti-launch microservice with the following parameters mapped to against the Brightspace Registration Details field:

| .env Parameter          | Brightspace Registration Details Field                              |
| ----------------------- | ------------------------------------------------------------------- |
| PLATFORM_URL            | Brightspace instance url (e.g. https://SCHOOL_NAME.brightspace.com) |
| PLATFORM_NAME           | Brightspace                                                         |
| CLIENT_ID               | Client Id                                                           |
| AUTHENTICATION_ENDPOINT | OpenID Connect Authentication Endpoint                              |
| ACCESS_TOKEN_ENDPOINT   | Brightspace Oauth2 Access Token URL                                 |
| AUTH_KEYSET             | Brightspace Keyset URL                                              |
