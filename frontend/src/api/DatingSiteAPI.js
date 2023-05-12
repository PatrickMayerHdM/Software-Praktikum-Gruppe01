import MessageBO from './MessageBO';


export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    #datingServerBaseURL = 'http://127.0.0.1:5000/system';

    // Local http-fake-backend
    // #datingServerBaseURL = '/hierbennen/system';


    // Message related

    #getAllMessagesURL = () => `${this.#datingServerBaseURL}/Message`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/Message`;
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
            let messageBOs = MessageBO.fromJSON(responseJSON);

            return new Promise(function (resolve) {
                resolve(messageBOs);
            })
        })
    }

    addMessage(messageBO) {
        return this.#fetchAdvanced(this.#addMessageURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(messageBO)
        }).then((responseJSON) => {
            let responseMessageBO = MessageBO.fromJSON(responseJSON)[0];

            return new Promise(function (resolve) {
                resolve(responseMessageBO);
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
