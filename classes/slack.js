const { WebClient } = require('@slack/web-api');

class SlackMessage {
    // toggle services
    _Slack;

    // Slack specific variables
    _slackToken;
    _channelId;

    // INFO: Constructor
    constructor() {
        // Toggle services (default: false)
        this._Slack = false;
    }

    // INFO: Private check functions
    /**
     * @brief Check if the variables are set
     * @return {void}
     */
    _checkVariablesSlack() {
        // Check if Slack variables are set
        if (this._Slack) {
            if (!this._slackToken)
                throw new Error('The Slack Webhook URL is not set');
            if (!this._channelId)
                throw new Error('The Slack Channel ID is not set');
        }
    }

    // INFO: Private send functions
    /**
     * @brief Send the message to the Slack service
     * @return {void}
     */
    async _sendSlack(title, content) {
        try {
            if (!this._Slack)
                return;
            await this._checkVariablesSlack();

            const web = new WebClient(this._slackToken);

            await web.chat.postMessage({
                text: `${title}\n\n${content}`,
                channel: this._channelId
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    // INFO: Toggle services
    /**
     * @brief Toggle the Slack service
     * @param {boolean} use
     * @return {void}
     */
    setSlackUse(use) {
        this._Slack = use;
    }

    // INFO: Slack variables
    /**
     * @brief Set the Slack Token
     *
     * @param {string} token - The Slack Token
     * @return {void}
     */
    setSlackToken(token) {
        if (typeof token !== 'string')
            throw new Error('The Slack Token must be a string');
        this._slackToken = token;
    }

    /**
     * @brief Set the Slack Channel ID
     *
     * @param {string} channelId - The Slack Channel ID
     * @return {void}
     */
    setSlackChannelId(channelId) {
        if (typeof channelId !== 'string')
            throw new Error('The Slack Channel ID must be a string');
        this._channelId = channelId;
    }


    // INFO: Set all variables at once with an object
    /**
     * @brief Set all variables at once with an object
     * @param {object} variables - The variables object
     * @param {boolean} variables.use - The toggle for the Slack service
     * @param {string} variables.token - The Slack Token
     * @param {string} variables.channelId - The Slack Channel ID
     * @return {void}
     */
    setSlackVariables(variables) {
        const {
            use,
            token,
            channelId
        } = variables;

        if (use !== undefined)
            this.setSlackUse(use);
        if (token !== undefined)
            this.setSlackToken(token);
        if (channelId !== undefined)
            this.setSlackChannelId(channelId);
    }
}

module.exports = SlackMessage;
