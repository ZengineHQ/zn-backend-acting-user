# Backend Acting User

Helper module for getting and validating the acting user. The acting user comes from the access token used when making a request to the backend service.

## Installation

```bash
npm i @zenginehq/backend-acting-user
```

## Usage

```js
const znActingUser = require('@zenginehq/backend-acting-user');
```

### Get Acting User

```js
const user = await znActingUser.getActingUser();
```

### Validate Acting User

```js
const user = await znActingUser.validateActingUser();

if (!user) {
	// No Access Token or User is an Integration User
}
```

### Validate User is a Member of Workspace

```js
const user = await znActingUser.validateActingUserWorkspace(workspaceId);

if (!user) {
	// No Access Token, User is an Integration User, or User is Not a Member of Workspace
}
```

### Validate User is an Admin of Workspace

```js
const user = await znActingUser.validateActingUserWorkspace(workspaceId, true);

if (!user) {
	// No Access Token, User is an Integration User, or User is Not an Admin of Workspace
}
```