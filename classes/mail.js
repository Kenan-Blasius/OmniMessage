const nodemailer = require('nodemailer');

class MailMessage {
    // toggle services
    _mail;

    // Mail specific variables
    _transporter;
    _to;
    _mailService;
    _mailUser;
    _mailPass;

    // INFO: Constructor
    constructor() {
        // Toggle services (default: false)
        this._mail = false;
    }

    // INFO: Private check functions
    /**
     * @brief Check if the variables are set
     * @return {void}
     */
    _checkVariablesMail() {
        // Check if mail variables are set
        if (this._mail) {
            if (this._to === undefined || this._to === '')
                throw new Error('No recipient set');
            if (this._mailService === undefined || this._mailService === '')
                throw new Error('No mail service set');
            if (this._mailUser === undefined || this._mailUser === '')
                throw new Error('No mail user set');
            if (this._mailPass === undefined || this._mailPass === '')
                throw new Error('No mail password set');
        }
    }

    // INFO: Private send functions
    /**
     * @brief Send the message to the mail service
     * @return {void}
     */
    async _sendMail(title, content) {
        try {
            if (!this._mail)
                return;
            await this._checkVariablesMail();

            this._transporter = nodemailer.createTransport({
                service: this._mailService,
                auth: {
                    user: this._mailUser,
                    pass: this._mailPass
                }
            });
            var mailOptions = {
                from: this._mailUser,
                to: this._to,
                subject: title,
                text: content
            };
            this._transporter.sendMail(mailOptions, function (error) {
                if (error)
                    throw error;
            });
        } catch (error) {
            throw error;
        }
    }

    // INFO: Toggle services
    /**
     * @brief Toggle the mail service
     * @param {boolean} mail - The mail service
     * @return {void}
     */
    setMailUse(mail) {
        if (typeof mail !== 'boolean')
            throw new Error('Mail must be a boolean');
        this._mail = mail;
    }

    // INFO: Mail variables
    /**
     * @brief Set the recipient of the email
     * @param {string} to - The email address of the recipient
     * @return {void}
     */
    setMailTo(to) {
        if (typeof to !== 'string')
            throw new Error('To must be a string');
        this._to = to;
    }

    /**
     * @brief Set the mail service
     * @param {string} mailService - The mail service
     * @return {void}
     */
    setMailService(mailService) {
        if (typeof mailService !== 'string')
            throw new Error('Mail service must be a string');
        this._mailService = mailService;
    }

    /**
     * @brief Set the mail user
     * @param {string} mailUser - The mail user
     * @return {void}
     */
    setMailUser(mailUser) {
        if (typeof mailUser !== 'string')
            throw new Error('Mail user must be a string');
        this._mailUser = mailUser;
    }

    /**
     * @brief Set the mail password
     * @param {string} mailPass - The mail password
     * @return {void}
     */
    setMailPass(mailPass) {
        if (typeof mailPass !== 'string')
            throw new Error('Mail pass must be a string');
        this._mailPass = mailPass;
    }

    // INFO: Set all variables at once with an object
    /**
     * @brief Set all variables at once with an object
     * @param {object} variables - The variables
     * @param {boolean} variables.use - The mail service
     * @param {string} variables.to - The email address of the recipient
     * @param {string} variables.mailService - The mail service
     * @param {string} variables.mailUser - The mail user
     * @param {string} variables.mailPass - The mail password
     * @return {void}
     */
    setMailVariables(variables) {
        const {
            use,
            to,
            mailService,
            mailUser,
            mailPass
        } = variables;

        if (use !== undefined)
            this.setMailUse(use);
        if (to !== undefined)
            this.setMailTo(to);
        if (mailService !== undefined)
            this.setMailService(mailService);
        if (mailUser !== undefined)
            this.setMailUser(mailUser);
        if (mailPass !== undefined)
            this.setMailPass(mailPass);
    }
}

module.exports = MailMessage;
