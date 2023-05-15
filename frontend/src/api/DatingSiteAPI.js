import messageBO from './MessageBO';


export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    #datingServerBaseURL = '/system';

    // Local http-fake-backend
    // #datingServerBaseURL = '/hierbennen/system';


    // Message related

    #getAllMessagesURL = () => `${this.#datingServerBaseURL}/messages`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/messages`;
    //#getMessageByIdURL = (id) => `${this.#datingServerBaseURL}/Message/${id}`;

    // Singelton API
    static getAPI() {
        if (this.#api == null) {
            this.#api = new DatingSiteAPI();
        }
        return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
         })

    getAllMessages() {
        return this.#fetchAdvanced(this.#getAllMessagesURL()).then((responseJSON) => {
            let messageBOs = messageBO.fromJSON(responseJSON);

            return new Promise(function (resolve) {
                resolve(messageBOs);
            })
        })
    }

    /**
     * @param {messageBO} message object
     * @public
     */

    addMessage(message) {
        return this.#fetchAdvanced(this.#addMessageURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(message)
        }).then((responseJSON) => {
            console.log("Dreh das Rad!");
            let mssageBO = messageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(mssageBO);
            })
        })
    }

    /*getMessageByID(messageID) {
        return this.#fetchAdvanced(this.#getMessageByIdURL(messageID)).then((responseJSON) => {
            let responseMessageBO = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseMessageBO);
            })
        })
    }*/
}
