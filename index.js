const mail = require('./classes/mail');
const discord = require('./classes/discord');

class Contact extends Classes([mail, discord]) {
    _title;
    _content;

    constructor() {
        super();
    }

    // INFO: Send functions
    /**
     * @brief Send the message to all the services you've set
     * @return {void}
     */
    async sendAll() {
        try {
            if (this._mail)
                this._sendMail(this._title, this._content)
            if (this._discord)
                this._sendDiscord(this._title, this._content)
        } catch (error) {
            throw error
        }
    };

    // INFO: Global variables
    /**
     * @brief Set the title of the message
     * @param {string} title - The title of the message
     * @return {void}
     */
    setTitle(title) {
        this._title = title;
    }

    /**
     * @brief Set the content of the message
     * @param {string} content - The content of the message
     * @return {void}
     */
    setContent(content) {
        this._content = content;
    }
}

function Classes(bases) {
    class Bases {
        constructor() {
            bases.forEach(base => Object.assign(this, new base()));
        }
    }
    bases.forEach(base => {
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop != 'constructor')
            .forEach(prop => Bases.prototype[prop] = base.prototype[prop])
    })
    return Bases;
}

module.exports = Contact;
