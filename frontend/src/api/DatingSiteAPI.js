import messageBO from './MessageBO';
import MessageBO from "./AccountBO";
import profileBO from "./ProfileBO";
import ProfileBO from "./ProfileBO";


export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    //#datingServerBaseURL = '/system';

    // Local http-fake-backend
    #datingServerBaseURL = 'daitinsite/api/system';


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


    /**
     * @param {messageBO} message object
     * @public
     */

    getAllMessages() {
        return this.#fetchAdvanced(this.#getAllMessagesURL()).then((responseJSON) => {
            let messageBOs = MessageBO.fromJSON(responseJSON);

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


    // Profile related

    #getAllProfilesURL = () => `${this.#datingServerBaseURL}/profiles`;
    #addProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #getProfileByIdURL = (id) => `${this.#datingServerBaseURL}/Profile/${id}`;


/**
     * @param {profileBO} profile object
     * @public
     */

    addProfile(profile) {
        return this.#fetchAdvanced(this.#addProfileURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile)
        }).then((responseJSON) => {
            let prfileBO = profileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(prfileBO);
            })
        })
    }

    getAllProfiles() {
        return this.#fetchAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
            let profileBOs = ProfileBO.fromJSON(responseJSON);

            return new Promise(function (resolve) {
                resolve(profileBOs);
            })
        })
    }

    getProfileByID(profileID) {
        return this.#fetchAdvanced(this.#getProfileByIdURL(profileID)).then((responseJSON) => {
            let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfileBO);
            })
        })

    }

    /**
     * Bereich für die Suche
     */

    #getNewProfilesByIdURL = (id) => `${this.#datingServerBaseURL}/Search/${id}/newprofiles`;

    /**
     * Gibt ein Promise zurück, welches dann nur die neuen Profile anzeigt
     * @param {Number} profileID übergibt die profileID welche ein Profil nicht nicht besucht haben soll
    */

    getOnlyNewProfiles(profile_id){
        return this.#fetchAdvanced(this.#getNewProfilesByIdURL())
            .then((responseJSON) => {
                console.log("Das responseJSON",responseJSON)
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })

    }
}

