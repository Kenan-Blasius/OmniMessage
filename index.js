const nodemailer = require('nodemailer');
const Discord = require('discord.js');

// create a class to handle the email sending
class Email {
    constructor() {
        this.to = '';
        this.subject = '';
        this.content = '';

        this.transporter;

        this.mailService = '';
        this.mailUser = '';
        this.mailPass = '';
    }

    /**
     * @brief Send the message to the webhook
     * @return {void}
     */
    send() {
        if (this.to === undefined || this.to === '') {
            console.error('No recipient set');
            return;
        }
        if (this.subject === undefined || this.subject === '') {
            console.error('No subject set');
            return;
        }
        if (this.content === undefined || this.content === '') {
            console.error('No content set');
            return;
        }
        if (this.mailService === undefined || this.mailService === '') {
            console.error('No mail service set');
            return;
        }
        if (this.mailUser === undefined || this.mailUser === '') {
            console.error('No mail user set');
            return;
        }
        if (this.mailPass === undefined || this.mailPass === '') {
            console.error('No mail password set');
            return;
        }
        this.transporter = nodemailer.createTransport({
            service: this.mailService,
            auth: {
                user: this.mailUser,
                pass: this.mailPass
            }
        });
        if (this.transporter === undefined) {
            console.error('Invalid transporter');
            return;
        }

        var mailOptions = {
            from: this.mailUser,
            to: this.to,
            subject: this.subject,
            text: this.content
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.error(error);
            else
                console.log('Email sent: ' + info.response);
        });
    }

    /**
     * @brief Set the recipient of the email
     * @param {string} to - The email address of the recipient
     * @return {void}
     */
    setTo(to) {
        this.to = to;
    }

    /**
     * @brief Set the subject of the email
     * @param {string} subject - The subject of the email
     * @return {void}
     */
    setSubject(subject) {
        this.subject = subject;
    }

    /**
     * @brief Set the content of the email
     * @param {string} content - The content of the email
     * @return {void}
     */
    setContent(content) {
        this.content = content;
    }

    /**
     * @brief Set the mail service
     * @param {string} mailService - The mail service
     * @return {void}
     */
    setMailService(mailService) {
        this.mailService = mailService;
    }

    /**
     * @brief Set the mail user
     * @param {string} mailUser - The mail user
     * @return {void}
     */
    setMailUser(mailUser) {
        this.mailUser = mailUser;
    }

    /**
     * @brief Set the mail password
     * @param {string} mailPass - The mail password
     * @return {void}
     */
    setMailPass(mailPass) {
        this.mailPass = mailPass;
    }
}

// create a class to handle the discord message sending
class DiscordMessage {
    constructor() {
        this.title = '';
        this.content = '';
        this.webhook = '';
    }

    /**
     * @brief Send the message to the webhook
     * @return {void}
     */
    send() {
        if (this.content === undefined || this.content === '') {
            console.error('No content set');
            return;
        }
        if (this.webhook === undefined || this.webhook === '') {
            console.error('No webhook set');
            return;
        }

        const webhookClient = new Discord.WebhookClient(this.webhook);

        const embed = new Discord.EmbedBuilder()
            .setTitle('Nouveau message via le portfolio')
            .setColor('#0099ff')
            .setAuthor({
                name: 'Portfolio',
                iconURL: 'https://i.imgur.com/wSTFkRM.png',
                url: 'https://kblasius.fr/portfolio',
            })
            .setDescription('**Contenu du message:**\n```md\n' + content + '\n```\n')
            .addFields(
                { name: 'Nom', value: name || 'Non renseigné', inline: true },
                { name: 'Prénom', value: surname || 'Non renseigné', inline: true },
                { name: 'Entreprise', value: entreprise || 'Non renseigné' },
                { name: 'Email', value: email || 'Non renseigné' },
                { name: 'Objet', value: object || 'Non renseigné' },
            )
            .setTimestamp();
        webhookClient.send(this.content);
    }

    /**
     * @brief Set the content of the message
     * @param {string} content - The content of the message
     * @return {void}
     */
    setContent(content) {
        this.content = content;
    }

    /**
     * @brief Set the webhook
     * @param {string} webhook - The webhook url
     * @return {void}
     */
    setWebhook(webhook) {
        this.webhook = webhook;
    }
}

module.exports = Email;
