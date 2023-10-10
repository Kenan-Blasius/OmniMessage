# Omni Message npm module

## Get started

### Installation

```bash
npm i omni-message
```

### Usage

```js
const OmniMessage = require('omni-message');

const message = new OmniMessage();
```

### Methods

#### Mail

Set the mail variables all at once

```js
message.setMailVariables({
    use: BOOLEAN,
    to: process.env.MAIL_RECEIVER,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS
});
```

or one by one

```js
message.setMailUse(BOOLEAN);
message.setMailTo(process.env.MAIL_RECEIVER);
message.setMailService(process.env.MAIL_SERVICE);
message.setMailUser(process.env.MAIL_USER);
message.setMailPass(process.env.MAIL_PASS);
```

#### Discord

Set the discord variables all at once

```js
message.setDiscordVariables({
    use: BOOLEAN,
    webhookURL: process.env.DISCORD_TOKEN,
});
```

or one by one

```js
message.setDiscordUse(BOOLEAN);
message.setDiscordWebhookURL(process.env.DISCORD_TOKEN);
```

#### Slack

Set the slack variables all at once

```js
omniMessage.setSlackVariables({
    use: true,
    token: process.env.SLACK_TOKEN,
    channelId: process.env.SLACK_CHANNEL_ID
});
```

or one by one

```js
omniMessage.setSlackUse(true);
omniMessage.setSlackToken(process.env.SLACK_TOKEN);
omniMessage.setSlackChannelId(process.env.SLACK_CHANNEL_ID);
```

## Suported API

- Mail
- Discord
- Slack
