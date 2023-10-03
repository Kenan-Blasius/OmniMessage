const Discord = require('discord.js');
const mail = require('./mail');

class DiscordMessage extends mail {
    // toggle services
    _discord;

    _webhookClient;
    _webhookURL;

    // INFO: Constructor
    constructor() {
        // Toggle services (default: false)
        this._discord = false;
    }

    // INFO: Private check functions
    /**
     * @brief Check if the variables are set
     * @return {void}
     */
    _checkVariablesDiscord() {
        // Check if discord variables are set
        if (this._discord) {
            if (this._webhookURL === undefined || this._webhookURL === '')
                throw new Error('No webhook set');
        }
    }

    // INFO: Private send functions
    /**
     * @brief Send the message to the discord webhook
     * @return {void}
    */
    async _sendDiscord(title, content) {
       try {
            await this._checkVariablesDiscord();

            this._webhookClient = new Discord.WebhookClient({
                url: this._webhookURL
            });

            const embed = new Discord.EmbedBuilder()
                .setTitle(title)
                .setColor('#0099ff')
                .setDescription(content)
                .setTimestamp();
            this._webhookClient.send({
                embeds: [embed]
            })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            throw error;
        }
    }

    // INFO: Toggle services
    /**
     * @brief Toggle the discord service
     * @param {boolean} discord - The discord service
     * @return {void}
     */
    setDiscordUse(discord) {
        if (typeof discord !== 'boolean')
            throw new Error('Discord must be a boolean');
        this._discord = discord;
    }

    // INFO: Discord variables
    /**
     * @brief Set the webhook url
     * @param {string} webhook - The webhook url
     * @return {void}
     */
    setDiscordWebhookURL(webhook) {
        if (typeof webhook !== 'string')
            throw new Error('Webhook must be a string');
        this._webhookURL = webhook;
    }


    // INFO: Set all variables at once with an object
    /**
     * @brief Set all variables at once with an object
     * @param {object} variables - The variables
     * @param {boolean} variables.use - The discord service
     * @param {string} variables.webhookURL - The discord webhook url
     * @return {void}
     */
    setDiscordVariables(variables) {
        const {
            use,
            webhookURL
        } = variables;
        if (use !== undefined)
            this.setDiscordUse(use);
        if (webhookURL !== undefined)
            this.setDiscordWebhookURL(webhookURL);
    }
}

module.exports = DiscordMessage;
