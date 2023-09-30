const nodemailer = require('nodemailer');
const Discord = require('discord.js');

class Contact {
    // INFO: Global variables
    #title;
    #content;

    // toggle services
    #mail;
    #discord;

    // Mail specific variables
    #transporter;
    #to;
    #mailService;
    #mailUser;
    #mailPass;

    // Discord specific variables
    #webhookClient;
    #webhookURL;

    // INFO: Constructor
    constructor() {
        // Toggle services (default: false)
        this.#mail = false;
        this.#discord = false;
    }

    // INFO: Private send functions
    /**
     * @brief Send the message to the mail service
     * @return {void}
     */
    #sendMail() {
        try {
            this.#transporter = nodemailer.createTransport({
                service: this.#mailService,
                auth: {
                    user: this.#mailUser,
                    pass: this.#mailPass
                }
            });
            var mailOptions = {
                from: this.#mailUser,
                to: this.#to,
                subject: this.#title,
                text: this.#content
            };
            this.#transporter.sendMail(mailOptions, function (error) {
                if (error)
                    throw error;
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @brief Send the message to the discord webhook
     * @return {void}
     */
    #sendDiscord() {
        try {
            this.#webhookClient = new Discord.WebhookClient({
                url: this.#webhookURL
            });

            const embed = new Discord.EmbedBuilder()
                .setTitle(this.#title)
                .setColor('#0099ff')
                .setDescription(this.#content)
                .setTimestamp();
            this.#webhookClient.send({
                embeds: [embed]
            })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            throw error;
        }
    }

    // INFO: Private check functions
    /**
     * @brief Check if the variables are set
     * @return {void}
     */
    #checkVariables() {
        // Check if title and content variables are set
        if (this.#title === undefined || this.#title === '')
            throw new Error('No title set');
        if (this.#content === undefined || this.#content === '')
            throw new Error('No content set');
        // Check if mail variables are set
        if (this.#mail) {
            if (this.#to === undefined || this.#to === '')
                throw new Error('No recipient set');
            if (this.#mailService === undefined || this.#mailService === '')
                throw new Error('No mail service set');
            if (this.#mailUser === undefined || this.#mailUser === '')
                throw new Error('No mail user set');
            if (this.#mailPass === undefined || this.#mailPass === '')
                throw new Error('No mail password set');
        }
        // Check if discord variables are set
        if (this.#discord) {
            if (this.#webhookURL === undefined || this.#webhookURL === '')
                throw new Error('No webhook set');
        }
    }

    // INFO: Send function
    /**
     * @brief Send the message to all the services
     * @return {void}
     */
    async sendAll() {
        try {
            await this.#checkVariables();

            if (this.#mail)
                await this.#sendMail();
            if (this.#discord)
                await this.#sendDiscord();
        } catch (error) {
            throw error;
        }
    }

    // INFO: Global variables
    /**
     * @brief Set the title of the message
     * @param {string} title - The title of the message
     * @return {void}
     */
    setTitle(title) {
        this.#title = title;
    }

    /**
     * @brief Set the content of the message
     * @param {string} content - The content of the message
     * @return {void}
     */
    setContent(content) {
        this.#content = content;
    }

    // INFO: Toggle services
    /**
     * @brief Toggle the mail service
     * @param {boolean} mail - The mail service
     * @return {void}
     */
    setMail(mail) {
        this.#mail = mail;
    }

    /**
     * @brief Toggle the discord service
     * @param {boolean} discord - The discord service
     * @return {void}
     */
    setDiscord(discord) {
        this.#discord = discord;
    }

    // INFO: Mail variables
    /**
     * @brief Set the recipient of the email
     * @param {string} to - The email address of the recipient
     * @return {void}
     */
    setTo(to) {
        this.#to = to;
    }

    /**
     * @brief Set the mail service
     * @param {string} mailService - The mail service
     * @return {void}
     */
    setMailService(mailService) {
        this.#mailService = mailService;
    }

    /**
     * @brief Set the mail user
     * @param {string} mailUser - The mail user
     * @return {void}
     */
    setMailUser(mailUser) {
        this.#mailUser = mailUser;
    }

    /**
     * @brief Set the mail password
     * @param {string} mailPass - The mail password
     * @return {void}
     */
    setMailPass(mailPass) {
        this.#mailPass = mailPass;
    }

    // INFO: Discord variables
    /**
     * @brief Set the webhook url
     * @param {string} webhook - The webhook url
     * @return {void}
     */
    setWebhookURL(webhook) {
        this.#webhookURL = webhook;
    }
}

module.exports = Contact;
