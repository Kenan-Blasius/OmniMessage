class TemplateMessage {
    // toggle services
    _Service;

    // Service specific variables

    // INFO: Constructor
    constructor() {
        // Toggle services (default: false)
        this._Service = false;
    }

    // INFO: Private check functions
    /**
     * @brief Check if the variables are set
     * @return {void}
     */
    _checkVariablesService() {
        // Check if Service variables are set
        if (this._Service) {
            console.log("Check variables");
        }
    }

    // INFO: Private send functions
    /**
     * @brief Send the message to the Service service
     * @return {void}
     */
    async _sendService(title, content) {
        try {
            if (!this._Service)
                return;
            console.log(title, content);
        } catch (error) {
            throw new Error(error);
        }
    }

    // INFO: Toggle services
    /**
     * @brief Toggle the Service service
     * @param {boolean} use
     * @return {void}
     */
    setServiceUse(use) {
        this._Service = use;
    }

    // INFO: Service variables


    // INFO: Set all variables at once with an object
    /**
     * @brief Set all variables at once with an object
     * @param {object} variables - The variables object
     * @return {void}
     */
    setServiceVariables(variables) {
        const {
            use,
        } = variables;

        if (use !== undefined)
            this.setServiceUse(use);
    }
}

module.exports = TemplateMessage;
